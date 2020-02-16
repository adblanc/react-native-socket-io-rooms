import shuffle from "../../helpers/shuffle";

// Card representation : { group: 0, id: 2, key: '02' }, group 0-3 / cards 2-14

enum Cards {
  JACK = 11,
  QUEEN,
  KING,
  AS
}

interface Card {
  group: number;
  id: number;
  key: string;
  one?: boolean; // when playing AS it can be either 1 or 11
  eleven?: boolean;
}

class Game90 {
  deck: Card[];
  total: number;
  playerIndex: number;
  private _players: any[];

  constructor(players: any[]) {
    this.deck = this.createDeck();
    this._players = [...players];
    this.playerIndex = 0;
    this.total = 0;

    shuffle(this._players);
    this.distributeCards();
  }

  private createDeck() {
    const deck = [];

    for (let i = 0; i < 4; i++)
      for (let j = 2; j < 15; j++)
        deck.push({ group: i, id: j, key: i + "" + j });

    shuffle(deck);

    return deck;
  }

  private distributeCards() {
    for (let i = 0; i < this.players.length; i++) {
      const hand = [];
      for (let j = 0; j < 4; j++) {
        hand[j] = this.deck.shift();
      }
      this.players[i].cards = [...hand];
    }
  }

  public getPlayerTurn(): string {
    if (this.playerIndex >= this.players.length) this.playerIndex = 0;

    return this.players[this.playerIndex++].key;
  }

  public playCard(card: Card): string {
    const value = this.getCardValue(card);

    if (value === 70) this.total = 70;
    else this.total += value;

    if (value === 0) return "reverse";
    if (this.total >= 90) return "loose";

    return "ok";
  }

  private getCardValue(card: Card): number {
    switch (card.id) {
      case Cards.AS:
        if (card.one) return 1;
        if (card.eleven) return 11;
        break;
      case Cards.KING:
        return 70;
      case Cards.QUEEN:
        return -10;
      case Cards.JACK:
        return 0;
      default:
        return card.id;
    }
    return card.id;
  }

  public get players(): any[] {
    return this._players;
  }
}

export default Game90;
