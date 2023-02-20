sap.ui.define([],
	function() {
		"use strict";
		const theClass = {};

		theClass.render = function(oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.writeClasses();
			oRm.write('>control');
			oRm.write("</div>");
		};

		return theClass;
	});