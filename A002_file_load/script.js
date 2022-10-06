const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    const display_image = document.querySelector("#display-image")
    display_image.src = uploaded_image
  });
  reader.readAsDataURL(this.files[0]);
});
