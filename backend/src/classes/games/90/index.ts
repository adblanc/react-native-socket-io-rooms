import Game90 from "./90";

function test() {
  const game = new Game90([
    { name: "test", key: "oisoisdois" },
    { name: "deuxieme", key: "2" }
  ]);

  const player = game.currentPlayer;

  console.log(player.cards);
  const result = game.playCard(0);
  console.log(player.cards);
  console.log(game.total);
  console.log(result);
}

test();
