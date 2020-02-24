import Game90 from "../../classes/games/90/90";

const games: any = {};

export default (io: SocketIO.Server, socket: SocketIO.Socket) => {
  socket.on("90_startGame", (roomId: string, players: any[]) => {
    console.log("90 start game");
    const game = new Game90(players);

    games[roomId] = game;

    io.in(roomId).emit("gameStarted", {
      currentPlayer: game.currentPlayer,
      players: game.players
    });
  });

  socket.on("90_playerPlay", (roomId: string, cardIndex: number) => {
    const game: Game90 = games[roomId];

    const { result, cards } = game.playCard(cardIndex);

    io.in(roomId).emit("90_playerHasPlay", {
      result,
      currentPlayer: game.currentPlayer
    });

    socket.emit("90_playerPickedCard", cards);
  });
};
