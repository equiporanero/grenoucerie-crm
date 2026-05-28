"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationDTO", {
    enumerable: true,
    get: function() {
        return ApplicationDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _applicationregistrationsummarydto = require("../application-registration/dtos/application-registration-summary.dto");
const _applicationvariabledto = require("../application-variable/dtos/application-variable.dto");
const _agentdto = require("../../../metadata-modules/ai/ai-agent/dtos/agent.dto");
const _commandmenuitemdto = require("../../../metadata-modules/command-menu-item/dtos/command-menu-item.dto");
const _frontcomponentdto = require("../../../metadata-modules/front-component/dtos/front-component.dto");
const _logicfunctiondto = require("../../../metadata-modules/logic-function/dtos/logic-function.dto");
const _objectmetadatadto = require("../../../metadata-modules/object-metadata/dtos/object-metadata.dto");
const _roledto = require("../../../metadata-modules/role/dtos/role.dto");
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
let ApplicationDTO = class ApplicationDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "logo", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "version", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "packageJsonChecksum", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "packageJsonFileId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "yarnLockChecksum", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "yarnLockFileId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default),
    _ts_metadata("design:type", typeof Record === "undefined" ? Object : Record)
], ApplicationDTO.prototype, "availablePackages", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "applicationRegistrationId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], ApplicationDTO.prototype, "canBeUninstalled", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "defaultRoleId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationDTO.prototype, "settingsCustomTabFrontComponentId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_roledto.RoleDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _roledto.RoleDTO === "undefined" ? Object : _roledto.RoleDTO)
], ApplicationDTO.prototype, "defaultLogicFunctionRole", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _agentdto.AgentDTO
        ]),
    _ts_metadata("design:type", Array)
], ApplicationDTO.prototype, "agents", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _frontcomponentdto.FrontComponentDTO
        ]),
    _ts_metadata("design:type", Array)
], ApplicationDTO.prototype, "frontComponents", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _commandmenuitemdto.CommandMenuItemDTO
        ]),
    _ts_metadata("design:type", Array)
], ApplicationDTO.prototype, "commandMenuItems", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _logicfunctiondto.LogicFunctionDTO
        ]),
    _ts_metadata("design:type", Array)
], ApplicationDTO.prototype, "logicFunctions", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _objectmetadatadto.ObjectMetadataDTO
        ]),
    _ts_metadata("design:type", Array)
], ApplicationDTO.prototype, "objects", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _applicationvariabledto.ApplicationVariableEntityDTO
        ]),
    _ts_metadata("design:type", Array)
], ApplicationDTO.prototype, "applicationVariables", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_applicationregistrationsummarydto.ApplicationRegistrationSummaryDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _applicationregistrationsummarydto.ApplicationRegistrationSummaryDTO === "undefined" ? Object : _applicationregistrationsummarydto.ApplicationRegistrationSummaryDTO)
], ApplicationDTO.prototype, "applicationRegistration", void 0);
ApplicationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('Application')
], ApplicationDTO);

//# sourceMappingURL=application.dto.js.map