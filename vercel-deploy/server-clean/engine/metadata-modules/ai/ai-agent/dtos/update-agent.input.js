"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateAgentInput", {
    enumerable: true,
    get: function() {
        return UpdateAgentInput;
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
let UpdateAgentInput = class UpdateAgentInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UpdateAgentInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateAgentInput.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateAgentInput.prototype, "label", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateAgentInput.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateAgentInput.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateAgentInput.prototype, "prompt", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof ModelId === "undefined" ? Object : ModelId)
], UpdateAgentInput.prototype, "modelId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateAgentInput.prototype, "roleId", void 0);
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
], UpdateAgentInput.prototype, "responseFormat", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _modelConfiguration.ModelConfiguration === "undefined" ? Object : _modelConfiguration.ModelConfiguration)
], UpdateAgentInput.prototype, "modelConfiguration", void 0);
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
], UpdateAgentInput.prototype, "evaluationInputs", void 0);
UpdateAgentInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateAgentInput);

//# sourceMappingURL=update-agent.input.js.map