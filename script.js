var drone = new ScaleDrone("MNhk4edYDP7it0ck");

drone.on("open", function (error) {
  if (error) return console.error(error);

  var room = drone.subscribe("chat-room");

  room.on("open", function (error) {
    if (error) return console.error(error);
    console.log("connected");
  });

  room.on("data", addMessageToScreen);
});
//slanje i razmjena
function onSubmitForm() {
  var nameEl = document.querySelector(".input.name"),
    contentEl = document.querySelector(".input.content");

  if (nameEl.value && contentEl.value) {
    sendMessage(nameEl.value, contentEl.value);
    contentEl.value = "";
  }
}

function sendMessage(name, content) {
  drone.publish({
    room: "chat-room",
    message: {
      name: name,
      content: content,
    },
  });
}

function addMessageToScreen(message) {
  var div = document.createElement("div");
  div.innerHTML =
    "<b>" + message.name + "</b>:" + "<i>" + message.content + "</i>";
  div.classList.add("message");
  document.querySelector(".text-area").appendChild(div);
}
