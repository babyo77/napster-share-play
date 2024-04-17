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

let count = 0;

io.on("connection", (socket) => {
  console.log(`${socket.id} connected.`);
  count++;

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected.`);
    count--;
  });
});

app.get("/", (req, res) => {
  res.json({ live: count });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
