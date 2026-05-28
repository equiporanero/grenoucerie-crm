"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectedAccountPublicDTO", {
    enumerable: true,
    get: function() {
        return ConnectedAccountPublicDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _connectedaccountdto = require("./connected-account.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PublicConnectionParametersDTO = class PublicConnectionParametersDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], PublicConnectionParametersDTO.prototype, "host", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], PublicConnectionParametersDTO.prototype, "port", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PublicConnectionParametersDTO.prototype, "username", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], PublicConnectionParametersDTO.prototype, "secure", void 0);
PublicConnectionParametersDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PublicConnectionParametersOutput')
], PublicConnectionParametersDTO);
let PublicImapSmtpCaldavConnectionParametersDTO = class PublicImapSmtpCaldavConnectionParametersDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>PublicConnectionParametersDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof PublicConnectionParametersDTO === "undefined" ? Object : PublicConnectionParametersDTO)
], PublicImapSmtpCaldavConnectionParametersDTO.prototype, "IMAP", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>PublicConnectionParametersDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof PublicConnectionParametersDTO === "undefined" ? Object : PublicConnectionParametersDTO)
], PublicImapSmtpCaldavConnectionParametersDTO.prototype, "SMTP", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>PublicConnectionParametersDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof PublicConnectionParametersDTO === "undefined" ? Object : PublicConnectionParametersDTO)
], PublicImapSmtpCaldavConnectionParametersDTO.prototype, "CALDAV", void 0);
PublicImapSmtpCaldavConnectionParametersDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PublicImapSmtpCaldavConnectionParameters')
], PublicImapSmtpCaldavConnectionParametersDTO);
let ConnectedAccountPublicDTO = class ConnectedAccountPublicDTO extends (0, _graphql.OmitType)(_connectedaccountdto.ConnectedAccountDTO, [
    'connectionParameters'
]) {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>PublicImapSmtpCaldavConnectionParametersDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ConnectedAccountPublicDTO.prototype, "connectionParameters", void 0);
ConnectedAccountPublicDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ConnectedAccountPublicDTO')
], ConnectedAccountPublicDTO);

//# sourceMappingURL=connected-account-public.dto.js.map