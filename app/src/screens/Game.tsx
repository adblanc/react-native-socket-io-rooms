import * as React from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface RoomProps {
  navigation: NavigationStackProp;
  screenProps: any;
}

export default class Game extends React.Component<RoomProps, any> {
  id: string;
  playerKey: string;
  player: any;

  constructor(props: RoomProps) {
    super(props);
    this.id = this.props.navigation.getParam("id", 0);
    this.playerKey = this.props.navigation.getParam("playerKey", undefined);
    this.state = {
      players: this.props.navigation.getParam("players", []),
      currentPlayer: this.props.navigation.getParam("currentPlayer", undefined),
      result: undefined
    };
    this.player = this.state.players.find(p => p.key === this.playerKey);
  }

  componentDidMount() {
    const { socket } = this.props.screenProps;

    socket.on("90_playersUpdated", players => this.setState({ players }));

    socket.on("90_playerHasPlay", ({ result, currentPlayer }) => {
      this.setState({ currentPlayer, result });
    });

    socket.on("90_playerPickedCard", cards => {
      const players = this.state.players.map(p => {
        if (p.key === this.playerKey) return { ...p, cards: cards };
        return p;
      });
      this.setState({ players });
    });
  }

  componentWillUnmount() {
    const { socket } = this.props.screenProps;

    socket.off("90_playersUpdated");
    socket.off("90_playerHasPlay");
    socket.off("90_playerPickedCard");
  }

  private playCard = (i: number) => {
    const { socket } = this.props.screenProps;
    const player = this.state.players.find(p => p.key === this.playerKey);

    socket.emit("90_playerPlay", this.id, i);
  };

  public render() {
    console.log(this.state.players);
    console.log(this.playerKey);
    console.log(this.state.currentPlayer);
    const { currentPlayer, result } = this.state;
    console.log(result);
    const player = this.state.players.find(p => p.key === this.playerKey);

    const myTurn = player && currentPlayer && player.key === currentPlayer.key;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>Room {this.id}</Text>
          {currentPlayer && <Text>Current player {currentPlayer.name}</Text>}
          {result && <Text>Sips: {result.sips}</Text>}
          {result && <Text>State: {result.state}</Text>}
          {result && <Text>Card played: {result.cardPlayed.id}</Text>}
          {result && <Text>Total: {result.total}</Text>}
        </View>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            {player.cards &&
              player.cards.map((c, i) => {
                return (
                  <TouchableOpacity
                    key={c.key}
                    style={styles.card}
                    disabled={!myTurn}
                    onPress={() => this.playCard(i)}
                  >
                    <Text>{c.id}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
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
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  card: {
    height: 100,
    width: 50,
    backgroundColor: "grey",
    borderWidth: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
