"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionDTO", {
    enumerable: true,
    get: function() {
        return WorkflowVersionDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workflowversionworkspaceentity = require("../../../../modules/workflow/common/standard-objects/workflow-version.workspace-entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowVersionDTO = class WorkflowVersionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], WorkflowVersionDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], WorkflowVersionDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], WorkflowVersionDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], WorkflowVersionDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], WorkflowVersionDTO.prototype, "workflowId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", typeof _workflowversionworkspaceentity.WorkflowVersionStatus === "undefined" ? Object : _workflowversionworkspaceentity.WorkflowVersionStatus)
], WorkflowVersionDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkflowVersionDTO.prototype, "trigger", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkflowVersionDTO.prototype, "steps", void 0);
WorkflowVersionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('WorkflowVersionDTO')
], WorkflowVersionDTO);

//# sourceMappingURL=workflow-version.dto.js.map