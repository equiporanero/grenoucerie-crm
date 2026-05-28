"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AvailableWorkspacesAndAccessTokensDTO", {
    enumerable: true,
    get: function() {
        return AvailableWorkspacesAndAccessTokensDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _availableworkspacesdto = require("./available-workspaces.dto");
const _authtokenpairdto = require("./auth-token-pair.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AvailableWorkspacesAndAccessTokensDTO = class AvailableWorkspacesAndAccessTokensDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_authtokenpairdto.AuthTokenPair),
    _ts_metadata("design:type", typeof _authtokenpairdto.AuthTokenPair === "undefined" ? Object : _authtokenpairdto.AuthTokenPair)
], AvailableWorkspacesAndAccessTokensDTO.prototype, "tokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_availableworkspacesdto.AvailableWorkspaces),
    _ts_metadata("design:type", typeof _availableworkspacesdto.AvailableWorkspaces === "undefined" ? Object : _availableworkspacesdto.AvailableWorkspaces)
], AvailableWorkspacesAndAccessTokensDTO.prototype, "availableWorkspaces", void 0);
AvailableWorkspacesAndAccessTokensDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AvailableWorkspacesAndAccessTokens')
], AvailableWorkspacesAndAccessTokensDTO);

//# sourceMappingURL=available-workspaces-and-access-tokens.dto.js.map