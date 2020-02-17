"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shuffle_1 = __importDefault(require("../../../helpers/shuffle"));
// Card representation : { group: 0, id: 2, key: '02' }, group 0-3 / cards 2-14
var Cards;
(function (Cards) {
    Cards[Cards["JACK"] = 11] = "JACK";
    Cards[Cards["QUEEN"] = 12] = "QUEEN";
    Cards[Cards["KING"] = 13] = "KING";
    Cards[Cards["AS"] = 14] = "AS";
})(Cards || (Cards = {}));
var Game90 = /** @class */ (function () {
    function Game90(players) {
        this.deck = this.createDeck();
        this._players = players.slice();
        this.playerIndex = 0;
        this.cardsOnBoard = [];
        this.total = 0;
        shuffle_1.default(this._players);
        this.distributeCards();
        this.currentPlayer = this.players[this.playerIndex];
    }
    Game90.prototype.createDeck = function () {
        var deck = [];
        for (var i = 0; i < 4; i++)
            for (var j = 2; j < 15; j++)
                deck.push({ group: i, id: j, key: i + "" + j });
        shuffle_1.default(deck);
        return deck;
    };
    Game90.prototype.distributeCards = function () {
        for (var i = 0; i < this.players.length; i++) {
            var hand = [];
            for (var j = 0; j < 4; j++) {
                hand[j] = this.deck.shift();
            }
            this.players[i].cards = hand.slice();
        }
    };
    Game90.prototype.nextPlayer = function () {
        this.playerIndex++;
        if (this.playerIndex >= this.players.length)
            this.playerIndex = 0;
        this.currentPlayer = this.players[this.playerIndex];
        return this.currentPlayer;
    };
    Game90.prototype.playCard = function (index) {
        var result = {
            state: "",
            sips: 0
        };
        var card = this.currentPlayer.cards.splice(index, 1)[0];
        this.cardsOnBoard.push(card);
        var value = this.getCardValue(card);
        if (value === 70)
            this.total = 70;
        else {
            this.total += value;
            if (this.total < 0)
                this.total = 0;
            else if (this.total > 90)
                this.total = 90;
        }
        if (value === 0)
            result.state = "reverse";
        if (this.total >= 90) {
            this.total = 0;
            result.state = "loose";
            this.cardsOnBoard = [];
        }
        if (this.total != 0 && this.total % 10 === 0)
            result.sips = this.total / 10;
        this.currentPlayer.cards.splice(index, 0, this.pickCard());
        this.nextPlayer();
        return result;
    };
    Game90.prototype.getCardValue = function (card) {
        switch (card.id) {
            case Cards.AS:
                if (card.one)
                    return 1;
                if (card.eleven)
                    return 11;
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
    };
    Game90.prototype.pickCard = function () {
        if (this.deck.length <= 0)
            this.deck = this.newDeck();
        return this.deck.shift();
    };
    Game90.prototype.newDeck = function () {
        var playerCards = this.players.reduce(function (current, p) {
            p.cards.forEach(function (c) { return current.push(c); });
            return current;
        }, []);
        console.log(playerCards, "player Cards");
        var deck = this.createDeck().filter(function (c) { return !playerCards.find(function (card) { return card.key === c.key; }); });
        console.log(deck.length, "new deck length");
        return deck;
    };
    Object.defineProperty(Game90.prototype, "players", {
        get: function () {
            return this._players;
        },
        enumerable: true,
        configurable: true
    });
    return Game90;
}());
exports.default = Game90;
