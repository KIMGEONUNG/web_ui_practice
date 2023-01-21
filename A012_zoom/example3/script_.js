// var canvas = document.getElementsByTagName('canvas')[0];
var c_gt = document.getElementById("c_gt")
var c_blur = document.getElementById("c_blur")

var btn_previous = document.getElementById("btn_previous")
var btn_next = document.getElementById("btn_next")

var original = new Image;
var blur = new Image;
var txt;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'srcs/targets.txt', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    txt = xhr.responseText;
    txt = txt.split(/\r?\n/);

    original.src = txt[0];
    blur.src = txt[1];
  }
};
xhr.send();

btn_next.addEventListener("click",
  function() {
    original.src = txt[2];
    original.onload = () => {
      var ctx_gt = c_gt.getContext('2d');
      redraw(original, ctx_gt);
    }

    blur.src = txt[3];
    blur.onload = () => {
      var ctx_blur = c_blur.getContext('2d');
      redraw(blur, ctx_blur);
    }
  });



function redraw(img, ctx) {
  var p1 = ctx.transformedPoint(0, 0);
  var p2 = ctx.transformedPoint(c_gt.width, c_gt.height);
  ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
  ctx.drawImage(img, 0, 0);
}

window.onload = function() {
  var ctx_gt = c_gt.getContext('2d');
  var ctx_blur = c_blur.getContext('2d');

  trackTransforms(ctx_gt);
  trackTransforms(ctx_blur);

  redraw(original, ctx_gt);
  redraw(blur, ctx_blur);

  var lastX = c_gt.width / 2, lastY = c_gt.height / 2;
  var dragStart, dragged;

  c_gt.addEventListener('mousedown', function(evt) {
    document.body.style.mozUserSelect = document.body.style.userSelect = 'none';
    lastX = evt.offsetX || (evt.pageX - c_gt.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - c_gt.offsetTop);
    dragStart = ctx_gt.transformedPoint(lastX, lastY);
    ctx_blur.transformedPoint(lastX, lastY);
    dragged = false;
  }, false);

  c_gt.addEventListener('mousemove', function(evt) {
    lastX = evt.offsetX || (evt.pageX - c_gt.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - c_gt.offsetTop);
    dragged = true;
    if (dragStart) {
      var pt = ctx_gt.transformedPoint(lastX, lastY);
      ctx_gt.translate(pt.x - dragStart.x, pt.y - dragStart.y);
      ctx_blur.translate(pt.x - dragStart.x, pt.y - dragStart.y);
      redraw(original, ctx_gt);
      redraw(blur, ctx_blur);
    }
  }, false);
  c_gt.addEventListener('mouseup', function(evt) {
    dragStart = null;
    if (!dragged) zoom(evt.shiftKey ? -1 : 1);
  }, false);

  var scaleFactor = 1.1;
  var zoom = function(clicks) {
    var factor = Math.pow(scaleFactor, clicks);
    var pt = ctx_gt.transformedPoint(lastX, lastY);
    ctx_gt.translate(pt.x, pt.y);
    ctx_gt.scale(factor, factor);
    ctx_gt.translate(-pt.x, -pt.y);

    var pt = ctx_blur.transformedPoint(lastX, lastY);
    ctx_blur.translate(pt.x, pt.y);
    ctx_blur.scale(factor, factor);
    ctx_blur.translate(-pt.x, -pt.y);

    redraw(original, ctx_gt);
    redraw(blur, ctx_blur);
  }

  var handleScroll = function(evt) {
    var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
    if (delta) zoom(delta);
    return evt.preventDefault() && false;
  };
  c_gt.addEventListener('DOMMouseScroll', handleScroll, false);
  c_gt.addEventListener('mousewheel', handleScroll, false);
};


function trackTransforms(ctx) {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  var xform = svg.createSVGMatrix();
  ctx.getTransform = function() { return xform; };

  var savedTransforms = [];
  var save = ctx.save;
  ctx.save = function() {
    savedTransforms.push(xform.translate(0, 0));
    return save.call(ctx);
  };
  var restore = ctx.restore;
  ctx.restore = function() {
    xform = savedTransforms.pop();
    return restore.call(ctx);
  };

  var scale = ctx.scale;
  ctx.scale = function(sx, sy) {
    xform = xform.scaleNonUniform(sx, sy);
    return scale.call(ctx, sx, sy);
  };
  var rotate = ctx.rotate;
  ctx.rotate = function(radians) {
    xform = xform.rotate(radians * 180 / Math.PI);
    return rotate.call(ctx, radians);
  };
  var translate = ctx.translate;
  ctx.translate = function(dx, dy) {
    xform = xform.translate(dx, dy);
    return translate.call(ctx, dx, dy);
  };
  var transform = ctx.transform;
  ctx.transform = function(a, b, c, d, e, f) {
    var m2 = svg.createSVGMatrix();
    m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
    xform = xform.multiply(m2);
    return transform.call(ctx, a, b, c, d, e, f);
  };
  var setTransform = ctx.setTransform;
  ctx.setTransform = function(a, b, c, d, e, f) {
    xform.a = a;
    xform.b = b;
    xform.c = c;
    xform.d = d;
    xform.e = e;
    xform.f = f;
    return setTransform.call(ctx, a, b, c, d, e, f);
  };
  var pt = svg.createSVGPoint();
  ctx.transformedPoint = function(x, y) {
    pt.x = x; pt.y = y;
    return pt.matrixTransform(xform.inverse());
  }
}
