sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/core/IconPool"
],function(BaseClass, IconPool) {
	"use strict";

	const theClass = BaseClass.extend("b1.designer.Component", {
		metadata: {
			manifest: "json"
		}
	});

	theClass.prototype.init = function() {
		BaseClass.prototype.init.apply(this, arguments);
		this.getRouter().initialize();
		var t = {
			fontFamily: "SAP-icons-TNT",
			fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts/")
		};
		IconPool.registerFont(t);

	};

	return theClass;
}, true);
