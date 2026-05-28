/* @license Enterprise */ "use strict";
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
    get AvailableWorkspace () {
        return AvailableWorkspace;
    },
    get AvailableWorkspaces () {
        return AvailableWorkspaces;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspacessoidentityproviderentity = require("../../sso/workspace-sso-identity-provider.entity");
const _workspaceurlsdto = require("../../workspace/dtos/workspace-urls.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SSOConnectionDTO = class SSOConnectionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacessoidentityproviderentity.IdentityProviderType),
    _ts_metadata("design:type", Object)
], SSOConnectionDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], SSOConnectionDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], SSOConnectionDTO.prototype, "issuer", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], SSOConnectionDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacessoidentityproviderentity.SSOIdentityProviderStatus),
    _ts_metadata("design:type", Object)
], SSOConnectionDTO.prototype, "status", void 0);
SSOConnectionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('SSOConnection')
], SSOConnectionDTO);
let AvailableWorkspace = class AvailableWorkspace {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], AvailableWorkspace.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AvailableWorkspace.prototype, "displayName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AvailableWorkspace.prototype, "loginToken", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AvailableWorkspace.prototype, "personalInviteToken", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AvailableWorkspace.prototype, "inviteHash", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspaceurlsdto.WorkspaceUrlsDTO),
    _ts_metadata("design:type", typeof _workspaceurlsdto.WorkspaceUrlsDTO === "undefined" ? Object : _workspaceurlsdto.WorkspaceUrlsDTO)
], AvailableWorkspace.prototype, "workspaceUrls", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AvailableWorkspace.prototype, "logo", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            SSOConnectionDTO
        ]),
    _ts_metadata("design:type", Array)
], AvailableWorkspace.prototype, "sso", void 0);
AvailableWorkspace = _ts_decorate([
    (0, _graphql.ObjectType)('AvailableWorkspace')
], AvailableWorkspace);
let AvailableWorkspaces = class AvailableWorkspaces {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            AvailableWorkspace
        ]),
    _ts_metadata("design:type", typeof Array === "undefined" ? Object : Array)
], AvailableWorkspaces.prototype, "availableWorkspacesForSignIn", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            AvailableWorkspace
        ]),
    _ts_metadata("design:type", typeof Array === "undefined" ? Object : Array)
], AvailableWorkspaces.prototype, "availableWorkspacesForSignUp", void 0);
AvailableWorkspaces = _ts_decorate([
    (0, _graphql.ObjectType)('AvailableWorkspaces')
], AvailableWorkspaces);

//# sourceMappingURL=available-workspaces.dto.js.map