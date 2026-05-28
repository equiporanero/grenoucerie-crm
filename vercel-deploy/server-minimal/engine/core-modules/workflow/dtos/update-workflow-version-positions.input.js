"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateWorkflowVersionPositionsInput", {
    enumerable: true,
    get: function() {
        return UpdateWorkflowVersionPositionsInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _updateworkflowsteppositionupdateinput = require("./update-workflow-step-position-update.input");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateWorkflowVersionPositionsInput = class UpdateWorkflowVersionPositionsInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'Workflow version ID',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], UpdateWorkflowVersionPositionsInput.prototype, "workflowVersionId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _updateworkflowsteppositionupdateinput.WorkflowStepPositionUpdateInput
        ], {
        description: 'Workflow version updated positions',
        nullable: false
    }),
    _ts_metadata("design:type", Array)
], UpdateWorkflowVersionPositionsInput.prototype, "positions", void 0);
UpdateWorkflowVersionPositionsInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateWorkflowVersionPositionsInput);

//# sourceMappingURL=update-workflow-version-positions.input.js.map