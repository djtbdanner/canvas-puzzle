function handleMouseMove(e) {
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
    xyPositions[selectedShapeIndex][0] = currentX;
    xyPositions[selectedShapeIndex][1] = currentY;
    // clear the canvas and redraw all shapes
    drawAll();
    // update the starting drag position (== the current mouse position)
    // startX = mouseX;
    // startY = mouseY;
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


function handleMouseUp(e) {
    // return if we're not dragging
    if (!isDragging) { return; }
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // the drag is over -- clear the isDragging flag
    isDragging = false;

    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    if (e.changedTouches && e.changedTouches[0]) {
        console.log('founchh')
        let touchLocation = e.changedTouches[0];
        mouseX = parseInt(touchLocation.pageX - offsetX);
        mouseY = parseInt(touchLocation.pageY - offsetX);
    }

    console.log(mouseY, mouseX)
    currentX = parseInt(parseInt(mouseX, 10) / (COLS * 3), 10); // current x and y are divided into cols and rows and this approximates then per mouse or touch location
    currentY = parseInt(parseInt(mouseY, 10) / (ROWS * 1.5), 10);
    console.log(currentX +" "+ currentY)
    if (willFit(currentX, currentY, selectedShapeIndex)) {
        setColors(currentX, currentY, selectedShapeIndex);
    }
    xyPositions[0][0] = 0;
    xyPositions[0][1] = 12;
    xyPositions[1][0] = 5;
    xyPositions[1][1] = 12;
    xyPositions[2][0] = 10;
    xyPositions[2][1] = 12;
    newShape(selectedShapeIndex, shapes[Math.floor(Math.random() * shapes.length)]);
    checkAndClear();
    drawAll();
}

function handleMouseDown(e) {
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // calculate the current mouse position
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    if (e.changedTouches && e.changedTouches[0]) {
        var touchLocation = event.changedTouches[0];
        startX = touchLocation.pageX;
        startY = touchLocation.pageY;
    }
    currentX = parseInt(parseInt(startX, 10) / (COLS * 3), 10); // current x and y are divided into cols and rows and this approximates then per mouse or touch location
    currentY = parseInt(parseInt(startY, 10) / (ROWS * 1.5), 10);
    console.log(currentX + " " + currentY)
    // test mouse position against all shapes
    // post result if mouse is in a shape
    selectedShapeIndex = undefined;
    if (currentY > 10 && currentY < 15 ) {
        if (currentX > 9){
            selectedShapeIndex = 2;
        } else if (currentX > 4){
            selectedShapeIndex = 1;
        } else {
            selectedShapeIndex = 0;
        }
        console.log(`selected shape ` + selectedShapeIndex);
         // set the isDragging flag
        isDragging = true;
        return;
    }
}
