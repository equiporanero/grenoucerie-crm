"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandMenuItemDTO", {
    enumerable: true,
    get: function() {
        return CommandMenuItemDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _commandmenuitemavailabilitytypeenum = require("../enums/command-menu-item-availability-type.enum");
const _commandmenuitempayloadunion = require("./command-menu-item-payload.union");
const _enginecomponentkeyenum = require("../enums/engine-component-key.enum");
const _frontcomponentdto = require("../../front-component/dtos/front-component.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CommandMenuItemDTO = class CommandMenuItemDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "workflowVersionId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "frontComponentId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_frontcomponentdto.FrontComponentDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemDTO.prototype, "frontComponent", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_enginecomponentkeyenum.EngineComponentKey),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_enginecomponentkeyenum.EngineComponentKey),
    _ts_metadata("design:type", typeof _enginecomponentkeyenum.EngineComponentKey === "undefined" ? Object : _enginecomponentkeyenum.EngineComponentKey)
], CommandMenuItemDTO.prototype, "engineComponentKey", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "label", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "shortLabel", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)(()=>_graphql.Float),
    _ts_metadata("design:type", Number)
], CommandMenuItemDTO.prototype, "position", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], CommandMenuItemDTO.prototype, "isPinned", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType),
    (0, _graphql.Field)(()=>_commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType),
    _ts_metadata("design:type", typeof _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType === "undefined" ? Object : _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType)
], CommandMenuItemDTO.prototype, "availabilityType", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_commandmenuitempayloadunion.CommandMenuItemPayloadUnion, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof CommandMenuItemPayload === "undefined" ? Object : CommandMenuItemPayload)
], CommandMenuItemDTO.prototype, "payload", void 0);
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
], CommandMenuItemDTO.prototype, "hotKeys", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "conditionalAvailabilityExpression", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "availabilityObjectMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "pageLayoutId", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemDTO.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CommandMenuItemDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CommandMenuItemDTO.prototype, "updatedAt", void 0);
CommandMenuItemDTO = _ts_decorate([
    (0, _graphql.ObjectType)('CommandMenuItem')
], CommandMenuItemDTO);

//# sourceMappingURL=command-menu-item.dto.js.map