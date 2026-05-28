"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectedImapSmtpCaldavAccountDTO", {
    enumerable: true,
    get: function() {
        return ConnectedImapSmtpCaldavAccountDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PublicConnectionParamsDTO = class PublicConnectionParamsDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], PublicConnectionParamsDTO.prototype, "host", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], PublicConnectionParamsDTO.prototype, "port", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PublicConnectionParamsDTO.prototype, "username", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], PublicConnectionParamsDTO.prototype, "secure", void 0);
PublicConnectionParamsDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ImapSmtpCaldavPublicConnectionParams')
], PublicConnectionParamsDTO);
let ImapSmtpCaldavPublicConnectionParametersDTO = class ImapSmtpCaldavPublicConnectionParametersDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>PublicConnectionParamsDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof PublicConnectionParamsDTO === "undefined" ? Object : PublicConnectionParamsDTO)
], ImapSmtpCaldavPublicConnectionParametersDTO.prototype, "IMAP", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>PublicConnectionParamsDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof PublicConnectionParamsDTO === "undefined" ? Object : PublicConnectionParamsDTO)
], ImapSmtpCaldavPublicConnectionParametersDTO.prototype, "SMTP", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>PublicConnectionParamsDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof PublicConnectionParamsDTO === "undefined" ? Object : PublicConnectionParamsDTO)
], ImapSmtpCaldavPublicConnectionParametersDTO.prototype, "CALDAV", void 0);
ImapSmtpCaldavPublicConnectionParametersDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ImapSmtpCaldavPublicConnectionParameters')
], ImapSmtpCaldavPublicConnectionParametersDTO);
let ConnectedImapSmtpCaldavAccountDTO = class ConnectedImapSmtpCaldavAccountDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ConnectedImapSmtpCaldavAccountDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ConnectedImapSmtpCaldavAccountDTO.prototype, "handle", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", typeof _types.ConnectedAccountProvider === "undefined" ? Object : _types.ConnectedAccountProvider)
], ConnectedImapSmtpCaldavAccountDTO.prototype, "provider", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ConnectedImapSmtpCaldavAccountDTO.prototype, "userWorkspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>ImapSmtpCaldavPublicConnectionParametersDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ConnectedImapSmtpCaldavAccountDTO.prototype, "connectionParameters", void 0);
ConnectedImapSmtpCaldavAccountDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ConnectedImapSmtpCaldavAccount')
], ConnectedImapSmtpCaldavAccountDTO);

//# sourceMappingURL=imap-smtp-caldav-connected-account.dto.js.map