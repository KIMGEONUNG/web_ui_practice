const ws = new WebSocket("ws://127.0.0.1:5678/");
console.log(ws);

ws.onmessage = function(event) {
  console.log("[Message received from server]", event.data)
};

function send() {
  x = document.getElementById("textbox").value;

  try {
    console.log("MSG SENT ", x);
    ws.send(x);
    console.log("SEND FINISHED");
  } catch (error) {
    console.log("CATCH " , error);
  }
}
