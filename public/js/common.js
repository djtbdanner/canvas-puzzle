function createAndAppendDiv(html, id, isFullScreen) {
    let div = document.getElementById(id);
    if (div){
        destroyNode(div);
        div = undefined;
    }
    if (!div) {
        div = document.createElement(`div`);
        div.id = id;
    }
    if (isFullScreen) {
        div.style.width = `100%`;
        div.style.height = `100%`;
    }
    div.innerHTML = html;
    document.body.appendChild(div);
}


async function buildGameOver(message) {

    destroyById(`modal-confirm`);
    let html = ``;
    html += `<div id="modal-confirm" class="modal" >`;
    html += `<table cellpadding="0" cellspacing="0" width="100%" border="0">`;
    html += `<tr><td colspan="2" style = "text-align:center;">`;
    html += `<p>${message}</p>`;
    html += `</td></tr>`;
    html += `<tr><td style = "text-align:center;">`;
    html += `<input type="button" value="Play Again" onClick="destroyById('modal-confirm');clearBoard();" />`;
    html += `</td></tr>`;
    html += `</table>`;
    html += `</div>`;
    createAndAppendDiv(html, 'default', true);
}

async function buildMenu() {
    destroyById(`menu`);
    let html = ``;
    html += `<div id="menu" class="menu" onClick="destroyById('menu')">`;
    html += `<a class ="menuItem" onClick="clearBoard();">New Game</a></br>`;
    html += `<hr>`;
    html += `<a class ="menuItem" >Close Menu</a></br>`;
    html += `</div>`;
    // alert(html)
    createAndAppendDiv(html, 'default', false);
}

function destroyById(id) {
    let node = document.getElementById(id);
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroyNode(node) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

function saveLocalData(){
    
    const thisYearAnd = getYearAndWeek();
    const storedYearAndWeek = localStorage.getItem(`weeklyBestScoreYearAndWeek`);

    if (thisYearAnd != storedYearAndWeek)
    {
        console.log(`resetting weekly score`);
        weeklyBestScore = 0;
    }

    localStorage.setItem(`board`, JSON.stringify(board));
    localStorage.setItem(`currentScore`, currentScore);
    localStorage.setItem(`weeklyBestScore`, weeklyBestScore);
    localStorage.setItem(`weeklyBestScoreYearAndWeek`, thisYearAnd);
    localStorage.setItem(`allTimeBestScore`, allTimeBestScore);
    for (i = 0; i < shapesToUse.length;i++){
        if (shapesToUse[i]){
            localStorage.setItem(`shape${i}`, JSON.stringify(shapesToUse[i]));
        } else {
            localStorage.removeItem(`shape${i}`);
        }
    }
}

function populateFromLocalData() {
    const boardRestored = JSON.parse(localStorage.getItem(`board`));
    if (boardRestored){
        board = boardRestored;
    }
    let temp  = localStorage.getItem(`currentScore`);
    if (temp){
        currentScore = parseInt(temp, 10);
    }
    temp  = localStorage.getItem(`weeklyBestScore`);
    if (temp){
        weeklyBestScore = parseInt(temp, 10);
    }
    temp  = localStorage.getItem(`allTimeBestScore`);
    if (temp){
        allTimeBestScore = parseInt(temp, 10);
    }
    for (i = 0; i < shapesToUse.length;i++){
        temp  = localStorage.getItem(`shape${i}`);
        if (temp){
            shapesToUse[i] = JSON.parse(temp);
        }
    }
}

function getYearAndWeek (){
    let currentdate = new Date();
    const oneJan = new Date(currentdate.getFullYear(),0,1);
    const numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    const result = currentdate.getFullYear() + "_" + Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7); 
    return result;
}
