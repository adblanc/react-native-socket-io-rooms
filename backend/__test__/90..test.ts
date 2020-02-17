import Game90 from "../src/classes/games/90/90";

const getPlayers = (n: number) => {
  const players = [];

  for (let i = 0; i < n; i++) {
    players[i] = { name: "ok" + i, key: "key" + i };
  }

  return players;
};

describe("90 game class", () => {
  describe("cards", () => {
    it("should create a deck with 52 - 4 * players.length cards", () => {
      for (let i = 0; i < 10; i++) {
        const players = getPlayers(i);
        const game = new Game90(players);
        expect(game.deck.length).toBe(52 - 4 * i);
      }
    });

    it("should contain cards with unique keys", () => {
      const game = new Game90(getPlayers(5));

      const keys = game.deck.map(c => c.key);
      game.players.forEach(p => {
        p.cards.forEach((c: any) => {
          keys.push(c.key);
        });
      });
      const keySet = new Set(keys);

      expect(keySet.size).toBe(keys.length);
    });
  });

  describe("gameplay", () => {
    let game: Game90;
    let nbrPlayers = 5;

    beforeEach(() => {
      game = new Game90(getPlayers(nbrPlayers));
    });
    it("should make a complete turn of players", () => {
      const playerKeys = [];
      for (let i = 0; i < nbrPlayers; i++) {
        const player = game.currentPlayer;
        playerKeys.push(player.key);
        game.playCard(0);
      }
      const keySet = new Set(playerKeys);
      expect(keySet.size).toBe(playerKeys.length);
    });
    it("should make multiple complete turn of players", () => {
      const turns = 4;
      const playerKeys = [];
      for (let i = 0; i < nbrPlayers * turns; i++) {
        const player = game.currentPlayer;
        playerKeys.push(player.key);
        game.playCard(0);
      }
      const keySet = new Set(playerKeys);
      expect(keySet.size).toBe(playerKeys.length / turns);
    });

    it("should make a new deck if deck length === 0", () => {
      game.deck.length = 0;
      game.playCard(0);
      expect(game.deck.length).toBe(52 - nbrPlayers * 4);
    });
  });
});
