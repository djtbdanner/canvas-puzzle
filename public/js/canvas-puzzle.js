let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

document.body.appendChild(canvas);
let xyPositions = [[0, 12], [4, 12], [8, 12]];// original positions of the shapes
let shapesToUse = ["", "", ""]; //array of three
let selectedShapeIndex = 0;
var offsetX, offsetY;

// used to calc canvas position relative to window
function reOffset() {
    canvas.width = document.body.clientWidth - 10; //document.width is obsolete
    canvas.height = window.innerHeight - 10; //document.height is obsolete
    let BB = canvas.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
    newShape(0, shapes[Math.floor(Math.random() * shapes.length)]);
    newShape(1, shapes[Math.floor(Math.random() * shapes.length)]);
    newShape(2, shapes[Math.floor(Math.random() * shapes.length)]);
    drawAll();
}

window.onscroll = function (e) {
    reOffset();
}
window.onresize = function (e) {
    reOffset();
}
canvas.onresize = function (e) {
    reOffset();
}

// listen for mouse events
canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;
canvas.onmouseout = handleMouseOut;

canvas.ontouchstart = handleTouchStart;
canvas.ontouchmove = handleTouchMove;
canvas.ontouchend = handleTouchEnd;
canvas.ontouchcancel = handleMouseOut;


function setColors(h, v, shapeIndex) {

    let shape = shapesToUse[shapeIndex];
    // console.log(shape);
    shape.forEach((square, index) => {
        if (square === 1) {
            let testIndex = getTheIndex(index, v, h);
            if (testIndex.length === 2 && board[testIndex[0]] && board[testIndex[0]][testIndex[1]]) {
                board[testIndex[0]][testIndex[1]].color = `grey`;
                board[testIndex[0]][testIndex[1]].filled = true;
            }
        }
    });
}

function willFit(h, v, shapeIndex) {
    // console.log(`will fit  -h ${h} -v ${v}`)
    let shape = shapesToUse[shapeIndex];
    let willFit = true;
    // board first number is the vertical (0 based), second number is horizontal (0 based)
    shape.forEach((square, index) => {
        let testIndex = [];
        if (square === 1) {
            testIndex = getTheIndex(index, v, h);
            if (testIndex.length === 2) {
                if (!board[testIndex[0]] || !board[testIndex[0]][testIndex[1]]) {
                    willFit = false;
                    return; /// stop looping
                }
                if (board[testIndex[0]][testIndex[1]].filled) {
                    willFit = false;
                    return; /// stop looping
                }
            }
        }
    });
    console.log(`fits ${willFit}`)
    return willFit;
}


function checkAndClear() {
    const colsFilled = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const rowsFilled = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const squareFilled = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // board first number is the vertical (0 based), second number is horizontal (0 based)
    for (let v = 0; v < board.length; v++) {
        for (let h = 0; h < board[v].length; h++) {
            const square = board[v][h].square;
            const filled = board[v][h].filled;
            if (!filled) {
                let index = colsFilled.indexOf(h);
                if (index > -1) {
                    colsFilled.splice(index, 1);
                }
                index = rowsFilled.indexOf(v);
                if (index > -1) {
                    rowsFilled.splice(index, 1);
                }
                index = squareFilled.indexOf(square);
                if (index > -1) {
                    squareFilled.splice(index, 1);
                }
            }
        }
    }

    if (rowsFilled.length > 0) {
        for (i = 0; i < rowsFilled.length; i++) {
            for (let c = 0; c < board[rowsFilled[i]].length; c++) {
                let color = "white";
                if (board[rowsFilled[i]][c].square % 2){
                    color = "Linen";
                }
                board[rowsFilled[i]][c].color = color;
                board[rowsFilled[i]][c].filled = false;
            }
        }
    }

    if (colsFilled.length > 0) {
        for (i = 0; i < colsFilled.length; i++) {
            for (let r = 0; r < board[colsFilled[i]].length; r++) {
                let color = "white";
                if (board[r][colsFilled[i]].square % 2){
                    color = "Linen";
                }
                board[r][colsFilled[i]].color = color;
                board[r][colsFilled[i]].filled = false;
            }
        }
    }

    if (squareFilled.length > 0) {
        // todo - Search the board for the filled????
        for (i = 0; i < squareFilled.length; i++) {
            for (let v = 0; v < board.length; v++) {
                for (let h = 0; h < board[v].length; h++) {
                    if (board[v][h].square === squareFilled[i]) {
                        let color = "white";
                        if (board[v][h].square % 2){
                            color = "Linen";
                        }
                        board[v][h].color = color;
                        board[v][h].filled = false;
                    }
                }
            }
        }
    }
}

var COLS = 10, ROWS = 20;
var W = 300, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;

// draw a single square at (x, y)
function drawBlock(x, y) {
    ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
    ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}


function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (h = 0; h < board.length; h++) {
        for (v = 0; v < board[h].length; v++) {
            ctx.fillStyle = board[h][v].color;
            drawBlock(v, h);
        }
    }
    for (var i = 0; i < xyPositions.length; i++) {
        const positions = xyPositions[i];
        newShape(i, shapesToUse[i]);
    }
}


// creates a new 4x4 shape in global variable 'current'
// 4x4 so as to cover the size when the shape is rotated
function newShape(index, shape) {
    // let id = Math.floor(Math.random() * shapes.length);
    // let shape = shapes[id]; // maintain id for color filling

    current = [];
    for (var y = 0; y < 4; ++y) {
        current[y] = [];
        for (var x = 0; x < 4; ++x) {
            var i = 4 * y + x;
            if (typeof shape[i] != 'undefined' && shape[i]) {
                current[y][x] = index + 1;
            } else {
                current[y][x] = 0;
            }
        }
    }
    shapesToUse[index] = shape;
    const positions = xyPositions[index];
    render(positions[0], positions[1]);
}

function render(currentX, currentY) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            if (current[y][x]) {
                ctx.fillStyle = colors[current[y][x] - 1];
                drawBlock(currentX + x, currentY + y);
            }
        }
    }
}

function getTheIndex(index, v, h) {
    let testIndex = [];
    if (index < 4) {
        testIndex.push(v);
        testIndex.push(h + index); // 2nd
    } else if (index < 8) {
        testIndex.push(v + 1);
        testIndex.push(h + index - 4);
    } else if (index < 12) {
        testIndex.push(v + 2);
        testIndex.push(h + index - 8);
    } else {
        testIndex.push(v + 3);
        testIndex.push(h + index - 12);
    }
    return testIndex;
}
