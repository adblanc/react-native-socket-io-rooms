"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _90_1 = __importDefault(require("./90"));
function test() {
    var game = new _90_1.default([
        { name: "test", key: "oisoisdois" },
        { name: "deuxieme", key: "2" }
    ]);
    var player = game.currentPlayer;
    console.log(player.cards);
    var result = game.playCard(0);
    console.log(player.cards);
    console.log(game.total);
    console.log(result);
}
test();
