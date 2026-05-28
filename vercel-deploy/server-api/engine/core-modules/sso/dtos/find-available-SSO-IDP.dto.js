/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FindAvailableSSOIDPDTO", {
    enumerable: true,
    get: function() {
        return FindAvailableSSOIDPDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspacessoidentityproviderentity = require("../workspace-sso-identity-provider.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceNameAndId = class WorkspaceNameAndId {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkspaceNameAndId.prototype, "displayName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], WorkspaceNameAndId.prototype, "id", void 0);
WorkspaceNameAndId = _ts_decorate([
    (0, _graphql.ObjectType)()
], WorkspaceNameAndId);
let FindAvailableSSOIDPDTO = class FindAvailableSSOIDPDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacessoidentityproviderentity.IdentityProviderType),
    _ts_metadata("design:type", Object)
], FindAvailableSSOIDPDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], FindAvailableSSOIDPDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], FindAvailableSSOIDPDTO.prototype, "issuer", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], FindAvailableSSOIDPDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacessoidentityproviderentity.SSOIdentityProviderStatus),
    _ts_metadata("design:type", Object)
], FindAvailableSSOIDPDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>WorkspaceNameAndId),
    _ts_metadata("design:type", typeof WorkspaceNameAndId === "undefined" ? Object : WorkspaceNameAndId)
], FindAvailableSSOIDPDTO.prototype, "workspace", void 0);
FindAvailableSSOIDPDTO = _ts_decorate([
    (0, _graphql.ObjectType)('FindAvailableSSOIDP')
], FindAvailableSSOIDPDTO);

//# sourceMappingURL=find-available-SSO-IDP.dto.js.map