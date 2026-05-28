"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExchangeAuthCodeDTO", {
    enumerable: true,
    get: function() {
        return ExchangeAuthCodeDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _authtokendto = require("./auth-token.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ExchangeAuthCodeDTO = class ExchangeAuthCodeDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_authtokendto.AuthToken),
    _ts_metadata("design:type", typeof _authtokendto.AuthToken === "undefined" ? Object : _authtokendto.AuthToken)
], ExchangeAuthCodeDTO.prototype, "accessOrWorkspaceAgnosticToken", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_authtokendto.AuthToken),
    _ts_metadata("design:type", typeof _authtokendto.AuthToken === "undefined" ? Object : _authtokendto.AuthToken)
], ExchangeAuthCodeDTO.prototype, "refreshToken", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_authtokendto.AuthToken),
    _ts_metadata("design:type", typeof _authtokendto.AuthToken === "undefined" ? Object : _authtokendto.AuthToken)
], ExchangeAuthCodeDTO.prototype, "loginToken", void 0);
ExchangeAuthCodeDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ExchangeAuthCode')
], ExchangeAuthCodeDTO);

//# sourceMappingURL=exchange-auth-code.dto.js.map