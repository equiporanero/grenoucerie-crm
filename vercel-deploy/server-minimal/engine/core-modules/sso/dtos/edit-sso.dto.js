/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EditSsoDTO", {
    enumerable: true,
    get: function() {
        return EditSsoDTO;
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
let EditSsoDTO = class EditSsoDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], EditSsoDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacessoidentityproviderentity.IdentityProviderType),
    _ts_metadata("design:type", String)
], EditSsoDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], EditSsoDTO.prototype, "issuer", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], EditSsoDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacessoidentityproviderentity.SSOIdentityProviderStatus),
    _ts_metadata("design:type", Object)
], EditSsoDTO.prototype, "status", void 0);
EditSsoDTO = _ts_decorate([
    (0, _graphql.ObjectType)('EditSso')
], EditSsoDTO);

//# sourceMappingURL=edit-sso.dto.js.map