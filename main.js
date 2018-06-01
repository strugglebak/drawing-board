
var canvasDiv = document.getElementById('canvas');
var lineWidth = 20;
var isPainting = false;

// 按下鼠标
canvas.onmousedown = function(args) {
  isPainting = true;

  var x = args.clientX;
  var y = args.clientY;

  var div = document.createElement('div');
  var style =   'position: absolute;' +
                'width: ' + lineWidth + 'px; height: ' + lineWidth + 'px;' +
                'border-radius: 50%;' +
                'background: black;' +
                'left: ' + (x - lineWidth/2) + 'px;' + 'top: ' + (y - lineWidth/2) + 'px;';

  div.style = style;

  canvasDiv.appendChild(div);
}

// 动鼠标
canvas.onmousemove = function(args) {

  if (isPainting !== true) {
    return;
  }

  var x = args.clientX;
  var y = args.clientY;

  var div = document.createElement('div');
  var style =   'position: absolute;' +
                'width: ' + lineWidth + 'px; height: ' + lineWidth + 'px;' +
                'border-radius: 50%;' +
                'background: black;' +
                'left: ' + (x - lineWidth/2) + 'px;' + 'top: ' + (y - lineWidth/2) + 'px;';

  console.log(style);
  div.style = style;

  canvasDiv.appendChild(div);
}

// 松开鼠标
canvas.onmouseup = function(args) {
  isPainting = false;
}
