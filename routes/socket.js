module.exports = (io) => {
  let Total=0
  io.on("connection", (socket) => {
    console.log(Total++);
    socket.on("JoinRoom", (data) => {
      socket.join(data.id);
      const room = io.sockets.adapter.rooms.get(data.id);
      if (room && room.size >= 2) {
        io.to(data.id).emit("Joined", data.song);
      }
    });

    socket.on("play", (data) => {
      socket.to(data.id).emit("PlaySong", data.song);
    });
    socket.on("seek", (data) => {
      socket.to(data.id).emit("seek", data.seek);
    });

    socket.on("disconnecting", () => {
      const room = socket.rooms;
      room.forEach((room) => {
        if (room !== socket.id) socket.to(room).emit("UserLeft");
      });
    });
  });
};
