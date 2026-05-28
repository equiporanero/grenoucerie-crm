"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapClientProvider", {
    enumerable: true,
    get: function() {
        return ImapClientProvider;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _imapflow = require("imapflow");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _securehttpclientservice = require("../../../../../../engine/core-modules/secure-http-client/secure-http-client.service");
const _connectedaccountentity = require("../../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionservice = require("../../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _parseimapauthenticationerrorutil = require("../utils/parse-imap-authentication-error.util");
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
let ImapClientProvider = class ImapClientProvider {
    async getClient(connectedAccountId) {
        const connectedAccount = await this.loadConnectedAccount(connectedAccountId);
        try {
            return await this.createConnection(connectedAccount);
        } catch (error) {
            this.logger.error(`Failed to establish IMAP connection for ${connectedAccount.handle}: ${error.message}`, error.stack);
            throw (0, _parseimapauthenticationerrorutil.parseImapAuthenticationError)(error);
        }
    }
    async closeClient(client) {
        try {
            await client.logout();
            this.logger.log('Closed IMAP client');
        } catch (error) {
            this.logger.error(`Error closing IMAP client: ${error.message}`);
        }
    }
    async loadConnectedAccount(connectedAccountId) {
        const connectedAccount = await this.connectedAccountRepository.findOne({
            where: {
                id: connectedAccountId
            }
        });
        if (!(0, _utils.isDefined)(connectedAccount) || connectedAccount.provider !== _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV || !(0, _utils.isDefined)(connectedAccount.connectionParameters?.IMAP)) {
            throw new _messageimportdriverexception.MessageImportDriverException(`Missing IMAP credentials for connected account ${connectedAccountId}`, _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        }
        return connectedAccount;
    }
    async createConnection(connectedAccount) {
        if (!(0, _utils.isDefined)(connectedAccount.connectionParameters?.IMAP)) {
            throw new Error('Connected account is not an IMAP provider');
        }
        const imapParams = this.connectedAccountTokenEncryptionService.decryptProtocolPassword({
            protocolParams: connectedAccount.connectionParameters.IMAP,
            workspaceId: connectedAccount.workspaceId
        });
        const validatedImapHost = await this.secureHttpClientService.getValidatedHost(imapParams.host);
        const client = new _imapflow.ImapFlow({
            host: validatedImapHost,
            port: imapParams.port || 993,
            secure: imapParams.secure,
            auth: {
                user: (0, _utils.isDefined)(imapParams.username) ? imapParams.username : connectedAccount.handle,
                pass: imapParams.password
            },
            logger: false,
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: ImapClientProvider.CONNECTION_TIMEOUT_MS,
            greetingTimeout: ImapClientProvider.GREETING_TIMEOUT_MS
        });
        // ImapFlow is long-lived EventEmitter — missing 'error' listener crashes process on socket timeout.
        client.on('error', (error)=>{
            this.logger.error(`IMAP client error for ${connectedAccount.handle}: ${error.message}`, error.stack);
        });
        try {
            await client.connect();
            this.logger.log(`Connected to IMAP server for ${connectedAccount.handle}`);
            return client;
        } catch (error) {
            try {
                await client.logout();
            } catch  {
            // Ignore cleanup errors
            }
            throw error;
        }
    }
    constructor(secureHttpClientService, connectedAccountTokenEncryptionService, connectedAccountRepository){
        this.secureHttpClientService = secureHttpClientService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.connectedAccountRepository = connectedAccountRepository;
        this.logger = new _common.Logger(ImapClientProvider.name);
    }
};
ImapClientProvider.CONNECTION_TIMEOUT_MS = 30000;
ImapClientProvider.GREETING_TIMEOUT_MS = 16000;
ImapClientProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ImapClientProvider);

//# sourceMappingURL=imap-client.provider.js.map