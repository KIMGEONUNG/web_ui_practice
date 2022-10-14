const image_input = document.querySelector("#image-input");
const canvas = document.querySelector("#display-image") // canvas element
const ctx = canvas.getContext('2d')

const canvas_strk = document.querySelector("#display-stroke") // canvas element
const ctx_strk = canvas_strk.getContext('2d')

var img_original;

// canvas.addEventListener('dragover', (event) => {
//   // console.log('dragover event in canvas')
//   event.stopPropagation();
//   event.preventDefault();
//   // Style the drag-and-drop as a "copy file" operation.
//   event.dataTransfer.dropEffect = 'copy';
// });
//
// // Event listener for dropping the image inside the div
// canvas.addEventListener('drop', (event) => {
//   // console.log('drop event in canvas')
//   event.stopPropagation();
//   event.preventDefault();
//   fileList = event.dataTransfer.files;
//
//   readImage(fileList[0]);
// });

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
      ctx_strk.drawImage(img, 0, 0);
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

canvas_strk.addEventListener("mousemove", function(e) {
  console.log('mouse_move')
  xy = findxy(e)
  if (toggle) {
    ctx_strk.beginPath();
    ctx_strk.arc(xy[0], xy[1], radius, 0, Math.PI * 2, true);
    ctx_strk.fillStyle = color
    ctx_strk.fill();
  }
}, false);

function findxy(e) {
  // return [ e['clientX'], e['clientY'] ]
  return [e['layerX'], e['layerY']]
}

image_input.addEventListener("change", (event) => {
  readImage(event.target.files[0])
});

function save() {
  var dataURL = canvas_strk.toDataURL("image/jpeg", 1.0);
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
