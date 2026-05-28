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
    get AuthBypassProvidersDTO () {
        return AuthBypassProvidersDTO;
    },
    get AuthProvidersDTO () {
        return AuthProvidersDTO;
    },
    get PublicWorkspaceDataDTO () {
        return PublicWorkspaceDataDTO;
    },
    get PublicWorkspaceDataSummaryDTO () {
        return PublicWorkspaceDataSummaryDTO;
    },
    get SSOIdentityProviderDTO () {
        return SSOIdentityProviderDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspacessoidentityproviderentity = require("../../sso/workspace-sso-identity-provider.entity");
const _workspaceurlsdto = require("./workspace-urls.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SSOIdentityProviderDTO = class SSOIdentityProviderDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], SSOIdentityProviderDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], SSOIdentityProviderDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacessoidentityproviderentity.IdentityProviderType),
    _ts_metadata("design:type", typeof _workspacessoidentityproviderentity.IdentityProviderType === "undefined" ? Object : _workspacessoidentityproviderentity.IdentityProviderType)
], SSOIdentityProviderDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacessoidentityproviderentity.SSOIdentityProviderStatus),
    _ts_metadata("design:type", typeof _workspacessoidentityproviderentity.SSOIdentityProviderStatus === "undefined" ? Object : _workspacessoidentityproviderentity.SSOIdentityProviderStatus)
], SSOIdentityProviderDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], SSOIdentityProviderDTO.prototype, "issuer", void 0);
SSOIdentityProviderDTO = _ts_decorate([
    (0, _graphql.ObjectType)('SSOIdentityProvider')
], SSOIdentityProviderDTO);
let AuthProvidersDTO = class AuthProvidersDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            SSOIdentityProviderDTO
        ]),
    _ts_metadata("design:type", typeof Array === "undefined" ? Object : Array)
], AuthProvidersDTO.prototype, "sso", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AuthProvidersDTO.prototype, "google", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AuthProvidersDTO.prototype, "magicLink", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AuthProvidersDTO.prototype, "password", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AuthProvidersDTO.prototype, "microsoft", void 0);
AuthProvidersDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AuthProviders')
], AuthProvidersDTO);
let AuthBypassProvidersDTO = class AuthBypassProvidersDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AuthBypassProvidersDTO.prototype, "google", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AuthBypassProvidersDTO.prototype, "password", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AuthBypassProvidersDTO.prototype, "microsoft", void 0);
AuthBypassProvidersDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AuthBypassProviders')
], AuthBypassProvidersDTO);
let PublicWorkspaceDataDTO = class PublicWorkspaceDataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], PublicWorkspaceDataDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>AuthProvidersDTO),
    _ts_metadata("design:type", typeof AuthProvidersDTO === "undefined" ? Object : AuthProvidersDTO)
], PublicWorkspaceDataDTO.prototype, "authProviders", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>AuthBypassProvidersDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof AuthBypassProvidersDTO === "undefined" ? Object : AuthBypassProvidersDTO)
], PublicWorkspaceDataDTO.prototype, "authBypassProviders", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PublicWorkspaceDataDTO.prototype, "logo", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PublicWorkspaceDataDTO.prototype, "displayName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspaceurlsdto.WorkspaceUrlsDTO),
    _ts_metadata("design:type", typeof _workspaceurlsdto.WorkspaceUrlsDTO === "undefined" ? Object : _workspaceurlsdto.WorkspaceUrlsDTO)
], PublicWorkspaceDataDTO.prototype, "workspaceUrls", void 0);
PublicWorkspaceDataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PublicWorkspaceData')
], PublicWorkspaceDataDTO);
let PublicWorkspaceDataSummaryDTO = class PublicWorkspaceDataSummaryDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], PublicWorkspaceDataSummaryDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PublicWorkspaceDataSummaryDTO.prototype, "logo", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PublicWorkspaceDataSummaryDTO.prototype, "displayName", void 0);
PublicWorkspaceDataSummaryDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PublicWorkspaceDataSummary')
], PublicWorkspaceDataSummaryDTO);

//# sourceMappingURL=public-workspace-data.dto.js.map