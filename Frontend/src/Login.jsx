import { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && room) {
      onLogin({ username, room });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button type="submit">Join</button>
    </form>
  );
};

export default Login;
