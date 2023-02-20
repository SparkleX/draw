sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
],
function(BaseClass, JSONModel) {
	"use strict";

	const theClass = BaseClass.extend("b1.designer.controller.Detail", {});

	theClass.prototype.onInit = function() {
		this.oWfDesginer = this.oView.byId("idWorkflow");
		this.oData = {type:"Empty"};
		this.oJsonModel = new JSONModel(this.oData);
		this.oView.setModel(this.oJsonModel);
	};

	theClass.prototype.onPressAddSelect = function() {
		alert('select');
	}
	theClass.prototype.onPressAddStart = function() {
		this.oWfDesginer.addStart();
	}
	theClass.prototype.onPressAddTask = function() {
		this.oWfDesginer.addTask();

	}
	theClass.prototype.onPressAddEnd = function() {
		this.oWfDesginer.addEnd();

	}
	theClass.prototype.onPressAddGateway = function() {
		this.oWfDesginer.addGateway();

	}
	theClass.prototype.onWfSelectItem = function(oEvent) {
		this.oData.type = oEvent.mParameters.type;
		this.oJsonModel.refresh();
	}
	theClass.prototype.onScale = function(oEvent) {
		this.oWfDesginer.setScale(oEvent.mParameters.value);
	}
	
	return theClass;
});
