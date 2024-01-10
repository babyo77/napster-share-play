const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const fs = require('fs')
app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: true,
  },
});

require("./routes/socket")(io);

app.get('/',(req,res)=>{
fs.createReadStream('./logs/temp.txt').pipe(res)
})

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = server