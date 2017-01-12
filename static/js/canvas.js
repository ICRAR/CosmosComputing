//Created using the following as reference/inspiration:
//http://jsfiddle.net/alnitak/xN45K/
//http://stackoverflow.com/questions/11735856/draw-grid-table-on-canvas-html5


var bw = 400;
var bh = 400;
var size = 40
var p = 10;
var cw = bw + (p*2) + 1;
var ch = bh + (p*2) + 1;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
function drawBoard(){

for (var x = 0; x <= bw; x += size) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
}


for (var x = 0; x <= bh; x += size) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
}

context.strokeStyle = "black";
context.stroke();
}

$("canvas").click(function(e) {

    function fill(s, gx, gy) {
        context.fillStyle =s;
        context.fillRect(gx * size + 10, gy * size + 10, size, size);
    }

    var mx = e.offsetX;
    var my = e.offsetY;

    var gx = ~~ (mx / size);
    var gy = ~~ (my / size);
    
    if (gx < 0 || gx >= bw/size || gy <0 || gy >= bh/size){
        return;
    }

    fill('black', gx, gy);
});

drawBoard();

