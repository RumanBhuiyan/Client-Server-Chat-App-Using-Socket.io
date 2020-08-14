//importing the required packages
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./public/index.html");
});

io.on("connection", (socket) => {
  console.log(`New user connected id no: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`User is disconnected`);
  });

  //if chat event occours then using io.sockets.emit broadcasting data to every client
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data); //io.emit("chat",data) can do the same job
    //client don't have to listen this writing code maually
  });

  // if typing event occurs broadcast this event to every client
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

server.listen(3000, () => {
  console.log(`Server is listening at port 3000`);
});
