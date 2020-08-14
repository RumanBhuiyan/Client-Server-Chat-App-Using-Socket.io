let socket = io().connect("http://localhost:3000");

const name = document.getElementById("name");
const message = document.getElementById("message");
const btn = document.getElementById("button");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

btn.addEventListener("click", function () {
  //creating chat event & sending it to server
  //N.B for sending event socket.emit is used , for listening event socket.on is used
  socket.emit("chat", {
    message: message.value,
    name: name.value,
  });
  message.value = "";
});

message.addEventListener("keypress", function () {
  //creating typing event and sending it to server
  socket.emit("typing", name.value);
});

//due to io.sockets.emit("chat", data) broadcast,client has to listen this event
socket.on("chat", function (data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p class='chat'><strong class='strong'>" +
    data.name +
    ": </strong>" +
    data.message +
    "</p>";
});

//due to socket.broadcast.emit("typing", data)  broadcasting,
//client has to listen this event
socket.on("typing", function (data) {
  feedback.innerHTML =
    "<p class='chat'><strong>" + data + " is typing a message...</strong></p>";
});
