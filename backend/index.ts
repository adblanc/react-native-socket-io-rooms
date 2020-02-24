import express from "express";
import socketio from "socket.io";

const app = express();

const http = require("http").Server(app);

const io = socketio(http);

import listenRoom from "./src/sockets/room";
import listen90 from "./src/sockets/games/90";

app.get("/", function(req, res) {
  res.sendFile(__dirname + "../index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  listenRoom(io, socket);
  listen90(io, socket);
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
