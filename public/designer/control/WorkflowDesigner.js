sap.ui.define([
    "sap/ui/core/Control"
], function (BaseClass) {
    "use strict";
    const theClass = BaseClass.extend("b1.designer.control.WorkflowDesigner", {
        metadata: {
            properties: {
                value: { type: "string", group: "Data", defaultValue: null, bindable: "bindable" },
                editable: { type: "boolean", group: "Behavior", defaultValue: true }
            },
            events: {
                change: {
                    parameters: {
                        value: { type: "string" },
                        oldValue: { type: "string" }
                    }
                }
            }
        }
    });

    theClass.prototype.init = function () {
        BaseClass.prototype.init.call(this);
    };

    return theClass;
});
