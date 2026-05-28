"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowStepPositionUpdateInput", {
    enumerable: true,
    get: function() {
        return WorkflowStepPositionUpdateInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _updateworkflowsteppositioninput = require("./update-workflow-step-position.input");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowStepPositionUpdateInput = class WorkflowStepPositionUpdateInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'Step or trigger ID',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], WorkflowStepPositionUpdateInput.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_updateworkflowsteppositioninput.WorkflowStepPositionInput, {
        description: 'Position of the step or trigger',
        nullable: false
    }),
    _ts_metadata("design:type", typeof _updateworkflowsteppositioninput.WorkflowStepPositionInput === "undefined" ? Object : _updateworkflowsteppositioninput.WorkflowStepPositionInput)
], WorkflowStepPositionUpdateInput.prototype, "position", void 0);
WorkflowStepPositionUpdateInput = _ts_decorate([
    (0, _graphql.InputType)()
], WorkflowStepPositionUpdateInput);

//# sourceMappingURL=update-workflow-step-position-update.input.js.map