"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapSmtpCaldavValidatorModule", {
    enumerable: true,
    get: function() {
        return ImapSmtpCaldavValidatorModule;
    }
});
const _common = require("@nestjs/common");
const _securehttpclientmodule = require("../../secure-http-client/secure-http-client.module");
const _imapsmtpcaldavconnectionvalidatorservice = require("./imap-smtp-caldav-connection-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ImapSmtpCaldavValidatorModule = class ImapSmtpCaldavValidatorModule {
};
ImapSmtpCaldavValidatorModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _securehttpclientmodule.SecureHttpClientModule
        ],
        providers: [
            _imapsmtpcaldavconnectionvalidatorservice.ImapSmtpCaldavValidatorService
        ],
        exports: [
            _imapsmtpcaldavconnectionvalidatorservice.ImapSmtpCaldavValidatorService
        ]
    })
], ImapSmtpCaldavValidatorModule);

//# sourceMappingURL=imap-smtp-caldav-connection-validator.module.js.map