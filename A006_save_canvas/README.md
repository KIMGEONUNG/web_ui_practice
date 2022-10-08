## Save Canvas Contents to Local System

After editing an image, we would want to save the modified result.
This is for simple save code for an image in a canvas.

## Code and Results

```html
<button type="button" onclick="save()">Save Image</button>
```

```javascript
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
```

## References

- [stack overflow](https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl) 
