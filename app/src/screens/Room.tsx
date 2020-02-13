import * as React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

export interface RoomProps {
  navigation: NavigationStackProp;
  screenProps: any;
}

export default class Room extends React.Component<RoomProps, any> {
  id: string;
  players: any[];
  player: any;

  constructor(props: RoomProps) {
    super(props);
    this.id = this.props.navigation.getParam("id", 0);
    this.players = this.props.navigation.getParam("players", []);
    this.player = this.props.navigation.getParam("player", undefined);
    this.state = {
      players: []
    };
  }

  componentDidMount() {
    const { socket } = this.props.screenProps;

    this.setState({ players: this.players });
    socket.on("playersUpdated", players => this.setState({ players }));
  }

  componentWillUnmount() {
    const { socket } = this.props.screenProps;

    socket.off("playersUpdated");
    socket.emit("quitRoom", { id: this.id, username: this.player.name });
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>Room {this.id}</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={this.state.players}
            renderItem={({ item }: any) => <Text>{item.name}</Text>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
