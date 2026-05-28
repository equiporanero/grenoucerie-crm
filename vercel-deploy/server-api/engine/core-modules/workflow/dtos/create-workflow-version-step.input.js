"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateWorkflowVersionStepInput", {
    enumerable: true,
    get: function() {
        return CreateWorkflowVersionStepInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _updateworkflowsteppositioninput = require("./update-workflow-step-position.input");
const _WorkflowStepCreationOptions = require("../../../../modules/workflow/workflow-builder/workflow-version-step/types/WorkflowStepCreationOptions");
const _workflowactionsettingstype = require("../../../../modules/workflow/workflow-executor/workflow-actions/types/workflow-action-settings.type");
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
let CreateWorkflowVersionStepInput = class CreateWorkflowVersionStepInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'Workflow version ID',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], CreateWorkflowVersionStepInput.prototype, "workflowVersionId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'New step type',
        nullable: false
    }),
    _ts_metadata("design:type", typeof _workflowactiontype.WorkflowActionType === "undefined" ? Object : _workflowactiontype.WorkflowActionType)
], CreateWorkflowVersionStepInput.prototype, "stepType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'Parent step ID',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateWorkflowVersionStepInput.prototype, "parentStepId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Parent step connection options',
        nullable: true
    }),
    _ts_metadata("design:type", typeof _WorkflowStepCreationOptions.WorkflowStepConnectionOptions === "undefined" ? Object : _WorkflowStepCreationOptions.WorkflowStepConnectionOptions)
], CreateWorkflowVersionStepInput.prototype, "parentStepConnectionOptions", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'Next step ID',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateWorkflowVersionStepInput.prototype, "nextStepId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_updateworkflowsteppositioninput.WorkflowStepPositionInput, {
        description: 'Step position',
        nullable: true
    }),
    _ts_metadata("design:type", typeof _updateworkflowsteppositioninput.WorkflowStepPositionInput === "undefined" ? Object : _updateworkflowsteppositioninput.WorkflowStepPositionInput)
], CreateWorkflowVersionStepInput.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'Step ID',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateWorkflowVersionStepInput.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Default settings for the step',
        nullable: true
    }),
    _ts_metadata("design:type", typeof _workflowactionsettingstype.WorkflowActionSettings === "undefined" ? Object : _workflowactionsettingstype.WorkflowActionSettings)
], CreateWorkflowVersionStepInput.prototype, "defaultSettings", void 0);
CreateWorkflowVersionStepInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateWorkflowVersionStepInput);

//# sourceMappingURL=create-workflow-version-step.input.js.map