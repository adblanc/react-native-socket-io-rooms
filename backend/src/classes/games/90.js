"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shuffle_1 = __importDefault(require("../../helpers/shuffle"));
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
        this._players = __spreadArrays(players);
        this.playerIndex = 0;
        this.total = 0;
        shuffle_1.default(this._players);
        this.distributeCards();
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
            this.players[i].cards = __spreadArrays(hand);
        }
    };
    Game90.prototype.getPlayerTurn = function () {
        if (this.playerIndex >= this.players.length)
            this.playerIndex = 0;
        return this.players[this.playerIndex++].key;
    };
    Game90.prototype.playCard = function (card) {
        var value = this.getCardValue(card);
        if (value === 70)
            this.total = 70;
        else
            this.total += value;
        if (value === 0)
            return "reverse";
        if (this.total >= 90)
            return "loose";
        return "ok";
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
