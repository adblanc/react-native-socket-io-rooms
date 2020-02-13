import React from "react";
import Navigation from "./src/navigation";
const io = require("socket.io-client");

const SocketEndpoint = "http://192.168.1.45:3000";

const socket = io(SocketEndpoint, {
  transports: ["websocket"]
});

export default class App extends React.Component {
  render() {
    return (
      <Navigation
        screenProps={{
          socket
        }}
      />
    );
  }
}
