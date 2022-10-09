## Image to Canvas using Drag&Drop

Although the file load via form is useful, Drag&Drop is really easy to use in some cases. 
In this example, we implement a feature loading an image on a canvas element using drag&drop interface.

## Code and Results

For dray&drop, we need only two events: _dragover_ and _drop_.
The _dragover_ event is not triggered by a simple mousemove or mouseclick, but fired when an element or text selection is being dragged over.
After releasing the dragover with mouse-click-out, The _drop_ event is fiainlly triggered.
Looking at below codes, there are unfamiliar functions: _stopPropagation_ and _preventDefault_.
I don't know what the purpose is, yet.


```javascript
// Event listener for dragging the image over the div
canvas.addEventListener('dragover', (event) => {
  console.log('dragover event in canvas')
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  event.dataTransfer.dropEffect = 'copy';
});

// Event listener for dropping the image inside the div
canvas.addEventListener('drop', (event) => {
  console.log('drop event in canvas')
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
```
## References

- [Medium](https://medium.com/@codefoxx/easily-drag-drop-images-into-your-project-with-vanilla-javascript-57058f7c3162) 
