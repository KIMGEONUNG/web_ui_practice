var myimg;

function load_img(path) {
  img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = path;
  img.onload = function(){ 
    let elem = document.getElementById('myCanvas');
    ctx = elem.getContext('2d');
    ctx.drawImage(img, 0, 0);
    imageData = ctx.getImageData(0, 0, img.width, img.height);
  }
}

function on_change4form(files) {
  myimg = files
  console.log("This is \" on_change4form \"")
  // console.log(files)
  load_img('assets/sample01.jpg')
}

