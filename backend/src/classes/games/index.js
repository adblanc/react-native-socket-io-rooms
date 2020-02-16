"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _90_1 = __importDefault(require("./90"));
function test() {
    var game = new _90_1.default([{ name: "test", key: "oisoisdois" }]);
    console.log(game.players);
    console.log(game.getPlayerTurn());
}
test();
