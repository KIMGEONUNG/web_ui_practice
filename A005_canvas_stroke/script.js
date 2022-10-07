const image_input = document.querySelector("#image-input");
const canvas = document.querySelector("#display-image") // canvas element
const ctx = canvas.getContext('2d')
var toggle = false
var radius = 4.0

canvas.addEventListener("mousemove", function(e) {
  xy = findxy(e)
  if (toggle) {
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle, counterclockwise)
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
  return [ e['layerX'], e['layerY'] ]
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


