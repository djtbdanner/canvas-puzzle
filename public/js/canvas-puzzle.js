const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const ODD_FIELD_COLOR = "#faebd7";
const PLAY_FIELD_COLOR = "White";
const SHAPE_DEFAULT_COLOR = "green";
const SHAPE_UNUSABLE_COLOR = "gray";
const FIELD_FILLED_COLOR = "gray";
let currentScore = 0;
let weeklyBestScore = 0;
let allTimeBestScore = 0;

document.body.appendChild(canvas);
let shapePositions = [[0, 12], [4, 12], [8, 12]];// original positions of the shapes
let shapesToUse = ["", "", ""]; //array of three
let shapeFits = [true, true, true];
let selectedShapeIndex = 0;
var offsetX, offsetY;
let blockWidth = 900;
let blockHeight = 1800;
/// block values
let W = 900, H = 1800;
const COLS = 10, ROWS = 20;
let BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
console.log(BLOCK_H + " " + BLOCK_W)
let LINE_WIDTH = 5;

// used to calc canvas position relative to window
function buildPlayCanvas() {
    canvas.width = document.body.clientWidth;
    //*.9; //document.width is obsolete
    canvas.height = window.innerHeight;// * .9; //document.height is obsolete
    let BB = canvas.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
    const orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
    if (orientation && orientation.includes(`landscape`)) {
        W = 300, H = 600;
        BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
        LINE_WIDTH = 2;
    } else {
        W = 900, H = 1800;
        BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
        LINE_WIDTH = 5;
    }
    populateFromLocalData();
    for (i = 0; i < shapesToUse.length;i++){
        if (!shapesToUse[i]){
            buildShape(i, shapes[Math.floor(Math.random() * shapes.length)]);
        }
    }
    drawAll();
    console.log(BLOCK_H + " " + BLOCK_W)
}

window.onscroll = function (e) {
    buildPlayCanvas();
}
window.onresize = function (e) {
    buildPlayCanvas();
}
canvas.onresize = function (e) {
    buildPlayCanvas();
}

function drawBlock(x, y) {
    // ctx.shadowColor = '#d53';
    // ctx.shadowBlur = 20;
    // ctx.lineJoin = 'bevel';
    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = 'black';
    //  ctx.strokeStyle = '#38f';
    ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
    ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}

canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;
canvas.onmouseout = handleMouseOut;

canvas.ontouchstart = handleTouchStart;
canvas.ontouchmove = handleTouchMove;
canvas.ontouchend = handleTouchEnd;
canvas.ontouchcancel = handleMouseOut;

function setShapeToBoard(h, v, shape) {
    shape.forEach((square, index) => {
        if (square === 1) {
            let testIndex = getTheIndex(index, v, h);
            if (testIndex.length === 2 && board[testIndex[0]] && board[testIndex[0]][testIndex[1]]) {
                board[testIndex[0]][testIndex[1]].color = FIELD_FILLED_COLOR;
                board[testIndex[0]][testIndex[1]].filled = true;
            }
        }
    });
    currentScore = currentScore + shape.reduce(function(a,b){ return +a + +b; });
    saveLocalData();
}

function willFit(h, v, shape) {
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
    return willFit;
}

function clearBoard(){
    for (let v = 0; v < board.length; v++) {
        for (let h = 0; h < board[v].length; h++) {
            let color = PLAY_FIELD_COLOR;
            if (board[v][h].square % 2) {
                color = ODD_FIELD_COLOR;
            }
            board[v][h].color = color;
            board[v][h].filled = false;
        }
    }
    currentScore = 0;
    for (i = 0; i < shapesToUse.length;i++){
        shapesToUse[i] = undefined;
    }
    shapeFits = [true, true, true];
    saveLocalData();
    buildPlayCanvas();
}


async function checkAndClear() {
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
                board[rowsFilled[i]][c].color = rainbowPlus[c];
                drawAll();
                await sleep(25);

                let color = PLAY_FIELD_COLOR;
                if (board[rowsFilled[i]][c].square % 2) {
                    color = ODD_FIELD_COLOR;
                }
                board[rowsFilled[i]][c].color = color;
                board[rowsFilled[i]][c].filled = false;
            }
        }
    }

    if (colsFilled.length > 0) {
        for (i = 0; i < colsFilled.length; i++) {
            for (let r = 0; r < board[colsFilled[i]].length; r++) {
                board[r][colsFilled[i]].color = rainbowPlus[r];
                drawAll();
                await sleep(25);
                let color = PLAY_FIELD_COLOR;
                if (board[r][colsFilled[i]].square % 2) {
                    color = ODD_FIELD_COLOR;
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
                let colorIndex = 0;
                for (let h = 0; h < board[v].length; h++) {
                    if (board[v][h].square === squareFilled[i]) {
                        board[v][h].color = rainbowPlus[colorIndex];
                        colorIndex = colorIndex + 1;
                        drawAll();
                        await sleep(25);
                        let color = PLAY_FIELD_COLOR;
                        if (board[v][h].square % 2) {
                            color = ODD_FIELD_COLOR;
                        }
                        board[v][h].color = color;
                        board[v][h].filled = false;
                    }
                }
            }
        }
    }
    const clearedItems = colsFilled.length + rowsFilled.length + squareFilled.length; 

    const score = 9*clearedItems*clearedItems;
    currentScore = currentScore+score;

    drawAll();
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (h = 0; h < board.length; h++) {
        for (v = 0; v < board[h].length; v++) {
            ctx.fillStyle = board[h][v].color;
            drawBlock(v + 1, h + 1); // adding one to more or less center the board (need to subtract elsewhere)
        }
    }
    for (var i = 0; i < shapePositions.length; i++) {
        const positions = shapePositions[i];
        buildShape(i, shapesToUse[i]);
    }
    document.getElementById(`score`).innerHTML = currentScore;
    document.getElementById(`weekly-score`).innerHTML = weeklyBestScore;
    document.getElementById(`all-time-score`).innerHTML = allTimeBestScore;
}

function buildShape(index, shape) {
    const positions = shapePositions[index];
    if (!shapeFits[index]) {
        ctx.fillStyle = SHAPE_UNUSABLE_COLOR;
    } else {
        ctx.fillStyle = SHAPE_DEFAULT_COLOR;
    }
    shape.forEach((square, index) => {
        if (square === 1) {
            let testIndex = getTheIndex(index, 0, 0);
            // console.log(`${testIndex} v${v}, h${h}`);
            drawBlock(positions[0] + testIndex[1], positions[1] + testIndex[0]);
        }
    });
    shapesToUse[index] = shape;// add shape to global
}


function checkShapesFitNow() {

    for (i = 0; i < shapesToUse.length; i++) {
        shapeFits[i] = false;
        for (h = 0; h < 9; h++) {
            for (v = 0; v < 9; v++) {
                if (willFit(v, h, shapesToUse[i])) {
                    shapeFits[i] = true;
                    break;
                }
            }
            if (shapeFits[i]){
               break;
            }
        }
    }

    let allDone = true;
    for (i = 0; i < shapesToUse.length; i++) {
        if (shapeFits[i]){
            allDone = false;
        }
    }   
    if (allDone) {
        gameOver();
    }
}

function gameOver(){

    let addedMessages = `~NO SPACES LEFT~`;
    if (currentScore > weeklyBestScore){
        weeklyBestScore = currentScore;
        addedMessages += `<br>You beat your weekly best!`
    }
    if (currentScore > allTimeBestScore){
        allTimeBestScore = currentScore;
        addedMessages += `<br>You beat your All Time Best Score!`
    }
    buildGameOver(addedMessages);
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

async function sleep(millis) {
    await new Promise(resolve => setTimeout(resolve, millis));
}