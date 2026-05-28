"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowRunDTO", {
    enumerable: true,
    get: function() {
        return WorkflowRunDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workflowrunworkspaceentity = require("../../../../modules/workflow/common/standard-objects/workflow-run.workspace-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowRunDTO = class WorkflowRunDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], WorkflowRunDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workflowrunworkspaceentity.WorkflowRunStatus),
    _ts_metadata("design:type", typeof _workflowrunworkspaceentity.WorkflowRunStatus === "undefined" ? Object : _workflowrunworkspaceentity.WorkflowRunStatus)
], WorkflowRunDTO.prototype, "status", void 0);
WorkflowRunDTO = _ts_decorate([
    (0, _graphql.ObjectType)('WorkflowRun')
], WorkflowRunDTO);

//# sourceMappingURL=workflow-run.dto.js.map