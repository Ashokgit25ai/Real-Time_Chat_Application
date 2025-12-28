const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", ({ username, room }) => {
    users[socket.id] = { username, room };
    socket.join(room);

    io.to(room).emit("message", {
      username: "System",
      text: `${username} joined the room`,
    });
  });

  socket.on("sendMessage", (message) => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit("message", {
        username: user.username,
        text: message,
      });
    }
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit("message", {
        username: "System",
        text: `${user.username} left the room`,
      });
      delete users[socket.id];
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
