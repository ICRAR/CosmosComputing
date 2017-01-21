//Created using the following as reference/inspiration:
//http://jsfiddle.net/alnitak/xN45K/
//http://stackoverflow.com/questions/11735856/draw-grid-table-on-canvas-html5


var bw = 400;
var bh = 400;
var size = 40
var p = 10;
var cw = bw + (p*2) + 1;
var ch = bh + (p*2) + 1;
var current_colour = "black"


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

var h = bh/size;
var w = bw/size;

var state = new Array(h);
for (var y = 0; y < h; ++y) {
    state[y] = new Array(w);
} 

drawBoard();

var current_colour = 'black'
$("#chooseBlackColour").click(function chooseBlack(){
    current_colour = 'black';
    console.log('Black chosen');
});

$("#chooseRedColour").click(function(e){
    current_colour = 'red';
    console.log('Red chosen');
});

$("#chooseBlueColour").click(function(e){
    current_colour = 'blue';
    console.log('Blue Chosen');
});

$("#chooseYellowColour").click(function(e){
    current_colour = 'yellow';
    console.log('Yellow Chosen');
});


var coordinateMap = new Map();

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

    if(state[gy][gx]) {
        state[gy][gx] = false;
        fill('white', gx,gy);

        var coordinateString = gx + ',' + gy;
        coordinateMap.delete(coordinateString)

        drawBoard();
    } else {
        state[gy][gx]=true;
        fill(current_colour, gx, gy);

        var coordinateString = gx + ',' + gy;
        coordinateMap.set(coordinateString, current_colour);
        drawBoard();
        console.log(gx + ', ' + gy);
    }
});

$("#coordinates").click(function(e){
    for (var [key, value] of coordinateMap) {
        console.log(key + " = " + value);
    }   
});
/************************************************************/

// (function () {
// var textFile = null,
//     makeTextFile = function (text) {
//     var data = new Blob([text], {type: 'text/plain'});

//     // If we are replacing a previously generated file we need to
//     // manually revoke the object URL to avoid memory leaks.
//     if (textFile !== null) {
//         window.URL.revokeObjectURL(textFile);
//     }

//     textFile = window.URL.createObjectURL(data);

//     return textFile;
//     };


//     var create = document.getElementById('create'),
//     textbox = document.getElementById('textbox');

//     create.addEventListener('click', function () {
//         var link = document.getElementById('downloadlink');
//         link.href = makeTextFile(textbox.value);
//         link.style.display = 'block';
//     }, false);
// })();