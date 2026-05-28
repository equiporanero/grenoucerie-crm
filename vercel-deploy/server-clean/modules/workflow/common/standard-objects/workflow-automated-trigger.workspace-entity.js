"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get AutomatedTriggerType () {
        return AutomatedTriggerType;
    },
    get WorkflowAutomatedTriggerWorkspaceEntity () {
        return WorkflowAutomatedTriggerWorkspaceEntity;
    }
});
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
var AutomatedTriggerType = /*#__PURE__*/ function(AutomatedTriggerType) {
    AutomatedTriggerType["DATABASE_EVENT"] = "DATABASE_EVENT";
    AutomatedTriggerType["CRON"] = "CRON";
    return AutomatedTriggerType;
}({});
let WorkflowAutomatedTriggerWorkspaceEntity = class WorkflowAutomatedTriggerWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=workflow-automated-trigger.workspace-entity.js.map