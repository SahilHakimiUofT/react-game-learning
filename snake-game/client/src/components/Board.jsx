import { useState, useRef, useEffect } from "react";
import styles from "./Board.module.css";
import io from "socket.io-client";
let socket;
const Board = (props) => {
  const canvasRef = useRef(null);
  const BG_COLOUR = "#231f20";
  const SNAKE_COLOR = "#c2c2c2";
  const FOOD_COLOUR = "#e66916";

  const paintGame = (state) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const food = state.food;
    const gridSize = state.gridsize;
    const size = canvas.width / gridSize;

    ctx.fillStyle = FOOD_COLOUR;
    ctx.fillRect(food.x * size, food.y * size, size, size);

    paintPlayer(state.player, size, SNAKE_COLOR, ctx);
  };

  const paintPlayer = (playerState, size, colour, ctx) => {
    const snake = playerState.snake;
    ctx.fillStyle = colour;
    for (let cell of snake) {
      console.log(cell.x);
      ctx.fillRect(cell.x * size, cell.y * size, size, size);
    }
  };

  useEffect(() => {
    socket = io.connect("http://localhost:3001");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.height = 600;
    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on("gameState", (data) => {
      handleGameState(data);
    });

    socket.on("gameOver", (data) => {
      //   handleGameOver(data);
      alert("done");
    });
  }, [socket]);

  const handleGameState = (gameState) => {
    gameState = JSON.parse(gameState);
    console.log(gameState);
    requestAnimationFrame(() => paintGame(gameState));
  };
  const handleGameOver = (gameState) => {
    alert("Game Over");
  };
  const handleKeyDown = (e) => {
    console.log(e.keyCode);
    socket.emit("keydown", e.keyCode);
  };

  return (
    <div className={styles.board}>
      <canvas tabIndex={0} ref={canvasRef} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default Board;
