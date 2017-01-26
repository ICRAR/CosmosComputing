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
        console.log(gx + ',' + gy);
    }
});

instructions_str = '';
var map_string = 'map_string\n';
$("#coordinates").click(function(e){
    for (var [key, value] of coordinateMap) {
        console.log(key + " = " + value);
        coord_string = String(key) + ' = ' + value +'\n';
        map_string += coord_string;
    }
    console.log('Generating Instructions');
    generateInstructions();
    
    function generateInstructions() {
        x_val = 0;
        y_val = 0;
        console.log('Inside function');
        for(var [key, value] of coordinateMap){
            x_y_array = key.split(',');
            x_next = parseInt(x_y_array[0]);
            y_next = parseInt(x_y_array[1]);
            console.log(x_next + ',' + y_next);
            colour = value;

            x_instruction = x_next - x_val;
            y_instruction = y_next - y_val;

            console.log(x_instruction + ',' + y_instruction);

            if(x_instruction < 0){
                x_operation_str = 'Subtract ' + Math.abs(x_instruction) + ' from x\n';
            } else {
                x_operation_str = 'Add ' + x_instruction + ' to x\n';
            }
            instructions_str +=x_operation_str;
            if(y_instruction < 0){
                y_operation_str = 'Subtract ' + Math.abs(y_instruction) + ' from y\n';
            } else {
                y_operation_str = 'Add ' + y_instruction + ' to y\n';
            }
            instructions_str +=y_operation_str;

            instructions_str += 'Get colour ' + colour + '\n';
            instructions_str += 'Plot(x,y,' + colour + ')\n';

            x_val = x_next;
            y_val = y_next;
            console.log(x_val +',' + y_val);
        }
    }

    $("#instructions").append(instructions_str);
    $("#instructions").select();
});

/****************Instruction logic************************/

