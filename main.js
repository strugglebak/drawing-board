
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var lineWidth = 20;
var isPainting = false;
var lastPosition = {'x': undefined, 'y': undefined};


// 画圈
function drawCircle(positionX, positionY, radius) {
  ctx.beginPath();
  ctx.arc(positionX, positionY, radius, 0, 2 * Math.PI);
  ctx.fill();
}

// 画线
function drawLine(positionX1, positionY1, positionX2, positionY2) {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.moveTo(positionX1, positionY1);
  ctx.lineTo(positionX2, positionY2);
  ctx.stroke();
  ctx.closePath();
}

// 放大和缩小窗口
function windowResize(canvasDiv) {
  var curPageWidth = document.documentElement.clientWidth;
  var curPageHeight = document.documentElement.clientHeight;

  canvasDiv.width = curPageWidth;
  canvasDiv.height = curPageHeight;
}

// 按下鼠标
canvas.onmousedown = function(args) {
  isPainting = true;

  var x = args.clientX;
  var y = args.clientY;

  lastPosition = {'x': x, 'y': y}

  drawCircle(x, y, 2.5);
}

// 动鼠标
canvas.onmousemove = function(args) {

  if (isPainting !== true) {
    return;
  }

  var x = args.clientX;
  var y = args.clientY;
  var nextPosition = {'x': x, 'y': y}

  drawLine(lastPosition.x, lastPosition.y, nextPosition.x, nextPosition.y);

  lastPosition = nextPosition;
}

// 松开鼠标
canvas.onmouseup = function(args) {
  isPainting = false;
}

// 窗口缩放
window.onresize = function() {
  windowResize(canvas);
}
