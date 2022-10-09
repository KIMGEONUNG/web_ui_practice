const image_input = document.querySelector("#image-input");
const canvas = document.querySelector("#display-image") // canvas element
const ctx = canvas.getContext('2d')

//////////////////////////////////////////////////////////////////////////////
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
    var uploaded_image = event.target.result;
    img = new Image()
    img.onload = function() {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0);
    };
    img.src = uploaded_image
  });
  reader.readAsDataURL(file);
}
//////////////////////////////////////////////////////////////////////////////

var toggle = false
var radius = 4.0

const colorpicker = document.getElementById("colorpicker")
var color = colorpicker.value
colorpicker.addEventListener("change", function(v) {
  color = this.value
})

canvas.addEventListener("mousemove", function(e) {
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
