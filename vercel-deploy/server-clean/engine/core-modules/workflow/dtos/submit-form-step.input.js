"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubmitFormStepInput", {
    enumerable: true,
    get: function() {
        return SubmitFormStepInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
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
let SubmitFormStepInput = class SubmitFormStepInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'Workflow step ID',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], SubmitFormStepInput.prototype, "stepId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'Workflow run ID',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], SubmitFormStepInput.prototype, "workflowRunId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Form response in JSON format',
        nullable: false
    }),
    _ts_metadata("design:type", typeof JSON === "undefined" ? Object : JSON)
], SubmitFormStepInput.prototype, "response", void 0);
SubmitFormStepInput = _ts_decorate([
    (0, _graphql.InputType)()
], SubmitFormStepInput);

//# sourceMappingURL=submit-form-step.input.js.map