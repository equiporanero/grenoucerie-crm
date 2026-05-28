"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateCommandMenuItemInput", {
    enumerable: true,
    get: function() {
        return UpdateCommandMenuItemInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _commandmenuitemavailabilitytypeenum = require("../enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../enums/engine-component-key.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateCommandMenuItemInput = class UpdateCommandMenuItemInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UpdateCommandMenuItemInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateCommandMenuItemInput.prototype, "label", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateCommandMenuItemInput.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateCommandMenuItemInput.prototype, "shortLabel", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], UpdateCommandMenuItemInput.prototype, "position", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateCommandMenuItemInput.prototype, "isPinned", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType === "undefined" ? Object : _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType)
], UpdateCommandMenuItemInput.prototype, "availabilityType", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateCommandMenuItemInput.prototype, "availabilityObjectMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_enginecomponentkeyenum.EngineComponentKey),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_enginecomponentkeyenum.EngineComponentKey, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _enginecomponentkeyenum.EngineComponentKey === "undefined" ? Object : _enginecomponentkeyenum.EngineComponentKey)
], UpdateCommandMenuItemInput.prototype, "engineComponentKey", void 0);
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
], UpdateCommandMenuItemInput.prototype, "hotKeys", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateCommandMenuItemInput.prototype, "pageLayoutId", void 0);
UpdateCommandMenuItemInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateCommandMenuItemInput);

//# sourceMappingURL=update-command-menu-item.input.js.map