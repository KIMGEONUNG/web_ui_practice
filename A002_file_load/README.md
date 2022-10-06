## How to Upload and Display Images with JavaScript

Everything is same with A001, except for the type of display element.
In this scenario, we use _img_ rather than _div_.

## Code and Results

Although the previous code, A001, is also working, This is fundamentally weird 
approach because the _style_ attribute is not for drawing.
Surprisingly, simple assignment to _src_ attribute works as intended.

``` javascript
// A001 Code

  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
```

```javascript
// Revised code

  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    const display_image = document.querySelector("#display-image")
    display_image.src = uploaded_image // Note this line
  });
```

The result is slightly different from A001 in that the aspect ratio of the image has been ignored.

![ex1](./src/example1.png) 
