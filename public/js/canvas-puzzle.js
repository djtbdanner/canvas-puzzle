let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

document.body.appendChild(canvas);
let xyPositions = [[0, 12], [4, 12], [8, 12]];// original positions of the shapes
let shapesToUse = ["", "", ""]; //array of three
let selectedShapeIndex = 0;

let shapes = [
    // vertical bar
    [1, 1, 1, 1],
    [1, 1, 1, 0,
        1],
    [1, 1, 1, 0,
        0, 0, 1],
    [1, 1, 0, 0,
        1, 1],
    [1, 1, 0, 0,
        0, 1, 1],
    // square    
    [0, 1, 1, 0,
        1, 1],
    // three and one pointing up _-_    
    [0, 1, 0, 0,
        1, 1, 1],
    // one    
    [1, 0, 0, 0,
        0, 0, 0],
    // vertical    
    [1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0],
    // left vertical corner
    [1, 1, 0, 0,
        0, 1, 0, 0,
        0, 1, 0, 0,
        0, 0, 0, 0],
    // vertical    
    [1, 1, 0, 0,
        1, 0, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 0],
    [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1],
    // bucket    
    [1, 0, 1, 0,
        1, 1, 1, 0,
        0, 0, , 0,
        0, 0, 0, 0],
    // three and one pointing down    
    [1, 1, 1, 0,
        0, 1, 0],
    // three and one pointing right    
    [1, 0, 0, 0,
        1, 1, 0, 0,
        1, 0, , 0,
        0, 0, 0, 0],
    // three and one pointing left    
    [0, 1, , 0,
        1, 1, 0, 0,
        0, 1, , 0,
        0, 0, 0, 0],
    //two corner    
    [1, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, , 0,
        0, 0, 0, 0],
    //two corner    
    [0, 1, 0, 0,
        1, 1, 0, 0,
        0, 0, , 0,
        0, 0, 0, 0],
    [1, 0, 0, 0,
        1, 1, 0, 0,
        0, 0, , 0,
        0, 0, 0, 0],
    [1, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, , 0,
        0, 0, 0, 0],

];
let colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];


// used to calc canvas position relative to window
function reOffset() {
    canvas.width = document.body.clientWidth - 10; //document.width is obsolete
    canvas.height = window.innerHeight - 10; //document.height is obsolete
    var BB = canvas.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
    newShape(0, shapes[Math.floor(Math.random() * shapes.length)]);
    newShape(1, shapes[Math.floor(Math.random() * shapes.length)]);
    newShape(2, shapes[Math.floor(Math.random() * shapes.length)]);
    drawAll();
}

var offsetX, offsetY;
window.onscroll = function (e) { reOffset(); }
window.onresize = function (e) { reOffset(); }
canvas.onresize = function (e) { reOffset(); }

// drag related vars
let isDragging = false;
let startX, startY;

// listen for mouse events
canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;
canvas.onmouseout = handleMouseOut;

canvas.ontouchstart = handleTouchStart;
canvas.ontouchmove = handleTouchMove;
canvas.ontouchend = handleTouchEnd;
canvas.ontouchcancel = handleMouseOut;

// given mouse X & Y (mx & my) and shape object
// return true/false whether mouse is inside the shape
function isMouseInShape(mx, my, shape) {
    return true;
}

function setColors(currentX, currentY, shapeIndex) {
    //setColor(`${currentX}${currentY}`, 'grey');
    let shape = shapesToUse[shapeIndex];
    console.log(shape);
    shape.forEach((x, i) => {
        if (x === 1) {
            if (i < 4) {
                setColor(`${currentX + i}${currentY}`, 'grey');
            } else if (i < 8) {
                setColor(`${currentX + i - 4}${currentY + 1}`, 'grey');
            } else if (i < 12) {
                setColor(`${currentX + i - 8}${currentY + 2}`, 'grey');
            } else {
                setColor(`${currentX + i - 12}${currentY + 3}`, 'grey');
            }
        }
    });
}

function willFit(currentX, currentY, shapeIndex) {
    //setColor(`${currentX}${currentY}`, 'grey');
    let shape = shapesToUse[shapeIndex];
    let willFit = true;
    console.log(shape);
    shape.forEach((x, i) => {
        if (x === 1) {
            let testIndex;
            if (i < 4) {
                testIndex = `${currentX + i}${currentY}`;
            } else if (i < 8) {
                testIndex = `${currentX + i - 4}${currentY + 1}`;
            } else if (i < 12) {
                testIndex = `${currentX + i - 8}${currentY + 2}`;
            } else {
                testIndex = `${currentX + i - 12}${currentY + 2}`;
            }
            console.log(testIndex);
            if (getColor(testIndex) === undefined || getColor(testIndex) === `grey`) {
                willFit = false;
                return;
            }
        }
    });
    return willFit;
}

function checkAndClear() {

    const xFilled = [false, false, true, true, true, true, true, true, true, true, true];
    const yFilled = [false, true, true, true, true, true, true, true, true, true];

    for (x = 2; x < 11; x++) {
        for (y = 1; y < 10; y++) {
            const colorKey = `${x}${y}`;
            const color = getColor(colorKey);
            if (color === `white`) {
                xFilled[x] = false;
                yFilled[y] = false;
            }
        }
    }

    const sudokuAreafilled = [true, true, true, true, true, true, true, true, true];
    for (x = 2; x < 11; x++) {
        for (y = 1; y < 10; y++) {
            const colorKey = `${x}${y}`;
            const color = getColor(colorKey);
            console.log(colorKey + ":" + color);
            if (color === `white`) {
                if (x < 5) {
                    if (y < 4) {
                        sudokuAreafilled[0] = false;
                    }
                    if (y >= 4 && y < 7) {
                        sudokuAreafilled[1] = false;
                    }
                    if (y >= 7 && y < 10) {
                        sudokuAreafilled[2] = false;
                    }
                }
                if (x >= 5 && x < 8) {
                    if (y < 4) {
                        sudokuAreafilled[3] = false;
                    }
                    if (y >= 4 && y < 7) {
                        sudokuAreafilled[4] = false;
                    }
                    if (y >= 7 && y < 10) {
                        sudokuAreafilled[5] = false;
                    }
                }
                if (x >= 8 && x < 11) {
                    if (y < 4) {
                        sudokuAreafilled[6] = false;
                    }
                    if (y >= 4 && y < 7) {
                        sudokuAreafilled[7] = false;
                    }
                    if (y >= 7 && y < 10) {
                        sudokuAreafilled[8] = false;
                    }
                }
            }
        }
    }
    for (let i = 0; i < sudokuAreafilled.length; i++) {
        if (sudokuAreafilled[i]) {
            if (i === 0) {
                for (x = 2; x < 5; x++) {
                    for (y = 1; y < 4; y++) {
                        setColor(`${x}${y}`, `white`);
                    }
                }
            }
            if (i === 1) {
                for (x = 2; x < 5; x++) {
                    for (y = 4; y < 7; y++) {
                        setColor(`${x}${y}`, `white`);
                    }
                }
            }
            if (i === 2) {
                for (x = 2; x < 5; x++) {
                    for (y = 7; y < 10; y++) {
                        setColor(`${x}${y}`, `white`);
                    }
                }
            }
            //
            if (i === 3) {
                for (x = 5; x < 8; x++) {
                    for (y = 1; y < 4; y++) {
                        setColor(`${x}${y}`, `white`);
                    }
                }
            }
            if (i === 4) {
                for (x = 5; x < 8; x++) {
                    for (y = 4; y < 7; y++) {
                        setColor(`${x}${y}`, `white`);
                    }
                }
            }
            if (i === 5) {
                for (x = 5; x < 8; x++) {
                    for (y = 7; y < 10; y++) {
                        setColor(`${x}${y}`, `white`);
                    }
                }
            }
            //
            if (i === 6) {
                for (x = 8; x < 11; x++) {
                    for (y = 1; y < 4; y++) {
                        setColor(`${x}${y}`, `white`);
                    }
                }
            }
            if (i === 7) {
                for (x = 8; x < 11; x++) {
                    for (y = 4; y < 7; y++) {
                        setColor(`${x}${y}`, `white`);
                    }
                }
            }
            if (i === 8) {
                for (x = 8; x < 11; x++) {
                    for (y = 7; y < 10; y++) {
                        setColor(`${x}${y}`, `white`);
                    }
                }
            }
        }
    }
    console.log(xFilled + " - " + yFilled);
    for (let i = 0; i < xFilled.length; i++) {
        if (xFilled[i]) {
            for (y = 1; y < 10; y++) {
                setColor(`${i}${y}`, `white`);
            }
        }
    }
    for (let i = 0; i < yFilled.length; i++) {
        if (yFilled[i]) {
            for (x = 2; x < 11; x++) {
                setColor(`${x}${i}`, `white`);
            }
        }
    }
    console.log(`FILLED = ` + sudokuAreafilled);
}

var COLS = 10, ROWS = 20;
var W = 300, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
// draw a single square at (x, y)
function drawBlock(x, y) {
    ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
    ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}

// clear the canvas and 
// redraw all shapes in their current positions
function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (x = 2; x < 11; x++) {
        for (y = 1; y < 10; y++) {
            ctx.fillStyle = getColor(`${x}${y}`);
            drawBlock(x, y);
        }
    }
    for (var i = 0; i < xyPositions.length; i++) {
        const positions = xyPositions[i];
        newShape(i, shapesToUse[i]);
    }
}

function getColor(index) {
    const x = boardColors.colors.find(function (item) {
        return item[index];
    });
    if (!x) {
        return undefined;
    }
    return x[index];
}

function setColor(index, color) {
    const x = boardColors.colors.find(function (item) {
        return item[index];
    });
    if (x) {
        x[index] = color;
    } else {
        console.log(`BAD INDEX ${index}`)
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
            }
            else {
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

const boardColors =
{
    "colors": [
        {
            "21": "white"
        },
        {
            "22": "white"
        },
        {
            "23": "white"
        },
        {
            "24": "white"
        },
        {
            "25": "white"
        },
        {
            "26": "white"
        },
        {
            "27": "white"
        },
        {
            "28": "white"
        },
        {
            "29": "white"
        },
        {
            "31": "white"
        },
        {
            "32": "white"
        },
        {
            "33": "white"
        },
        {
            "34": "white"
        },
        {
            "35": "white"
        },
        {
            "36": "white"
        },
        {
            "37": "white"
        },
        {
            "38": "white"
        },
        {
            "39": "white"
        },
        {
            "41": "white"
        },
        {
            "42": "white"
        },
        {
            "43": "white"
        },
        {
            "44": "white"
        },
        {
            "45": "white"
        },
        {
            "46": "white"
        },
        {
            "47": "white"
        },
        {
            "48": "white"
        },
        {
            "49": "white"
        },
        {
            "51": "white"
        },
        {
            "52": "white"
        },
        {
            "53": "white"
        },
        {
            "54": "white"
        },
        {
            "55": "white"
        },
        {
            "56": "white"
        },
        {
            "57": "white"
        },
        {
            "58": "white"
        },
        {
            "59": "white"
        },
        {
            "61": "white"
        },
        {
            "62": "white"
        },
        {
            "63": "white"
        },
        {
            "64": "white"
        },
        {
            "65": "white"
        },
        {
            "66": "white"
        },
        {
            "67": "white"
        },
        {
            "68": "white"
        },
        {
            "69": "white"
        },
        {
            "71": "white"
        },
        {
            "72": "white"
        },
        {
            "73": "white"
        },
        {
            "74": "white"
        },
        {
            "75": "white"
        },
        {
            "76": "white"
        },
        {
            "77": "white"
        },
        {
            "78": "white"
        },
        {
            "79": "white"
        },
        {
            "81": "white"
        },
        {
            "82": "white"
        },
        {
            "83": "white"
        },
        {
            "84": "white"
        },
        {
            "85": "white"
        },
        {
            "86": "white"
        },
        {
            "87": "white"
        },
        {
            "88": "white"
        },
        {
            "89": "white"
        },
        {
            "91": "white"
        },
        {
            "92": "white"
        },
        {
            "93": "white"
        },
        {
            "94": "white"
        },
        {
            "95": "white"
        },
        {
            "96": "white"
        },
        {
            "97": "white"
        },
        {
            "98": "white"
        },
        {
            "99": "white"
        },
        {
            "101": "white"
        },
        {
            "102": "white"
        },
        {
            "103": "white"
        },
        {
            "104": "white"
        },
        {
            "105": "white"
        },
        {
            "106": "white"
        },
        {
            "107": "white"
        },
        {
            "108": "white"
        },
        {
            "109": "white"
        }
    ]
};