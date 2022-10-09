const image_input = document.querySelector("#image-input");
const canvas = document.querySelector("#display-image") // canvas element
const ctx = canvas.getContext('2d')

const cursorRounded = document.querySelector('.rounded');
const moveCursor = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}
canvas.addEventListener('mousemove', moveCursor)


var toggle = false
var radius = 8.0

const colorpicker = document.getElementById("colorpicker")
ctx.fillStyle = colorpicker.value
colorpicker.addEventListener("change", function(v) {
  ctx.fillStyle = colorpicker.value
})

canvas.addEventListener("mousemove", function(e) {
  xy = findxy(e)
  if (toggle) {
    ctx.beginPath();
    ctx.arc(xy[0], xy[1], radius, 0, Math.PI * 2, true);
    ctx.fill();
  }
}, false);
canvas.addEventListener("mousedown", function(e) {
  toggle = true
}, false);
canvas.addEventListener("mouseup", function(e) {
  toggle = false
}, false);
canvas.addEventListener("mouseout", function(e) {
  toggle = false
}, false);

function findxy(e) {
  // return [ e['clientX'], e['clientY'] ]
  return [e['layerX'], e['layerY']]
}

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;

    img = new Image()
    img.onload = function() {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = colorpicker.value
    };
    img.src = uploaded_image
  });
  reader.readAsDataURL(this.files[0]);
});


function save() {
  var dataURL = canvas.toDataURL("image/jpeg", 1.0);
  downloadImage(dataURL, 'my-canvas.jpeg');
}

// Save | Download image
function downloadImage(data, filename = 'untitled.jpeg') {
  var a = document.createElement('a');

  a.href = data;
  a.download = filename;
  a.click();
  a.remove();
}
