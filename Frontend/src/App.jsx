import { useState } from "react";
import Login from "./Login";
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState(null);

  return user ? (
    <Chat username={user.username} room={user.room} />
  ) : (
    <Login onLogin={setUser} />
  );
}

export default App;
