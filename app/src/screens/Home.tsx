import * as React from "react";
import { View, StyleSheet, Text, Button, TextInput, Alert } from "react-native";
import KeyboardDismiss from "../keyboardDismiss";
import { NavigationStackProp } from "react-navigation-stack";

export interface HomeProps {
  navigation: NavigationStackProp;
  screenProps: any;
}

export default class Home extends React.Component<HomeProps, any> {
  username: string;
  roomId: string;
  constructor(props: HomeProps) {
    super(props);
    this.username = "";
    this.roomId = "";
    this.state = {
      isConnected: null
    };
  }

  componentDidMount() {
    const { socket } = this.props.screenProps;

    socket.on("connect", () => {
      this.setState({ isConnected: true });
    });

    socket.on("roomJoined", ({ id, players }) => {
      this.props.navigation.navigate("Room", {
        id,
        players,
        player: { name: this.username }
      });
    });

    socket.on("roomBadId", () => {
      Alert.alert(
        "Bad room id",
        "Please enter a valid room id",
        [{ text: "ok" }],
        { cancelable: true }
      );
    });

    socket.on("nameAlreadyTaken", () => {
      Alert.alert(
        "Name already taken",
        "Someone is the room already has this name, please choose another one",
        [{ text: "ok" }],
        { cancelable: true }
      );
    });
  }

  componentWillUnmount() {
    const { socket } = this.props.screenProps;

    socket.disconnect();
  }

  private verifyUsername = () => {
    // some validation

    if (this.username.length <= 0) return false;

    return true;
  };

  private createRoom = () => {
    const { socket } = this.props.screenProps;

    if (!this.verifyUsername()) return;

    socket.emit("createRoom", { name: this.username });
  };

  private joinRoom = () => {
    const { socket } = this.props.screenProps;
    if (!this.verifyUsername()) return;

    socket.emit("joinRoom", { id: this.roomId, user: { name: this.username } });
  };

  public render() {
    return (
      <KeyboardDismiss>
        <View style={styles.container}>
          <TextInput
            maxLength={12}
            style={styles.textInput}
            placeholder={"Username"}
            placeholderTextColor="#808080"
            onChangeText={text => (this.username = text)}
          />
          <View style={styles.button}>
            <Button title="create room" onPress={this.createRoom} />
          </View>
          <View style={styles.button}>
            <Button title="join room" onPress={this.joinRoom} />
            <TextInput
              maxLength={4}
              keyboardType="number-pad"
              style={styles.textInput}
              placeholder={"Room id"}
              placeholderTextColor="#808080"
              onChangeText={text => (this.roomId = text)}
            />
          </View>
          <Text>connected: {this.state.isConnected ? "true" : "false"}</Text>
        </View>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  button: {
    marginVertical: 20
  }
});
