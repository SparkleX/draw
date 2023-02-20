sap.ui.define([
    "sap/ui/core/Control",
    "sap/base/util/uid"
], function (BaseClass, uid) {
    "use strict";
    const theClass = BaseClass.extend("b1.designer.control.WorkflowDesigner", {
        metadata: {
            properties: {
                value: { type: "string", group: "Data", defaultValue: null, bindable: "bindable" },
                editable: { type: "boolean", group: "Behavior", defaultValue: true },
                scale: { type: "int", group: "Behavior", defaultValue: 0 }
            },
            events: {
                selectItem: {
                    parameters: {
                        value: { type: "string" },
                        oldValue: { type: "string" }
                    }
                }
            }
        }
    });

    theClass._init = async function () {
        theClass.oSvgTemplate = {};
        const types = ["start","task","end"];
        for (let type of types) {
            let filename = `designer/control/images/${type}.svg`;
            let x = await fetch(filename);
            let xmlString = await x.text();

            const str1=`xmlns="http://www.w3.org/2000/svg"`;

            const str2=`xmlns="http://www.w3.org/2000/svg" {attr} onmousedown="onMouseDown(event, this)" onmouseup="onMouseUp(event, this)" onmousemove="onMouseMove(event, this)"`;

            xmlString = xmlString.replace(str1, str2);

            theClass.oSvgTemplate[type] = xmlString;
        }
    };


    theClass.prototype.init = async function () {
        BaseClass.prototype.init.call(this);

    };
    theClass.prototype.setItems = function (val) {
        this.oItems = val;
    };
    theClass.prototype.getItems = function () {
        return this.oItems;
    };
    theClass.prototype.setScale = function (val) {
        this.setProperty("scale", val);
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

    theClass.prototype._onMouseDown = function (event, self) {
        this.fireSelectItem(self._data);
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

    var x;
    var y;
    var mouseX;
    var mouseY;
    var capture = false;

    theClass.prototype.getScaleRate= function () {
        const scale = this.getScale();
        switch(scale) {
            case -2: return 4;
            case -1: return 2;
            case 0: return 1;
            case 1: return 0.5;
            case 2: return 0.25;
        }
    };

    theClass.prototype._onMouseUp= function (event, self) {
        console.info(`up = ${event.offsetX},${event.offsetY}`);
        capture = false;
    };

    theClass.prototype._onMouseMove= function (event, self) {
        console.info(`move = ${event.offsetX},${event.offsetY}`);
        if (!capture) {
            return;
        }
        var newX = event.x - mouseX;
        var newY = event.y - mouseY;
        var rate = this.getScaleRate();
        //self.setAttribute('x', x + rate * newX);
        //self.setAttribute('y', y + rate * newY);
        const id = self.id;
        for (let item of this.oItems) {
            if (item.id!=id) {
                continue;
            }
            item.x = x + rate * newX;
            item.y = y + rate * newY;
            break;
        }
        this.invalidate();
    };
    theClass.prototype.add = async function(type) {
        const item = {
            id: uid(),
            type: type,
            x: 100,
            y: 100
        }
        this.oItems.push(item);
        this.invalidate();
       /* let filename = `designer/control/images/${type}.svg`;
        let x = await fetch(filename);
        let xmlString = await x.text();
        const parser = new DOMParser();
        const doc1 = parser.parseFromString(xmlString, "application/xml");
        const oSvg = document.getElementById("svg");
        const child = doc1.firstElementChild;
        child._ui5 = this;
        child._data = {type: type}
        registEvent(child);
        const child2 = oSvg.appendChild(child);*/
        //console.debug(child2.id);
    }

/*

    function registEvent(item) {
        item.setAttribute('onmousedown', "onMouseDown(event, this)");
        item.setAttribute('onmouseup', "onMouseUp(event, this)");
        item.setAttribute('onmousemove', "onMouseMove(event, this)");
    }


*/

    function getUI5Control(self) {
        const oControl = sap.ui.getCore().byId(self.parentNode.parentNode.id);
        return oControl;
    }
    function onMouseUp(event, self) {
        const oControl = getUI5Control(self);
        oControl._onMouseUp(event, self)
    };

    function onMouseDown(event, self) {
        const oControl = getUI5Control(self);
        oControl._onMouseDown(event, self)
    };
    function onMouseMove(event, self) {
        const oControl = getUI5Control(self);
        oControl._onMouseMove(event, self)
    };
    window.onMouseMove=onMouseMove;
    window.onMouseDown=onMouseDown;
    window.onMouseUp=onMouseUp;
    return theClass;
});
