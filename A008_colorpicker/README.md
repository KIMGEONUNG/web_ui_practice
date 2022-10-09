## Color Picker

In previous example, we can draw black stroke on the canvas.
However, it is better to choose the color we want to stroke with.
In this example, Let's implant color-picker UI element and change the color of stroke.


## Code and Results

```html
<label for="colorpicker">Color Picker:</label>
<input id="colorpicker" type="color" value="#0000ff">
```

```javascript
const colorpicker = document.getElementById("colorpicker")
var color = colorpicker.value
colorpicker.addEventListener("change", function(v) {
  color = this.value
})

canvas.addEventListener("mousemove", function(e) {
  xy = findxy(e)
  if (toggle) {
    ctx.beginPath();
    console.log(color)
    ctx.arc(xy[0], xy[1], radius, 0, Math.PI * 2, true);
    ctx.fillStyle = color // Define color
    ctx.fill();
  }
}, false);
```


<html>
<head>
  <link rel="stylesheet" href="style.css">
  <style>
  #display-image{
    border: 1px solid black;
    background-position: center;
    background-size: cover;
  }
  </style>
</head>

<body>
  <div style="display:block;">
    <div>
      <input type="file" id="image-input" accept="image/*">
    </div>

    <div>
      <canvas id="display-image" width="500" height="500"></canvas>
    </div>
    <div>
      <label for="colorpicker">Color Picker:</label>
      <input id="colorpicker" type="color" value="#0000ff">
    </div>
    <div>
      <button type="button" onclick="save()">Save Image</button>
    </div>
  </div>
  <script>

  const image_input = document.querySelector("#image-input");
  const canvas = document.querySelector("#display-image") // canvas element
  const ctx = canvas.getContext('2d')

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
      console.log(color)
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

  </script>
</body>
</html>

## References

- [W3schools](https://www.w3schools.com/colors/colors_picker.asp) 
- [educative](https://www.educative.io/answers/how-to-add-a-color-picker-in-html) 
