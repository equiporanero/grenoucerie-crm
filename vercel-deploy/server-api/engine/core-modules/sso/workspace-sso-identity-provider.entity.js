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
    get IdentityProviderType () {
        return IdentityProviderType;
    },
    get OIDCResponseType () {
        return OIDCResponseType;
    },
    get SSOIdentityProviderStatus () {
        return SSOIdentityProviderStatus;
    },
    get WorkspaceSSOIdentityProviderEntity () {
        return WorkspaceSSOIdentityProviderEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _typeorm = require("typeorm");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspacerelatedentity = require("../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var IdentityProviderType = /*#__PURE__*/ function(IdentityProviderType) {
    IdentityProviderType["OIDC"] = "OIDC";
    IdentityProviderType["SAML"] = "SAML";
    return IdentityProviderType;
}({});
var OIDCResponseType = /*#__PURE__*/ function(OIDCResponseType) {
    // Only Authorization Code is used for now
    OIDCResponseType["CODE"] = "code";
    OIDCResponseType["ID_TOKEN"] = "id_token";
    OIDCResponseType["TOKEN"] = "token";
    OIDCResponseType["NONE"] = "none";
    return OIDCResponseType;
}({});
(0, _graphql.registerEnumType)(IdentityProviderType, {
    name: 'IdentityProviderType'
});
var SSOIdentityProviderStatus = /*#__PURE__*/ function(SSOIdentityProviderStatus) {
    SSOIdentityProviderStatus["Active"] = "Active";
    SSOIdentityProviderStatus["Inactive"] = "Inactive";
    SSOIdentityProviderStatus["Error"] = "Error";
    return SSOIdentityProviderStatus;
}({});
(0, _graphql.registerEnumType)(SSOIdentityProviderStatus, {
    name: 'SSOIdentityProviderStatus'
});
let WorkspaceSSOIdentityProviderEntity = class WorkspaceSSOIdentityProviderEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: SSOIdentityProviderStatus,
        default: "Active"
    }),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkspaceSSOIdentityProviderEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkspaceSSOIdentityProviderEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: IdentityProviderType,
        default: "OIDC"
    }),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "issuer", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "clientID", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "clientSecret", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "ssoURL", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "certificate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceSSOIdentityProviderEntity.prototype, "fingerprint", void 0);
WorkspaceSSOIdentityProviderEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'workspaceSSOIdentityProvider',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('WorkspaceSSOIdentityProvider')
], WorkspaceSSOIdentityProviderEntity);

//# sourceMappingURL=workspace-sso-identity-provider.entity.js.map