const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const { createGameState, gameLoop, getUpdatedVelocity } = require("./game");
const { FRAME_RATE } = require("./constants");
const port = 3001;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);
  const state = createGameState();
  const handleKeydown = (keyCode) => {
    try {
      keyCode = parseInt(keyCode);
    } catch (e) {
      console.error(e);
      return;
    }
    const vel = getUpdatedVelocity(keyCode);
    if (vel) {
      state.player.vel = vel;
    }
  };

  socket.on("keydown", handleKeydown);

  startGameInterval(socket, state);
});

const startGameInterval = (socket, state) => {
  const intervalId = setInterval(() => {
    const winner = gameLoop(state);
    console.log("winner");
    if (!winner) {
      socket.emit("gameState", JSON.stringify(state));
    } else {
      socket.emit("gameOver");
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
};

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
