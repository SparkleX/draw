sap.ui.define([
	"b1/designer/control/WorkflowDesigner"
],
	function(WorkflowDesigner) {
		"use strict";
		const theClass = {};

		theClass.render = function(oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.writeClasses();
			oRm.write('>');

			const scale = oControl.getScale();
			let size = 1000;
			switch(scale) {
				case 2: size = 250;break;
				case 1: size = 500;break;
				case 0: size = 1000;break;
				case -1: size = 2000;break;
				case -2: size = 4000;break;
			}
			oRm.write(`<svg id="svg" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">`);
			const items = oControl.getItems();
			for (let item of items) {
				let xml = WorkflowDesigner.oSvgTemplate[item.type];
				xml = xml.replace("{attr}", `id="${item.id}" x="${item.x}" y="${item.y}"`);
				if(!item.name) {
					item.name = "";
				}
				xml = xml.replace("{name}", `${item.name}`);

				oRm.write(xml);
			}
			oRm.write(`</svg>`);
			oRm.write("</div>");
		};

		return theClass;
	});