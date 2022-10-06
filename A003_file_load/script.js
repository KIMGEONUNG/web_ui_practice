const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
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
  reader.readAsDataURL(this.files[0]);
});

function hello() {
  console.log('hello')
}
