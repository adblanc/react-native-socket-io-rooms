# React native and socket-io rooms

Basic implementation of rooms using react-native (Expo) and Socket.io / Express with Node.js as a web server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and expo-cli installed.
If not :

Node.js : https://nodejs.org/en/

Expo-cli : 
```
npm i -g expo-cli
```

### Installing

You must run npm install in both app and backend directories.

Be aware that you must modify this line ```const SocketEndpoint = "http://192.168.1.45:3000"``` in App.tsx in the app/ directory and put your local ip (localhost wasn't working for me)

Then you have to launch the app and the server by typing npm start in both directory.

The server will be listening on the port 3000 and you can access the app as a standard expo app.



