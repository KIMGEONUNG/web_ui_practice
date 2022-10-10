## Zoom In and Out for Canvas

It is common need to zoom an image in when we want to closely inpsect an image. 
Especially in image restoration literature, this is the essential feature.
In this example, we implement the zoom-in and out feature on the canvas element.

There are some challenges
- Prevent image crop when doing zoom-in

## Code and Results

### Zoom-in

The scale operation should exclude any interpolation method for checking the exact info in an image.
The canvas element uses a pixel smoothing method as default, so we should turn this off.
The code is shown below.

```javascript
canvas.width = img.width
canvas.height = img.height
ctx.imageSmoothingEnabled = false; // This is what we want to use
ctx.scale(coef_scale, coef_scale)
ctx.drawImage(img, 0, 0);
```

### Zoom-out

If we do not save the whole image pixel on the cavane, the image would be cropped by zoom-in operation.
The solution is shown below.

```javascript
```

## References

- [StackOverflow](https://stackoverflow.com/questions/5189968/zoom-canvas-to-mouse-cursor/5526721#5526721) 
- [StackOverflow](https://stackoverflow.com/questions/3420975/html5-canvas-zooming) 
