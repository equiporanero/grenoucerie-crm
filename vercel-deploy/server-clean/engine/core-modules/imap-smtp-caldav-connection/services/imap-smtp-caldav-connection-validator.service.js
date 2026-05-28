"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapSmtpCaldavValidatorService", {
    enumerable: true,
    get: function() {
        return ImapSmtpCaldavValidatorService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _connectionparametersupdateschema = require("../schemas/connection-parameters-update.schema");
const _connectionparametersschema = require("../schemas/connection-parameters.schema");
const _securehttpclientservice = require("../../secure-http-client/secure-http-client.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ImapSmtpCaldavValidatorService = class ImapSmtpCaldavValidatorService {
    async validateProtocolConnectionParams({ params, existingProtocolParams }) {
        if (!params) {
            throw new _graphqlerrorsutil.UserInputError('Protocol connection parameters are required', {
                userFriendlyMessage: /*i18n*/ {
                    id: "RDvKTq",
                    message: "Please provide connection details to configure your email account."
                }
            });
        }
        const schema = existingProtocolParams ? _connectionparametersupdateschema.connectionParametersUpdateSchema : _connectionparametersschema.connectionParametersSchema;
        const result = schema.safeParse(params);
        if (!result.success) {
            const errorMessages = result.error.issues.map((issue)=>`${issue.path.join('.')}: ${issue.message}`).join(', ');
            throw new _graphqlerrorsutil.UserInputError(`Protocol connection validation failed: ${errorMessages}`, {
                userFriendlyMessage: /*i18n*/ {
                    id: "rxi3R2",
                    message: "Please check your connection settings. Make sure the server host, port, and password are correct."
                }
            });
        }
        const validated = result.data;
        try {
            await this.secureHttpClientService.getValidatedHost(validated.host);
        } catch  {
            throw new _graphqlerrorsutil.UserInputError('Connection to private or internal network addresses is not allowed', {
                userFriendlyMessage: /*i18n*/ {
                    id: "vD3FVp",
                    message: "The server address you entered is not allowed. Please use a public server address."
                }
            });
        }
        const password = validated.password ?? existingProtocolParams?.password ?? null;
        if (!(0, _guards.isNonEmptyString)(password)) {
            throw new _graphqlerrorsutil.UserInputError('Password is required — no existing password found', {
                userFriendlyMessage: /*i18n*/ {
                    id: "qgasuj",
                    message: "Please provide a password for this connection."
                }
            });
        }
        return {
            ...validated,
            password
        };
    }
    constructor(secureHttpClientService){
        this.secureHttpClientService = secureHttpClientService;
    }
};
ImapSmtpCaldavValidatorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], ImapSmtpCaldavValidatorService);

//# sourceMappingURL=imap-smtp-caldav-connection-validator.service.js.map