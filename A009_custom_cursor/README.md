## Custom Cusor

The same cursor shapes with the strokes improve the user experience because an user can intuitively know which region will be filled when they click a mouse.
Trying to implement that feature, I failed due to the three reasons.

 - The mousemove event showed some discontinuity phenomenon.
 - The stroke radius was different from css circle.
 - The center-align of the stroke circle was not matched.

The alternative is to use a predefined cursor shape in css.
I found that _crosshair_ cursor shape could be a unsatisfactory, but reasonable solution. 



## Code and Results

```css
#display-image{
  border: 1px solid black;
  background-position: center;
  background-size: cover;
  cursor: crosshair; // this change the cursor shape.
}
```

## References

- [w3schools](https://www.w3schools.com/cssref/pr_class_cursor.asp): list of predefined cursors
- [freecodecamp](https://www.freecodecamp.org/news/how-to-make-a-custom-mouse-cursor-with-css-and-javascript/): customization tutorial using image file or javascript.
