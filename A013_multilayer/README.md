## MultiLayer

We need to extract the color strokes from original image.
An famous image editing software, Phtoshop, provide the feature as layer system.
In this example, Let's mimic the fixed two layer system, background and stroke layers.

## Code and Results

We need to use two layers, one for background image, the other for user-guidance. 
An simple idea is to create two canvas elements and superimpose them as below.

```html
<div style="position: relative;">
  <canvas id="display-image" width="500" height="500"
  style="position: relative; z-index: 0;"></canvas>
  <canvas id="display-stroke" width="500" height="500" 
 style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
</div>
``` 

## References

- [StackOverflow](https://stackoverflow.com/questions/3008635/html5-canvas-element-multiple-layers) 
