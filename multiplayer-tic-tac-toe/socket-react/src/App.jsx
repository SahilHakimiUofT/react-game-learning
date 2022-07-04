import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", { message: message, room: room });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);
  return (
    <div>
      <input
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        placeholder="Room"
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Mesage:</h1>
      {messageRecieved}
    </div>
  );
}

export default App;
