import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div>
      <div>
        <div>
          <h1>Multiplayer Snake</h1>
          <button type="submit">Create New Game</button>
          <div>OR</div>
          <div>
            <input type="text" placeholder="Enter Game Code" />
          </div>
          <button type="submit" id="joinGameButton">
            Join Game
          </button>
        </div>
      </div>

      <div>
        <div>
          <h1>
            Your game code is: <span></span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
