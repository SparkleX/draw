sap.ui.define([
	"sap/ui/core/UIComponent"
],function(BaseClass) {
	"use strict";

	const theClass = BaseClass.extend("b1.designer.Component", {
		metadata: {
			manifest: "json"
		}
	});

	theClass.prototype.init = function() {
		BaseClass.prototype.init.apply(this, arguments);
		this.getRouter().initialize();

	};

	return theClass;
}, true);
