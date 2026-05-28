"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateCommandMenuItemInput", {
    enumerable: true,
    get: function() {
        return CreateCommandMenuItemInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _commandmenuitemavailabilitytypeenum = require("../enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../enums/engine-component-key.enum");
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
let CreateCommandMenuItemInput = class CreateCommandMenuItemInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateCommandMenuItemInput.prototype, "workflowVersionId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateCommandMenuItemInput.prototype, "frontComponentId", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_enginecomponentkeyenum.EngineComponentKey),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_enginecomponentkeyenum.EngineComponentKey),
    _ts_metadata("design:type", typeof _enginecomponentkeyenum.EngineComponentKey === "undefined" ? Object : _enginecomponentkeyenum.EngineComponentKey)
], CreateCommandMenuItemInput.prototype, "engineComponentKey", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], CreateCommandMenuItemInput.prototype, "label", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateCommandMenuItemInput.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateCommandMenuItemInput.prototype, "shortLabel", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], CreateCommandMenuItemInput.prototype, "position", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], CreateCommandMenuItemInput.prototype, "isPinned", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType === "undefined" ? Object : _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType)
], CreateCommandMenuItemInput.prototype, "availabilityType", void 0);
_ts_decorate([
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
], CreateCommandMenuItemInput.prototype, "hotKeys", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateCommandMenuItemInput.prototype, "conditionalAvailabilityExpression", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateCommandMenuItemInput.prototype, "availabilityObjectMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof CommandMenuItemPayload === "undefined" ? Object : CommandMenuItemPayload)
], CreateCommandMenuItemInput.prototype, "payload", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateCommandMenuItemInput.prototype, "pageLayoutId", void 0);
CreateCommandMenuItemInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateCommandMenuItemInput);

//# sourceMappingURL=create-command-menu-item.input.js.map