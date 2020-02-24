import * as React from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

export interface RoomProps {
  navigation: NavigationStackProp;
  screenProps: any;
}

export default class Room extends React.Component<RoomProps, any> {
  id: string;
  players: any[];
  playerKey: string;
  player: any;

  constructor(props: RoomProps) {
    super(props);
    this.id = this.props.navigation.getParam("id", 0);
    this.players = this.props.navigation.getParam("players", []);
    this.playerKey = this.props.navigation.getParam("playerKey", undefined);
    this.player = this.players.find(p => p.key === this.playerKey);
    this.state = {
      players: []
    };
  }

  componentDidMount() {
    const { socket } = this.props.screenProps;

    this.setState({ players: this.players });

    socket.on("playersUpdated", players =>
      this.setState({ players }, this.checkAdmin)
    );

    socket.on("gameStarted", ({ currentPlayer, players }) => {
      console.log("game started");
      this.props.navigation.navigate("Game", {
        id: this.id,
        players,
        playerKey: this.playerKey,
        currentPlayer
      });
    });
  }

  private checkAdmin = () => {
    if (!this.state.players.find(p => p.isAdmin))
      this.setState(state => {
        const newPlayers = state.players.map((p, i) => {
          if (i === 0) return { ...p, isAdmin: true };
          return p;
        });
        return {
          players: newPlayers
        };
      });
  };

  componentWillUnmount() {
    const { socket } = this.props.screenProps;

    socket.off("playersUpdated");
    socket.emit("quitRoom", { id: this.id, username: this.player.name });
  }

  private launchGame = () => {
    const { socket } = this.props.screenProps;

    socket.emit("90_startGame", this.id, this.state.players);
  };

  public render() {
    console.log(this.state.players);
    console.log(this.playerKey);
    const player =
      this.state.players.find(p => p.key === this.playerKey) || this.player;
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
        <View style={styles.container}>
          <Button
            title="Launch game"
            onPress={this.launchGame}
            disabled={!player.isAdmin}
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
