"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateWorkflowVersionEdgeInput", {
    enumerable: true,
    get: function() {
        return CreateWorkflowVersionEdgeInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _WorkflowStepCreationOptions = require("../../../../modules/workflow/workflow-builder/workflow-version-step/types/WorkflowStepCreationOptions");
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
let CreateWorkflowVersionEdgeInput = class CreateWorkflowVersionEdgeInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'Workflow version ID',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], CreateWorkflowVersionEdgeInput.prototype, "workflowVersionId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'Workflow version source step ID',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], CreateWorkflowVersionEdgeInput.prototype, "source", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'Workflow version target step ID',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], CreateWorkflowVersionEdgeInput.prototype, "target", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Workflow version source step connection options',
        nullable: true
    }),
    _ts_metadata("design:type", typeof _WorkflowStepCreationOptions.WorkflowStepConnectionOptions === "undefined" ? Object : _WorkflowStepCreationOptions.WorkflowStepConnectionOptions)
], CreateWorkflowVersionEdgeInput.prototype, "sourceConnectionOptions", void 0);
CreateWorkflowVersionEdgeInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateWorkflowVersionEdgeInput);

//# sourceMappingURL=create-workflow-version-edge.input.js.map