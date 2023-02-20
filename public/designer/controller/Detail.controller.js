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

		const data = [
			{
				id: "idStart",
				type:"start",
				x: 100,
				y: 100,
			}/*,
			{
				type: "task",
				x: 200,
				y: 100
			},{
				type: "end",
				x: 200,
				y: 100
			}*/
        ];
        this.oWfDesginer.setItems(data);
        console.debug("123");
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
		const item = this.oWfDesginer.findItemById(oEvent.mParameters.id);
		for(let key in item) {
			this.oData[key] = item[key];
		}
		this.oJsonModel.refresh();
	}
	theClass.prototype.onScale = function(oEvent) {
		this.oWfDesginer.setScale(oEvent.mParameters.value);
	}
	theClass.prototype.onPressSaveProps = function(oEvent) {
		const item = this.oWfDesginer.findItemById(this.oData.id);
		for(let key in this.oData) {
			switch(key) {
				case "x":
				case "y":
					continue;
			}
			item[key] = this.oData[key];
		}
		this.oWfDesginer.invalidate();
		//alert(this.oData.name);
	}
	
	return theClass;
});
