"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OAuthRegisterInput", {
    enumerable: true,
    get: function() {
        return OAuthRegisterInput;
    }
});
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let OAuthRegisterInput = class OAuthRegisterInput {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(256),
    _ts_metadata("design:type", String)
], OAuthRegisterInput.prototype, "client_name", void 0);
_ts_decorate([
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    (0, _classvalidator.ArrayMaxSize)(20),
    (0, _classvalidator.MaxLength)(2048, {
        each: true
    }),
    _ts_metadata("design:type", Array)
], OAuthRegisterInput.prototype, "redirect_uris", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    (0, _classvalidator.ArrayMaxSize)(5),
    _ts_metadata("design:type", Array)
], OAuthRegisterInput.prototype, "grant_types", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    (0, _classvalidator.ArrayMaxSize)(5),
    _ts_metadata("design:type", Array)
], OAuthRegisterInput.prototype, "response_types", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(50),
    _ts_metadata("design:type", String)
], OAuthRegisterInput.prototype, "token_endpoint_auth_method", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(256),
    _ts_metadata("design:type", String)
], OAuthRegisterInput.prototype, "scope", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(2048),
    _ts_metadata("design:type", String)
], OAuthRegisterInput.prototype, "client_uri", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(2048),
    _ts_metadata("design:type", String)
], OAuthRegisterInput.prototype, "logo_uri", void 0);

//# sourceMappingURL=oauth-register.input.js.map