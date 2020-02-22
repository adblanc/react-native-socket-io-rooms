import randomNumber from "../helpers/random";

export default class Room {
  players: any[];
  id: string;
  constructor() {
    this.players = [];
    this.id = randomNumber(1, 9999).toString();
  }

  setRandomId() {
    this.id = randomNumber(1, 9999).toString();
  }

  addUser(user: any) {
    this.players.push(user);
  }

  removeUser(username: string) {
    const i = this.players.findIndex(u => u.name === username);

    if (i < 0) return;

    this.players.splice(i, 1);
  }
}
