const image_input = document.querySelector("#image-input");
const canvas = document.querySelector("#display-image") // canvas element
const ctx = canvas.getContext('2d')

var img_original;
var coef_scale = 2;
var scale_agg = 1;

var lastX=canvas.width/2, lastY=canvas.height/2;
var dragStart,dragged;

function zoomin() {
  console.log('zoomin')
  img = new Image()
  img.onload = function() {
    canvas.width = img.width
    canvas.height = img.height
    ctx.imageSmoothingEnabled = false;
    scale_agg *= coef_scale
    ctx.scale(scale_agg, scale_agg)
    ctx.drawImage(img, 0, 0);
  };
  img.src = img_original
}

function zoomout() {
  console.log('zoomout')
  img = new Image()
  img.onload = function() {
    canvas.width = img.width
    canvas.height = img.height
    scale_agg *= (1 / coef_scale)
    ctx.scale(scale_agg, scale_agg)
    ctx.drawImage(img, 0, 0);
  };
  // img.src = canvas.toDataURL("image/png", 1.0);
  img.src = img_original
}

function pan() {
  console.log('pan')
}
// DRAG AND DROP ///////////////////////////////////////////////////////////////

// Event listener for dragging the image over the div
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
      ctx.drawImage(img, 0, 0);
    };
    img.src = img_original
  });
  reader.readAsDataURL(file);
}
//////////////////////////////////////////////////////////////////////////////

var toggle = false
var radius = 12.0 

const colorpicker = document.getElementById("colorpicker")
var color = colorpicker.value
colorpicker.addEventListener("change", function(v) {
  color = this.value
})

canvas.addEventListener("mousemove", function(e) {
  lastX = e.offsetX || (e.pageX - canvas.offsetLeft);
  lastY = e.offsetY || (e.pageY - canvas.offsetTop);
  dragged = true;

  xy = findxy(e)
  if (toggle) {
    ctx.beginPath();
    ctx.arc(xy[0], xy[1], radius, 0, Math.PI * 2, true);
    ctx.fillStyle = color
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


var scaleFactor = 1.1;
var zoom = function(clicks){
  ctx.translate(lastX, lastY);
  var factor = Math.pow(scaleFactor,clicks);
  ctx.scale(factor,factor);
  ctx.translate(lastX, lastY);

  // redraw();
  img = new Image()
  img.onload = function() {
    canvas.width = img.width
    canvas.height = img.height
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0);
  };
  img.src = img_original
}

var handleScroll = function(evt){
  var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
  if (delta) zoom(delta);
  return evt.preventDefault() && false;
};

canvas.addEventListener('DOMMouseScroll',handleScroll,false);
canvas.addEventListener('mousewheel',handleScroll,false);

function findxy(e) {
  // return [ e['clientX'], e['clientY'] ]
  return [e['layerX'], e['layerY']]
}

image_input.addEventListener("change", (event) => {
  readImage(event.target.files[0])
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
