// INIT
var pane = document.getElementById("pane");
var ids;
var groups;
var path_group = [];
var len_group;
var idx = 0;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'srcs/targets.txt', true);
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var targets = xhr.responseText.split(/\r?\n/);
    targets.pop()
    groups = targets

    targets.forEach(e => {
      var canvas = document.createElement('canvas');
      canvas.width = 256
      canvas.height = 256
      pane.appendChild(canvas);

      // LOAD FILE LIST
      var xhr = new XMLHttpRequest();
      var path = 'srcs/' + e + '.txt'
      xhr.open('GET', path, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var files = xhr.responseText.split(/\r?\n/);
          files.pop()
          path_group.push(files)
        }
      };
      xhr.send();

    });
  }
};
xhr.send();

console.log(groups)
console.log(path_group)
