"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateLogicFunctionFromSourceInput", {
    enumerable: true,
    get: function() {
        return UpdateLogicFunctionFromSourceInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _handlercontant = require("../constants/handler.contant");
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
let UpdateLogicFunctionFromSourceInputUpdates = class UpdateLogicFunctionFromSourceInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.Max)(900),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "timeoutSeconds", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "sourceHandlerCode", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.Matches)(_handlercontant.HANDLER_NAME_REGEX, {
        message: 'handlerName must be a valid JavaScript identifier or dotted path'
    }),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "handlerName", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "sourceHandlerPath", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "cronTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "databaseEventTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "httpRouteTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "toolTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], UpdateLogicFunctionFromSourceInputUpdates.prototype, "workflowActionTriggerSettings", void 0);
UpdateLogicFunctionFromSourceInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateLogicFunctionFromSourceInputUpdates);
let UpdateLogicFunctionFromSourceInput = class UpdateLogicFunctionFromSourceInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'Id of the logic function to update'
    }),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], UpdateLogicFunctionFromSourceInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateLogicFunctionFromSourceInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateLogicFunctionFromSourceInputUpdates, {
        description: 'The logic function updates'
    }),
    _ts_metadata("design:type", typeof UpdateLogicFunctionFromSourceInputUpdates === "undefined" ? Object : UpdateLogicFunctionFromSourceInputUpdates)
], UpdateLogicFunctionFromSourceInput.prototype, "update", void 0);
UpdateLogicFunctionFromSourceInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateLogicFunctionFromSourceInput);

//# sourceMappingURL=update-logic-function-from-source.input.js.map