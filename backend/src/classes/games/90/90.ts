import shuffle from "../../../helpers/shuffle";

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

interface PlayResult {
  state: "" | "loose" | "reverse";
  sips: number;
}

class Game90 {
  deck: Card[];
  total: number;
  playerIndex: number;
  currentPlayer: any;
  cardsOnBoard: Card[];
  private _players: any[];

  constructor(players: any[]) {
    this.deck = this.createDeck();
    this._players = [...players];
    this.playerIndex = 0;
    this.cardsOnBoard = [];
    this.total = 0;

    shuffle(this._players);
    this.distributeCards();
    this.currentPlayer = this.players[this.playerIndex];
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

  private nextPlayer(): any {
    this.playerIndex++;

    if (this.playerIndex >= this.players.length) this.playerIndex = 0;

    this.currentPlayer = this.players[this.playerIndex];

    return this.currentPlayer;
  }

  public playCard(index: number): PlayResult {
    const result: PlayResult = {
      state: "",
      sips: 0
    };

    const [card] = this.currentPlayer.cards.splice(index, 1);
    this.cardsOnBoard.push(card);

    const value = this.getCardValue(card);

    if (value === 70) this.total = 70;
    else {
      this.total += value;
      if (this.total < 0) this.total = 0;
      else if (this.total > 90) this.total = 90;
    }

    if (value === 0) result.state = "reverse";
    if (this.total >= 90) {
      this.total = 0;
      result.state = "loose";
      this.cardsOnBoard = [];
    }
    if (this.total != 0 && this.total % 10 === 0) result.sips = this.total / 10;

    this.currentPlayer.cards.splice(index, 0, this.pickCard());

    this.nextPlayer();
    return result;
  }

  private getCardValue(card: Card): number {
    switch (card.id) {
      case Cards.AS:
        if (card.eleven) return 11;
        return 1;
      case Cards.KING:
        return 70;
      case Cards.QUEEN:
        return -10;
      case Cards.JACK:
        return 0;
      default:
        return card.id;
    }
  }

  private pickCard() {
    if (this.deck.length <= 0) this.deck = this.newDeck();

    return this.deck.shift();
  }

  private newDeck() {
    const playerCards = this.players.reduce((current, p) => {
      p.cards.forEach((c: any) => current.push(c));
      return current;
    }, []);

    const deck = this.createDeck().filter(
      c => !playerCards.find((card: any) => card.key === c.key)
    );

    return deck;
  }

  public get players(): any[] {
    return this._players;
  }
}

export default Game90;
