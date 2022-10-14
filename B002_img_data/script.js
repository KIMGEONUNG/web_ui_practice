const ws = new WebSocket("ws://127.0.0.1:5678/");
// console.log(ws);

ws.onmessage = function(event) {
  // console.log("[Message received from server]")
  // console.log(event.data)
  var img = new Image
  img.src = event.data
  // var panel = document.getElementById('panel')
  // panel.appendChild(img)
  img.onload = () =>{
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
  }
};

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var img = new Image
img.src = "assets/sample01.jpg"
// var panel = document.getElementById('panel')
// panel.appendChild(img)
img.onload = () =>{
  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0)
}

function send() {
  var info = canvas.toDataURL('image/png')
  try {
    ws.send(info);
    console.log("SEND FINISHED");
  } catch (error) {
    console.log("CATCH " , error);
  }
}
