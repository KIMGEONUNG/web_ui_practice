## How to Upload and Display Images with JavaScript

Everything is same with A001, except for the type of display element.
In this scenario, we use _canvas_ rather than _div_.

## Code and Results

For drawing on canvas, we create _Image_ instance and enroll DataURL to _src_ attribute.
Note that the _drawImage_ function has been called by onload event. 


```javascript
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    const display_image = document.querySelector("#display-image") // canvas element
    ctx = display_image.getContext('2d')

    img = new Image()
    img.onload = function(){
      ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
    img.src = uploaded_image // this trigger the onload event

  });
```

