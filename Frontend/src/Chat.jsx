import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = ({ username, room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join", { username, room });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("message");
  }, [username, room]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Room: {room}</h2>

      {messages.map((msg, i) => (
        <p key={i}>
          <strong>{msg.username}:</strong> {msg.text}
        </p>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
