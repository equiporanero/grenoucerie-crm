"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get FullNameDTO () {
        return FullNameDTO;
    },
    get WorkspaceMemberDTO () {
        return WorkspaceMemberDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _roledto = require("../../../metadata-modules/role/dtos/role.dto");
const _workspacememberworkspaceentity = require("../../../../modules/workspace-member/standard-objects/workspace-member.workspace-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FullNameDTO = class FullNameDTO {
};
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], FullNameDTO.prototype, "firstName", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], FullNameDTO.prototype, "lastName", void 0);
FullNameDTO = _ts_decorate([
    (0, _graphql.ObjectType)('FullName')
], FullNameDTO);
let WorkspaceMemberDTO = class WorkspaceMemberDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], WorkspaceMemberDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>FullNameDTO),
    _ts_metadata("design:type", typeof FullNameDTO === "undefined" ? Object : FullNameDTO)
], WorkspaceMemberDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], WorkspaceMemberDTO.prototype, "userEmail", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], WorkspaceMemberDTO.prototype, "colorScheme", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceMemberDTO.prototype, "avatarUrl", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceMemberDTO.prototype, "locale", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true
    }),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.Max)(7),
    _ts_metadata("design:type", Number)
], WorkspaceMemberDTO.prototype, "calendarStartDay", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceMemberDTO.prototype, "timeZone", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacememberworkspaceentity.WorkspaceMemberDateFormatEnum, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _workspacememberworkspaceentity.WorkspaceMemberDateFormatEnum === "undefined" ? Object : _workspacememberworkspaceentity.WorkspaceMemberDateFormatEnum)
], WorkspaceMemberDTO.prototype, "dateFormat", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacememberworkspaceentity.WorkspaceMemberTimeFormatEnum, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _workspacememberworkspaceentity.WorkspaceMemberTimeFormatEnum === "undefined" ? Object : _workspacememberworkspaceentity.WorkspaceMemberTimeFormatEnum)
], WorkspaceMemberDTO.prototype, "timeFormat", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _roledto.RoleDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], WorkspaceMemberDTO.prototype, "roles", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceMemberDTO.prototype, "userWorkspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacememberworkspaceentity.WorkspaceMemberNumberFormatEnum, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _workspacememberworkspaceentity.WorkspaceMemberNumberFormatEnum === "undefined" ? Object : _workspacememberworkspaceentity.WorkspaceMemberNumberFormatEnum)
], WorkspaceMemberDTO.prototype, "numberFormat", void 0);
WorkspaceMemberDTO = _ts_decorate([
    (0, _graphql.ObjectType)('WorkspaceMember')
], WorkspaceMemberDTO);

//# sourceMappingURL=workspace-member.dto.js.map