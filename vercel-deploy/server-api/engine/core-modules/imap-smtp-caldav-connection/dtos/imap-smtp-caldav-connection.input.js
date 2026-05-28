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
    get AccountType () {
        return AccountType;
    },
    get ConnectionParametersInput () {
        return ConnectionParametersInput;
    },
    get EmailAccountConnectionParametersInput () {
        return EmailAccountConnectionParametersInput;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AccountType = class AccountType {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AccountType.prototype, "type", void 0);
AccountType = _ts_decorate([
    (0, _graphql.InputType)()
], AccountType);
let ConnectionParametersInput = class ConnectionParametersInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ConnectionParametersInput.prototype, "host", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], ConnectionParametersInput.prototype, "port", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ConnectionParametersInput.prototype, "username", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ConnectionParametersInput.prototype, "password", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], ConnectionParametersInput.prototype, "secure", void 0);
ConnectionParametersInput = _ts_decorate([
    (0, _graphql.InputType)()
], ConnectionParametersInput);
let EmailAccountConnectionParametersInput = class EmailAccountConnectionParametersInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>ConnectionParametersInput, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof ConnectionParametersInput === "undefined" ? Object : ConnectionParametersInput)
], EmailAccountConnectionParametersInput.prototype, "IMAP", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>ConnectionParametersInput, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof ConnectionParametersInput === "undefined" ? Object : ConnectionParametersInput)
], EmailAccountConnectionParametersInput.prototype, "SMTP", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>ConnectionParametersInput, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof ConnectionParametersInput === "undefined" ? Object : ConnectionParametersInput)
], EmailAccountConnectionParametersInput.prototype, "CALDAV", void 0);
EmailAccountConnectionParametersInput = _ts_decorate([
    (0, _graphql.InputType)('EmailAccountConnectionParameters')
], EmailAccountConnectionParametersInput);

//# sourceMappingURL=imap-smtp-caldav-connection.input.js.map