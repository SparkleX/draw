sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
function(BaseClass) {
	"use strict";

	const theClass = BaseClass.extend("b1.designer.controller.Detail", {});

	theClass.prototype.onInit = function() {
		this.oWfDesginer = this.oView.byId("idWorkflow");
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
	return theClass;
});
