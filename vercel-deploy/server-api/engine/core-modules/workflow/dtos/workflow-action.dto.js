"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowActionDTO", {
    enumerable: true,
    get: function() {
        return WorkflowActionDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workflowsteppositiondto = require("./workflow-step-position.dto");
const _workflowactiontype = require("../../../../modules/workflow/workflow-executor/workflow-actions/types/workflow-action.type");
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
(0, _graphql.registerEnumType)(_workflowactiontype.WorkflowActionType, {
    name: 'WorkflowActionType'
});
let WorkflowActionDTO = class WorkflowActionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], WorkflowActionDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], WorkflowActionDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workflowactiontype.WorkflowActionType),
    _ts_metadata("design:type", typeof _workflowactiontype.WorkflowActionType === "undefined" ? Object : _workflowactiontype.WorkflowActionType)
], WorkflowActionDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default),
    _ts_metadata("design:type", Object)
], WorkflowActionDTO.prototype, "settings", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], WorkflowActionDTO.prototype, "valid", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _scalars.UUIDScalarType
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], WorkflowActionDTO.prototype, "nextStepIds", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workflowsteppositiondto.WorkflowStepPosition, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _workflowsteppositiondto.WorkflowStepPosition === "undefined" ? Object : _workflowsteppositiondto.WorkflowStepPosition)
], WorkflowActionDTO.prototype, "position", void 0);
WorkflowActionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('WorkflowAction')
], WorkflowActionDTO);

//# sourceMappingURL=workflow-action.dto.js.map