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
    get SEARCH_FIELDS_FOR_WORKFLOWS () {
        return SEARCH_FIELDS_FOR_WORKFLOWS;
    },
    get WorkflowStatus () {
        return WorkflowStatus;
    },
    get WorkflowWorkspaceEntity () {
        return WorkflowWorkspaceEntity;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
var WorkflowStatus = /*#__PURE__*/ function(WorkflowStatus) {
    WorkflowStatus["DRAFT"] = "DRAFT";
    WorkflowStatus["ACTIVE"] = "ACTIVE";
    WorkflowStatus["DEACTIVATED"] = "DEACTIVATED";
    return WorkflowStatus;
}({});
const NAME_FIELD_NAME = 'name';
const SEARCH_FIELDS_FOR_WORKFLOWS = [
    {
        name: NAME_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let WorkflowWorkspaceEntity = class WorkflowWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=workflow.workspace-entity.js.map