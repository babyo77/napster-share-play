const fs = require("fs");
let i = 0;
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    fs.writeFileSync("./logs/temp.txt", (i++).toString());

    socket.on("join", (data) => {
      socket.join(data.id);
      const room = io.sockets.adapter.rooms.get(data.id);
      if (room && room.size >= 2) {
        io.to(data.id).emit("joined", data.song);
      }
    });

    socket.on("play", (data) => {
      socket.to(data.id).emit("playSong", data.song);
    });
    socket.on("seek", (data) => {
      socket.to(data.id).emit("seek", data.seek);
    });

    socket.on("liked", (data) => {
      socket.to(data.id).emit("like");
    });

    socket.on("disconnecting", () => {
      const room = socket.rooms;
      room.forEach((room) => {
        const clientsInRoom = io.sockets.adapter.rooms.get(room);
        if (clientsInRoom && clientsInRoom.size === 2) {
          socket.to(room).emit("UserLeft");
        }
      });
    });
  });
};
