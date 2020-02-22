import express from "express";
import socketio from "socket.io";

const app = express();

const http = require("http").Server(app);

const io = socketio(http);

const roomListener = require("./src/sockets/room");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "../index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  roomListener(io, socket);
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
