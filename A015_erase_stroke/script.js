const image_input = document.querySelector("#image-input");
const canvas = document.querySelector("#display-image") // canvas element
const ctx = canvas.getContext('2d')

const canvas_strk = document.querySelector("#display-stroke") // canvas element
const ctx_strk = canvas_strk.getContext('2d')

var img_original;

canvas.addEventListener('dragover', (event) => {
  // console.log('dragover event in canvas')
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  event.dataTransfer.dropEffect = 'copy';
});

// Event listener for dropping the image inside the div
canvas.addEventListener('drop', (event) => {
  // console.log('drop event in canvas')
  event.stopPropagation();
  event.preventDefault();
  fileList = event.dataTransfer.files;

  readImage(fileList[0]);
});

// Converts the image into a data URI
readImage = (file) => {
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    img_original = event.target.result;
    img = new Image()
    img.onload = function() {
      canvas.width = img.width
      canvas.height = img.height
      canvas_strk.width = img.width
      canvas_strk.height = img.height
      ctx.drawImage(img, 0, 0);
    };
    img.src = img_original
  });
  reader.readAsDataURL(file);
}
//////////////////////////////////////////////////////////////////////////////

var toggle = false
var radius = document.getElementById('stroke_size').value
function ch_strk_size(size) {
  if (Number(size) < 2) {
    size = 2
  }
  radius = size
  document.getElementById('stroke_size').value = size
}

function clearStroke() {
  ctx_strk.clearRect(0, 0, canvas_strk.width, canvas_strk.height)
}

var handleScroll = function(evt){
  var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
  if (delta) ch_strk_size(delta > 1 ? Number(radius) + 1 : Number(radius) - 1);
  return evt.preventDefault() && false;
};

canvas_strk.addEventListener('DOMMouseScroll',handleScroll,false);
canvas_strk.addEventListener('mousewheel',handleScroll,false);


const colorpicker = document.getElementById("colorpicker")
var color = colorpicker.value
colorpicker.addEventListener("change", function(v) {
  color = this.value
})

canvas_strk.addEventListener("mousemove", function(e) {
  xy = findxy(e)
  if (toggle) {
    ctx_strk.beginPath();
    ctx_strk.arc(xy[0], xy[1], radius, 0, Math.PI * 2, true);
    ctx_strk.fillStyle = color
    ctx_strk.fill();
  }
}, false);
canvas_strk.addEventListener("mousedown", function(e) {
  toggle = true
}, false);
canvas_strk.addEventListener("mouseup", function(e) {
  toggle = false
}, false);
canvas_strk.addEventListener("mouseout", function(e) {
  toggle = false
}, false);

function findxy(e) {
  return [e['layerX'], e['layerY']]
}

image_input.addEventListener("change", (event) => {
  readImage(event.target.files[0])
});

function save() {
  var dataURL = canvas_strk.toDataURL("image/png", 1.0);
  downloadImage(dataURL, 'my-canvas.png');
}

// Save | Download image
function downloadImage(data, filename = 'untitled.jpeg') {
  var a = document.createElement('a');

  a.href = data;
  a.download = filename;
  a.click();
  a.remove();
}
