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
    get ApplicationConnectionProviderDTO () {
        return ApplicationConnectionProviderDTO;
    },
    get ApplicationConnectionProviderOAuthConfigDTO () {
        return ApplicationConnectionProviderOAuthConfigDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ApplicationConnectionProviderOAuthConfigDTO = class ApplicationConnectionProviderOAuthConfigDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ]),
    _ts_metadata("design:type", Array)
], ApplicationConnectionProviderOAuthConfigDTO.prototype, "scopes", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], ApplicationConnectionProviderOAuthConfigDTO.prototype, "isClientCredentialsConfigured", void 0);
ApplicationConnectionProviderOAuthConfigDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ApplicationConnectionProviderOAuthConfig')
], ApplicationConnectionProviderOAuthConfigDTO);
let ApplicationConnectionProviderDTO = class ApplicationConnectionProviderDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ApplicationConnectionProviderDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ApplicationConnectionProviderDTO.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", typeof ConnectionProviderType === "undefined" ? Object : ConnectionProviderType)
], ApplicationConnectionProviderDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ApplicationConnectionProviderDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ApplicationConnectionProviderDTO.prototype, "displayName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>ApplicationConnectionProviderOAuthConfigDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ApplicationConnectionProviderDTO.prototype, "oauth", void 0);
ApplicationConnectionProviderDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ApplicationConnectionProvider')
], ApplicationConnectionProviderDTO);

//# sourceMappingURL=application-connection-provider.dto.js.map