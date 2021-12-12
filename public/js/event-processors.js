let isDragging = false;
let startX, startY;

function handleMouseMove(e){
    handleMove(e, false);
}
function handleTouchMove(e){
    handleMove(e, true);
}
function handleMove(e, isTouch) {

    if (!isDragging) { return; }

    e.preventDefault();
    e.stopPropagation();

    let { x, y } = getXYCords(e, isTouch);
    shapePositions[selectedShapeIndex][0] = x;
    shapePositions[selectedShapeIndex][1] = y;
    // clear the canvas and redraw all shapes
    drawAll();
}

function handleMouseOut(e) {
    if (!isDragging) { return; }
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
}

function handleMouseUp(e){
    handleDragEnd(e, false);
}
function handleTouchEnd(e){
    handleDragEnd(e, true);
}
async function handleDragEnd(e, isTouch) {
    if (!isDragging) { return; }
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;

    let { x, y } = getXYCords(e,isTouch);
    // -- offsetting one here to allow for the board to be over and down one
    if (willFit(x-1, y-1, shapesToUse[selectedShapeIndex])) {
        setShapeToBoard(x-1, y-1, shapesToUse[selectedShapeIndex]);
        buildShape(selectedShapeIndex, shapes[Math.floor(Math.random() * shapes.length)]);
    }
    shapePositions[0][0] = 0;
    shapePositions[0][1] = 12;
    shapePositions[1][0] = 4;
    shapePositions[1][1] = 12;
    shapePositions[2][0] = 8;
    shapePositions[2][1] = 12;

    await checkAndClear();
    checkShapesFitNow();
    drawAll();
}
function handleMouseDown(e){
    handleDragStart(e, false);
}
function handleTouchStart(e){
    handleDragStart(e, true);
}
function handleDragStart(e, isTouch) {
    e.preventDefault();
    e.stopPropagation();
    // calculate the current mouse position
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    let { x, y } = getXYCords(e, isTouch);
    selectedShapeIndex = undefined;
    if (y > 8 && y < 15) {
        if (x > 7) {
            selectedShapeIndex = 2;
        } else if (x > 3) {
            selectedShapeIndex = 1;
        } else {
            selectedShapeIndex = 0;
        }
        isDragging = true;
        return;
    }
}

function getXYCords(e, isTouch) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    if (e.changedTouches && e.changedTouches[0]) {
        let touchLocation = e.changedTouches[0];
        mouseX = parseInt(touchLocation.pageX - offsetX);
        mouseY = parseInt(touchLocation.pageY - offsetX);
    }
    x = parseInt(parseInt(mouseX, 10) / (COLS * BLOCK_W/10), 10); // current x and y are divided into cols and rows and this approximates then per mouse or touch location
    y = parseInt(parseInt(mouseY, 10) / (ROWS * BLOCK_W/10/2), 10);
    if (isTouch) {
        y = y - 4;
    }
    return { x, y };
}
