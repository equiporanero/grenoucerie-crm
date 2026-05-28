"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SmtpClientProvider", {
    enumerable: true,
    get: function() {
        return SmtpClientProvider;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nodemailer = require("nodemailer");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _securehttpclientservice = require("../../../../../../engine/core-modules/secure-http-client/secure-http-client.service");
const _connectedaccountentity = require("../../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionservice = require("../../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let SmtpClientProvider = class SmtpClientProvider {
    async getClient(connectedAccountId) {
        const connectedAccount = await this.connectedAccountRepository.findOne({
            where: {
                id: connectedAccountId
            }
        });
        if (!(0, _utils.isDefined)(connectedAccount)) {
            throw new Error(`Connected account ${connectedAccountId} not found while opening SMTP client`);
        }
        if (connectedAccount.provider !== _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV || !(0, _utils.isDefined)(connectedAccount.connectionParameters?.SMTP)) {
            throw new Error('Connected account is not an SMTP provider');
        }
        const smtpParams = this.connectedAccountTokenEncryptionService.decryptProtocolPassword({
            protocolParams: connectedAccount.connectionParameters.SMTP,
            workspaceId: connectedAccount.workspaceId
        });
        const validatedSmtpHost = await this.secureHttpClientService.getValidatedHost(smtpParams.host);
        const options = {
            host: validatedSmtpHost,
            port: smtpParams.port,
            auth: {
                user: smtpParams.username ?? connectedAccount.handle ?? '',
                pass: smtpParams.password
            },
            tls: {
                rejectUnauthorized: false
            }
        };
        const transporter = (0, _nodemailer.createTransport)(options);
        return transporter;
    }
    constructor(secureHttpClientService, connectedAccountTokenEncryptionService, connectedAccountRepository){
        this.secureHttpClientService = secureHttpClientService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.connectedAccountRepository = connectedAccountRepository;
    }
};
SmtpClientProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], SmtpClientProvider);

//# sourceMappingURL=smtp-client.provider.js.map