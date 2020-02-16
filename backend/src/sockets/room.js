const Room = require("../classes/room");

const rooms = [];

module.exports = (io, socket) => {
  socket.on("createRoom", user => {
    const room = new Room();

    while (rooms.find(r => r.id === room.id)) room.setRandomId();

    room.addUser(user);

    rooms.push(room);

    socket.join(room.id);
    socket.emit("roomJoined", { id: room.id, players: room.players });

    console.log("Room created, id :", room.id, ", players:", room.players);
  });

  socket.on("joinRoom", ({ id, user }) => {
    const room = rooms.find(r => r.id === id);

    if (!io.sockets.adapter.rooms[id] || !room) return socket.emit("roomBadId");

    if (room.players.find(p => p.name === user.name))
      return socket.emit("nameAlreadyTaken");

    room.addUser(user);
    socket.join(room.id);
    socket.emit("roomJoined", { id: room.id, players: room.players });
    socket.broadcast.to(room.id).emit("playersUpdated", room.players);
  });

  socket.on("quitRoom", ({ id, username }) => {
    const room = rooms.find(r => r.id === id);

    if (!io.sockets.adapter.rooms[id] || !room) return;

    room.removeUser(username);
    socket.broadcast.to(room.id).emit("playersUpdated", room.players);
    socket.leave(room.id);

    if (room.players.length === 0) {
      const i = rooms.findIndex(r => r.id === id);

      rooms.splice(i, 1);
    }
  });

  socket.on("launchGame", id => {
    // sending to all clients in 'id' room, including sender
    io.in(id).emit("gameStarted", "the game will start soon");
  });
};
