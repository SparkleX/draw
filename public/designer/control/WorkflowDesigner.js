sap.ui.define([
    "sap/ui/core/Control"
], function (BaseClass) {
    "use strict";
    const theClass = BaseClass.extend("b1.designer.control.WorkflowDesigner", {
        metadata: {
            properties: {
                value: { type: "string", group: "Data", defaultValue: null, bindable: "bindable" },
                editable: { type: "boolean", group: "Behavior", defaultValue: true }
            },
            events: {
                change: {
                    parameters: {
                        value: { type: "string" },
                        oldValue: { type: "string" }
                    }
                }
            }
        }
    });

    theClass.prototype.init = function () {
        BaseClass.prototype.init.call(this);
    };
    theClass.prototype.addStart = function () {
        this.add("start");
    };
    theClass.prototype.addEnd = function () {
        this.add("end");
    };
    theClass.prototype.addTask = function () {
        this.add("task");
    };
    theClass.prototype.addGateway = function () {
    };



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
        self.setAttribute('x', x + newX);
        self.setAttribute('y', y + newY);
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

    function registEvent(item) {
        item.setAttribute('onmousedown', "onMouseDown(event, this)");
        item.setAttribute('onmouseup', "onMouseUp(event, this)");
        item.setAttribute('onmousemove', "onMouseMove(event, this)");
    }

    theClass.prototype.add = async function(file) {
        let filename = `designer/control/images/${file}.svg`;
        let x = await fetch(filename);
        let xmlString = await x.text();
        const parser = new DOMParser();
        const doc1 = parser.parseFromString(xmlString, "application/xml");
        const oSvg = document.getElementById("svg");
        const child = doc1.firstElementChild
        registEvent(child);
        oSvg.appendChild(child);
    }


    window.onMouseMove=onMouseMove;
    window.onMouseDown=onMouseDown;
    window.onMouseUp=onMouseUp;
    return theClass;
});
