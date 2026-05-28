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
    get SetupOIDCSsoInput () {
        return SetupOIDCSsoInput;
    },
    get SetupSAMLSsoInput () {
        return SetupSAMLSsoInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _x509validator = require("./validators/x509.validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SetupSsoInputCommon = class SetupSsoInputCommon {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], SetupSsoInputCommon.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsUrl)({
        protocols: [
            'http',
            'https'
        ]
    }),
    _ts_metadata("design:type", String)
], SetupSsoInputCommon.prototype, "issuer", void 0);
SetupSsoInputCommon = _ts_decorate([
    (0, _graphql.InputType)()
], SetupSsoInputCommon);
let SetupOIDCSsoInput = class SetupOIDCSsoInput extends SetupSsoInputCommon {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], SetupOIDCSsoInput.prototype, "clientID", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], SetupOIDCSsoInput.prototype, "clientSecret", void 0);
SetupOIDCSsoInput = _ts_decorate([
    (0, _graphql.InputType)()
], SetupOIDCSsoInput);
let SetupSAMLSsoInput = class SetupSAMLSsoInput extends SetupSsoInputCommon {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], SetupSAMLSsoInput.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsUrl)({
        protocols: [
            'http',
            'https'
        ]
    }),
    _ts_metadata("design:type", String)
], SetupSAMLSsoInput.prototype, "ssoURL", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _x509validator.IsX509Certificate)(),
    _ts_metadata("design:type", String)
], SetupSAMLSsoInput.prototype, "certificate", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], SetupSAMLSsoInput.prototype, "fingerprint", void 0);
SetupSAMLSsoInput = _ts_decorate([
    (0, _graphql.InputType)()
], SetupSAMLSsoInput);

//# sourceMappingURL=setup-sso.input.js.map