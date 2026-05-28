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
    get SEARCH_FIELDS_FOR_WORKFLOW_VERSIONS () {
        return SEARCH_FIELDS_FOR_WORKFLOW_VERSIONS;
    },
    get WorkflowVersionStatus () {
        return WorkflowVersionStatus;
    },
    get WorkflowVersionWorkspaceEntity () {
        return WorkflowVersionWorkspaceEntity;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
var WorkflowVersionStatus = /*#__PURE__*/ function(WorkflowVersionStatus) {
    WorkflowVersionStatus["DRAFT"] = "DRAFT";
    WorkflowVersionStatus["ACTIVE"] = "ACTIVE";
    WorkflowVersionStatus["DEACTIVATED"] = "DEACTIVATED";
    WorkflowVersionStatus["ARCHIVED"] = "ARCHIVED";
    return WorkflowVersionStatus;
}({});
const NAME_FIELD_NAME = 'name';
const SEARCH_FIELDS_FOR_WORKFLOW_VERSIONS = [
    {
        name: NAME_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let WorkflowVersionWorkspaceEntity = class WorkflowVersionWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=workflow-version.workspace-entity.js.map