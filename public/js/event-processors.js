
// drag related vars
let isDragging = false;
let startX, startY;

function handleMouseMove(e){
    handleMove(e, false);
}
function handleTouchMove(e){
    handleMove(e, true);
}
function handleMove(e, isTouch) {
    // return if we're not dragging
    if (!isDragging) { return; }
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // calculate the current mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    if (e.targetTouches && e.targetTouches[0]) {
        let touchLocation = e.targetTouches[0];
        mouseX = parseInt(touchLocation.pageX - offsetX);
        mouseY = parseInt(touchLocation.pageY - offsetX);
    }
    currentX = parseInt(parseInt(mouseX, 10) / (COLS * 3), 10); // current x and y are divided into cols and rows and this approximates then per mouse or touch location
    currentY = parseInt(parseInt(mouseY, 10) / (ROWS * 1.5), 10);
    if (isTouch) {
        currentY = currentY - 3;
    }
    xyPositions[selectedShapeIndex][0] = currentX;
    xyPositions[selectedShapeIndex][1] = currentY;
    // clear the canvas and redraw all shapes
    drawAll();
}

function handleMouseOut(e) {
    // return if we're not dragging
    if (!isDragging) { return; }
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();

    // the drag is over -- clear the isDragging flag
    isDragging = false;
}

function handleMouseUp(e){
    handleDragEnd(e, false);
}
function handleTouchEnd(e){
    handleDragEnd(e, true);
}
function handleDragEnd(e, isTouch) {
    // return if we're not dragging
    if (!isDragging) { return; }
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // the drag is over -- clear the isDragging flag
    isDragging = false;

    let { x, y } = getXYCords(e);
    if (isTouch){
        y=y-3;
    }
    if (willFit(x, y, selectedShapeIndex)) {
        setColors(x, y, selectedShapeIndex);
        newShape(selectedShapeIndex, shapes[Math.floor(Math.random() * shapes.length)]);
    }
    xyPositions[0][0] = 0;
    xyPositions[0][1] = 12;
    xyPositions[1][0] = 4;
    xyPositions[1][1] = 12;
    xyPositions[2][0] = 8;
    xyPositions[2][1] = 12;

    checkAndClear();
    drawAll();
}
function handleMouseDown(e){
    handleDragStart(e, false);
}
function handleTouchStart(e){
    handleDragStart(e, true);
}
function handleDragStart(e, isTouch) {
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // calculate the current mouse position
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    let { x, y } = getXYCords(e);
    if(isTouch){
        y = y - 3;
    }
    selectedShapeIndex = undefined;
    if (y > 8 && y < 15) {
        if (x > 7) {
            selectedShapeIndex = 2;
        } else if (x > 4) {
            selectedShapeIndex = 1;
        } else {
            selectedShapeIndex = 0;
        }
        // console.log(`selected shape ` + selectedShapeIndex);
        // set the isDragging flag
        isDragging = true;
        return;
    }
}

function getXYCords(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    if (e.changedTouches && e.changedTouches[0]) {
        let touchLocation = e.changedTouches[0];
        mouseX = parseInt(touchLocation.pageX - offsetX);
        mouseY = parseInt(touchLocation.pageY - offsetX);
    }
    x = parseInt(parseInt(mouseX, 10) / (COLS * 3), 10); // current x and y are divided into cols and rows and this approximates then per mouse or touch location
    y = parseInt(parseInt(mouseY, 10) / (ROWS * 1.5), 10);
    // console.log(`x:${x}-y:${y}`)
    // console.log(`x:${x}-y:${y}`)
    return { x, y };
}
