## Zoom In and Out for Canvas

It is common need to zoom an image in when we want to closely inpsect an image. 
Especially in image restoration literature, this is the essential feature.
In this example, we implement the zoom-in and out feature on the canvas element.

There are some challenges
- Find the way to use nearest-neighbor interpolation for zoom-in
- Prevent image crop when doing zoom-in

## Code and Results

Firstly, we have to add some buttons to change the interface modes.

```javascript

```

## References

- [StackOverflow](https://stackoverflow.com/questions/5189968/zoom-canvas-to-mouse-cursor/5526721#5526721) 
- [StackOverflow](https://stackoverflow.com/questions/3420975/html5-canvas-zooming) 
