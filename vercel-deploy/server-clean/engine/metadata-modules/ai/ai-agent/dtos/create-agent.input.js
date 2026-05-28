"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateAgentInput", {
    enumerable: true,
    get: function() {
        return CreateAgentInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _agentresponseformattype = require("../types/agent-response-format.type");
const _modelConfiguration = require("../types/modelConfiguration");
const _agentresponseformatjsonvalidator = require("../validators/agent-response-format-json.validator");
const _agentresponseformattextvalidator = require("../validators/agent-response-format-text.validator");
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
let CreateAgentInput = class CreateAgentInput {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateAgentInput.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], CreateAgentInput.prototype, "label", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateAgentInput.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateAgentInput.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], CreateAgentInput.prototype, "prompt", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", typeof ModelId === "undefined" ? Object : ModelId)
], CreateAgentInput.prototype, "modelId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateAgentInput.prototype, "roleId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>Object, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'type',
            subTypes: [
                {
                    value: _agentresponseformattextvalidator.AgentResponseFormatText,
                    name: 'text'
                },
                {
                    value: _agentresponseformatjsonvalidator.AgentResponseFormatJson,
                    name: 'json'
                }
            ]
        }
    }),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _agentresponseformattype.AgentResponseFormat === "undefined" ? Object : _agentresponseformattype.AgentResponseFormat)
], CreateAgentInput.prototype, "responseFormat", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _modelConfiguration.ModelConfiguration === "undefined" ? Object : _modelConfiguration.ModelConfiguration)
], CreateAgentInput.prototype, "modelConfiguration", void 0);
_ts_decorate([
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], CreateAgentInput.prototype, "evaluationInputs", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], CreateAgentInput.prototype, "applicationId", void 0);
CreateAgentInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateAgentInput);

//# sourceMappingURL=create-agent.input.js.map