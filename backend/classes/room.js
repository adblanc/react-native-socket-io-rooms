const randomNumber = require("../helpers/random");

class Room {
  constructor() {
    this.players = [];
    this.id = randomNumber(1, 9999).toString();
  }

  setRandomId = () => {
    this.id = randomNumber(1, 9999).toString();
  };

  addUser = user => {
    this.players.push(user);
  };

  removeUser = username => {
    const i = this.players.findIndex(u => u.name === username);

    if (i < 0) return;

    this.players.splice(i, 1);
  };
}

module.exports = Room;
