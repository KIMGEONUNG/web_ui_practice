const loadImage = async function(path) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
    img.src = path
    img.onload = () => {
      resolve(img)
    }
    img.onerror = e => {
      reject(e)
    }
  })
}
// export default loadImage


// const img = await loadImage("assets/sample01.jpg")

function hello() {
    // #1
    console.log('Hello');
    // #2
    setTimeout(function() {
        console.log('Bye');
    }, 3000);
    // #3
    console.log('Hello Again');
}
