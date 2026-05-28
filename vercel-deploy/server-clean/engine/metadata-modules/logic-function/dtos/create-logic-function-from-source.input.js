"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateLogicFunctionFromSourceInput", {
    enumerable: true,
    get: function() {
        return CreateLogicFunctionFromSourceInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
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
let CreateLogicFunctionFromSourceInput = class CreateLogicFunctionFromSourceInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateLogicFunctionFromSourceInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateLogicFunctionFromSourceInput.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], CreateLogicFunctionFromSourceInput.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateLogicFunctionFromSourceInput.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.Max)(900),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateLogicFunctionFromSourceInput.prototype, "timeoutSeconds", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], CreateLogicFunctionFromSourceInput.prototype, "source", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], CreateLogicFunctionFromSourceInput.prototype, "cronTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], CreateLogicFunctionFromSourceInput.prototype, "databaseEventTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], CreateLogicFunctionFromSourceInput.prototype, "httpRouteTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], CreateLogicFunctionFromSourceInput.prototype, "toolTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], CreateLogicFunctionFromSourceInput.prototype, "workflowActionTriggerSettings", void 0);
CreateLogicFunctionFromSourceInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateLogicFunctionFromSourceInput);

//# sourceMappingURL=create-logic-function-from-source.input.js.map