var x;
var y;
var mouseX;
var mouseY;
var capture = false;

function onMouseMove(event, self) {
    console.info(`move = ${event.offsetX},${event.offsetY}`);
    if (!capture) {
        return;
    }      
    var newX = event.x - mouseX;
    var newY = event.y - mouseY;
    self.setAttribute('x',x + newX);
    self.setAttribute('y',y + newY);
};
function onMouseDown(event, self) {
    //self.setPointerCapture(event.pointerId);
    console.info(`down = ${event.offsetX},${event.offsetY}`) 
    x = parseInt(self.getAttribute("x"));
    y = parseInt(self.getAttribute("y"));
    if (isNaN(x)) {
        x = 0;
    }
    if (isNaN(y)) {
        y = 0;
    }
    console.info(`down = xy:${x},${y}`) 
    mouseX = event.x;
    mouseY = event.y;
    capture = true;
};
function onMouseUp(event, self) {
    console.info(`up = ${event.offsetX},${event.offsetY}`);
    capture = false;      
};

function registEvent (item) {
    item.setAttribute('onmousedown', "onMouseDown(event, this)");
    item.setAttribute('onmouseup', "onMouseUp(event, this)");
    item.setAttribute('onmousemove', "onMouseMove(event, this)");
}

async function add (file) {
    let filename = `images/${file}.svg`;
    let x =  await fetch(filename);
    let xmlString = await x.text();
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(xmlString, "application/xml");
    const oSvg = document.getElementById("svg");
    const child = doc1.firstElementChild
    registEvent(child);
    oSvg.appendChild(child);
}

async function addTask() {
    add("task");
}
async function addStart () {
    add("start");
}

async function addEnd () {
    add("end");
}


window.addTask = addTask;
window.addStart = addStart;
window.addEnd = addEnd;
window.onMouseMove=onMouseMove;
window.onMouseDown=onMouseDown;
window.onMouseUp=onMouseUp;