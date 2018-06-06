
var canvas = document.getElementById('canvas');
var eraserButton = document.getElementById('eraser');
var brushButton = document.getElementById('brush');
var clearButton = document.getElementById('clear');
var downloadButton = document.getElementById('download');
var actions = document.getElementById('actions');
var color = document.getElementById('color');
var colorRed = document.getElementById('red');
var colorYellow = document.getElementById('yellow');
var colorBlue = document.getElementById('blue');
var colorBlack = document.getElementById('black');
var thinLine = document.getElementById('thin');
var thickLine = document.getElementById('thick');

var ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';
ctx.lineWidth = 5;

var lineWidth = 20;
var isUsing = false;
var eraseEnabled = false;
var lastPosition = {'x': undefined, 'y': undefined};

windowResize(canvas);

// 画圈
function drawCircle(positionX, positionY, radius) {
  ctx.beginPath();
  ctx.arc(positionX, positionY, radius, 0, 2 * Math.PI);
  ctx.fill();
}

// 画线
function drawLine(positionX1, positionY1, positionX2, positionY2) {
  ctx.beginPath();
  ctx.moveTo(positionX1, positionY1);
  ctx.lineTo(positionX2, positionY2);
  ctx.stroke();
  ctx.closePath();
}

// 擦除
function erasePatten(positionX, positionY) {
  ctx.clearRect(positionX - 25, positionY - 25, 50, 50);
}

// 放大和缩小窗口
function windowResize(canvasDiv) {
  var curPageWidth = document.documentElement.clientWidth;
  var curPageHeight = document.documentElement.clientHeight;

  canvasDiv.width = curPageWidth;
  canvasDiv.height = curPageHeight;
}

// 特性检测，判断是否为触屏设备
if (document.body.ontouchstart !== undefined) {
  /** 监听触屏设备 **/
  canvas.ontouchstart = function(args) {
    isUsing = true;

    var x = args.touches[0].clientX;
    var y = args.touches[0].clientY;

    if (eraseEnabled) {
      erasePatten(x, y);
    } else {
      lastPosition = {'x': x, 'y': y}
    }
  }
  canvas.ontouchmove = function(args) {
    if (!isUsing) {
      return;
    }

    var x = args.touches[0].clientX;
    var y = args.touches[0].clientY;

    if (eraseEnabled) {
      erasePatten(x, y);
    } else {
      var nextPosition = {'x': x, 'y': y};
      drawLine(lastPosition.x, lastPosition.y, nextPosition.x, nextPosition.y);
      lastPosition = nextPosition;
    }
  }
  canvas.ontouchend = function(args) {
    isUsing = false;
  }
} else {
  /** 监听电脑设备 **/

  // 按下鼠标
  canvas.onmousedown = function(args) {
    isUsing = true;
    var x = args.clientX;
    var y = args.clientY;

    if (eraseEnabled) {
      erasePatten(x, y);
    } else {
      drawCircle(x, y, 2.5);
      lastPosition = {'x': x, 'y': y};
    }
  }

  // 动鼠标
  canvas.onmousemove = function(args) {
    if (!isUsing) {
      return;
    }
    var x = args.clientX;
    var y = args.clientY;

    if (eraseEnabled) {
      erasePatten(x, y);
    } else {
      var nextPosition = {'x': x, 'y': y};
      drawLine(lastPosition.x, lastPosition.y, nextPosition.x, nextPosition.y);
      lastPosition = nextPosition;
    }
  }

  // 松开鼠标
  canvas.onmouseup = function(args) {
    isUsing = false;
  }
}

// 窗口缩放
window.onresize = function() {
  windowResize(canvas);
}

eraserButton.onclick = function() {
  eraseEnabled = true;
  // actions.className = 'actions display';
  eraserButton.classList.add('active');
  brushButton.classList.remove('active');
  clearButton.classList.remove('active');
  downloadButton.classList.remove('active');
}
brushButton.onclick = function() {
  eraseEnabled = false;
  // actions.className = 'actions';
  brushButton.classList.add('active');
  eraserButton.classList.remove('active');
  clearButton.classList.remove('active');
  downloadButton.classList.remove('active');
}
clearButton.onclick = function() {
  clearButton.classList.add('active');
  eraserButton.classList.remove('active');
  brushButton.classList.remove('active');
  downloadButton.classList.remove('active');
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
downloadButton.onclick = function() {

  var url = canvas.toDataURL('images/png');
  console.log(url);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = 'My painting';
  a.target = '_blank';
  a.click();

  downloadButton.classList.add('active');
  clearButton.classList.remove('active');
  eraserButton.classList.remove('active');
  brushButton.classList.remove('active');
}

colorRed.onclick = function() {
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'red';

  colorRed.classList.add('active');
  colorBlue.classList.remove('active');
  colorYellow.classList.remove('active');
  colorBlack.classList.remove('active');
}
colorBlue.onclick = function() {
  ctx.fillStyle = 'blue';
  ctx.strokeStyle = 'blue';

  colorBlue.classList.add('active');
  colorRed.classList.remove('active');
  colorYellow.classList.remove('active');
  colorBlack.classList.remove('active');
}
colorYellow.onclick = function() {
  ctx.fillStyle = 'yellow';
  ctx.strokeStyle = 'yellow';

  colorYellow.classList.add('active');
  colorRed.classList.remove('active');
  colorBlue.classList.remove('active');
  colorBlack.classList.remove('active');
}
colorBlack.onclick = function() {
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';

  colorBlack.classList.add('active');
  colorRed.classList.remove('active');
  colorBlue.classList.remove('active');
  colorYellow.classList.remove('active');
}

thinLine.onclick = function() {
  ctx.lineWidth = 5;
  thinLine.classList.add('active');
  thickLine.classList.remove('active');
}
thickLine.onclick = function() {
  ctx.lineWidth = 10;
  thickLine.classList.add('active');
  thinLine.classList.remove('active');
}
