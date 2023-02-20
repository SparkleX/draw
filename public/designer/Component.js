sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/core/IconPool",
	"b1/designer/control/WorkflowDesigner"
],function(BaseClass, IconPool,WorkflowDesigner) {
	"use strict";

	const theClass = BaseClass.extend("b1.designer.Component", {
		metadata: {
			manifest: "json"
		}
	});

	theClass.prototype.init = async function() {
		BaseClass.prototype.init.apply(this, arguments);
		var t = {
			fontFamily: "SAP-icons-TNT",
			fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts/")
		};
		IconPool.registerFont(t);

		WorkflowDesigner.oSvgTemplate = {};
        const types = ["start","task","end"];
        for (let type of types) {
            let filename = `designer/control/images/${type}.svg`;
            let x = await fetch(filename);
            let xmlString = await x.text();
            WorkflowDesigner.oSvgTemplate[type] = xmlString;
        }
		this.getRouter().initialize();

	};

	return theClass;
}, true);
