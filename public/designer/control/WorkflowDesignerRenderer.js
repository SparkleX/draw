sap.ui.define([],
	function() {
		"use strict";
		const theClass = {};

		theClass.render = function(oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.writeClasses();
			oRm.write('>');
			oRm.write('<svg id="svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="1000"></svg>');
			oRm.write("</div>");
		};

		return theClass;
	});