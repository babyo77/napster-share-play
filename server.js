const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const fs = require("fs");
app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: true,
  },
});

let count = new Set();
io.on("connection", (socket) => {
  socket.on("join", (data) => {
    count.add(socket.id);
    socket.join(data.id);
    io.emit("new", data);
  });

  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("duration", (data) => {
    io.emit("duration", data);
  });
  socket.on("progress", (data) => {
    io.emit("progress", data);
  });

  socket.on("disconnect", () => {
    count.delete(socket.id);
  });
});

app.get("/", (req, res) => {
  res.json({ live: [...count] });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
