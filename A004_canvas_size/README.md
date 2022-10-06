## How to dynamically change the canvas size with respect to image size

Fixing a canvas size, some region of an image could be omitted due to the size-overflow.
Therefore, the canvas size need to be change depending on the image size.


## Code and Results

The only difference with A003 is the two lines in onload callback.
After an image has been loaded, the Image instance knows the width and hight of data,
and it is possible to change the size attributes with onload callback.


```javascript
  const display_image = document.querySelector("#display-image") // canvas element
  ctx = display_image.getContext('2d')

  img = new Image()
  img.onload = function(){
    display_image.width = img.width   // difference
    display_image.height = img.height // difference
    ctx.drawImage(img,0,0); 
  };
  img.src = uploaded_image 
```

