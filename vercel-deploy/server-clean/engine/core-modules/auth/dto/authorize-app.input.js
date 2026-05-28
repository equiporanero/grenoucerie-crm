"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthorizeAppInput", {
    enumerable: true,
    get: function() {
        return AuthorizeAppInput;
    }
});
const _graphql = require("@nestjs/graphql");
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
let AuthorizeAppInput = class AuthorizeAppInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], AuthorizeAppInput.prototype, "clientId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(256),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], AuthorizeAppInput.prototype, "codeChallenge", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(2048),
    _ts_metadata("design:type", String)
], AuthorizeAppInput.prototype, "redirectUrl", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(1024),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], AuthorizeAppInput.prototype, "state", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(1024),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], AuthorizeAppInput.prototype, "scope", void 0);
AuthorizeAppInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], AuthorizeAppInput);

//# sourceMappingURL=authorize-app.input.js.map