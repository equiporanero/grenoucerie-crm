"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthTokens", {
    enumerable: true,
    get: function() {
        return AuthTokens;
    }
});
const _graphql = require("@nestjs/graphql");
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
let AuthTokens = class AuthTokens {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_authtokenpairdto.AuthTokenPair),
    _ts_metadata("design:type", typeof _authtokenpairdto.AuthTokenPair === "undefined" ? Object : _authtokenpairdto.AuthTokenPair)
], AuthTokens.prototype, "tokens", void 0);
AuthTokens = _ts_decorate([
    (0, _graphql.ObjectType)()
], AuthTokens);

//# sourceMappingURL=auth-tokens.dto.js.map