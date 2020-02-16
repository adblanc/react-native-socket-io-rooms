import Game90 from "./90";

function test() {
  const game = new Game90([{ name: "test", key: "oisoisdois" }]);

  console.log(game.players);

  console.log(game.getPlayerTurn());
}

test();
