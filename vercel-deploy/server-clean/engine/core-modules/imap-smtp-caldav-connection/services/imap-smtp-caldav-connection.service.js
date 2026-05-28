"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapSmtpCaldavService", {
    enumerable: true,
    get: function() {
        return ImapSmtpCaldavService;
    }
});
const _common = require("@nestjs/common");
const _imapflow = require("imapflow");
const _nodemailer = require("nodemailer");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _imapsmtpcaldavconnectionvalidatorservice = require("./imap-smtp-caldav-connection-validator.service");
const _securehttpclientservice = require("../../secure-http-client/secure-http-client.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _caldavclientservice = require("../../../../modules/calendar/calendar-event-import-manager/drivers/caldav/services/caldav-client.service");
const _caldavfetcheventsservice = require("../../../../modules/calendar/calendar-event-import-manager/drivers/caldav/services/caldav-fetch-events.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ImapSmtpCaldavService = class ImapSmtpCaldavService {
    async testImapConnection(handle, params) {
        const validatedHost = await this.secureHttpClientService.getValidatedHost(params.host);
        const client = new _imapflow.ImapFlow({
            host: validatedHost,
            port: params.port,
            secure: params.secure ?? true,
            auth: {
                user: params.username ?? handle,
                pass: params.password
            },
            logger: false,
            tls: {
                rejectUnauthorized: false
            }
        });
        // ImapFlow is EventEmitter — missing 'error' listener crashes process on socket timeout.
        client.on('error', (error)=>{
            this.logger.error(`IMAP test connection error for ${handle}: ${error.message}`, error.stack);
        });
        try {
            await client.connect();
            const mailboxes = await client.list();
            this.logger.log(`IMAP connection successful. Found ${mailboxes.length} mailboxes.`);
            return true;
        } catch (error) {
            this.logger.error(`IMAP connection failed: ${error.message}`, error.stack);
            if (error.authenticationFailed) {
                throw new _graphqlerrorsutil.UserInputError('IMAP authentication failed. Please check your credentials.', {
                    userFriendlyMessage: /*i18n*/ {
                        id: "v8UNEA",
                        message: "We couldn't log in to your email account. Please check your email address and password, then try again."
                    }
                });
            }
            if (error.code === 'ECONNREFUSED') {
                throw new _graphqlerrorsutil.UserInputError(`IMAP connection refused. Please verify server and port.`, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "ax8unE",
                        message: "We couldn't connect to your email server. Please check your server settings and try again."
                    }
                });
            }
            throw new _graphqlerrorsutil.UserInputError(`IMAP connection failed: ${error.message}`, {
                userFriendlyMessage: /*i18n*/ {
                    id: "YxBvFz",
                    message: "We encountered an issue connecting to your email account. Please check your settings and try again."
                }
            });
        } finally{
            if (client.authenticated) {
                await client.logout();
            }
        }
    }
    async testSmtpConnection(handle, params) {
        const validatedHost = await this.secureHttpClientService.getValidatedHost(params.host);
        const transport = (0, _nodemailer.createTransport)({
            host: validatedHost,
            port: params.port,
            auth: {
                user: params.username ?? handle,
                pass: params.password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        try {
            await transport.verify();
        } catch (error) {
            this.logger.error(`SMTP connection failed: ${error.message}`, error.stack);
            throw new _graphqlerrorsutil.UserInputError(`SMTP connection failed: ${error.message}`, {
                userFriendlyMessage: /*i18n*/ {
                    id: "g4rOV3",
                    message: "We couldn't connect to your outgoing email server. Please check your SMTP settings and try again."
                }
            });
        }
        return true;
    }
    async testCaldavConnection(handle, params) {
        try {
            const client = await this.caldavClientService.getClient({
                serverUrl: params.host,
                username: params.username ?? handle,
                password: params.password
            });
            const calendars = await this.caldavFetchEventsService.listEventCalendars(client);
            if (calendars.length === 0) {
                throw new _graphqlerrorsutil.UserInputError('No calendar with event support found', {
                    userFriendlyMessage: /*i18n*/ {
                        id: "jNr0+j",
                        message: "We couldn't find any calendars on your CalDAV server. Please make sure your account has at least one calendar."
                    }
                });
            }
        } catch (error) {
            if (error instanceof _graphqlerrorsutil.UserInputError) {
                throw error;
            }
            this.logger.error(`CALDAV connection failed: ${error.message}`, error.stack);
            if (error.code === 'FailedToOpenSocket') {
                throw new _graphqlerrorsutil.UserInputError(`CALDAV connection failed: ${error.message}`, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "B3CG/U",
                        message: "We couldn't connect to your CalDAV server. Please check your server settings and try again."
                    }
                });
            }
            throw new _graphqlerrorsutil.UserInputError(`CALDAV connection failed: ${error.message}`, {
                userFriendlyMessage: /*i18n*/ {
                    id: "mIrUSZ",
                    message: "Invalid CALDAV credentials. Please check your username and password."
                }
            });
        }
        return true;
    }
    async testImapSmtpCaldav({ handle, params, accountType }) {
        if (!this.twentyConfigService.get('IS_IMAP_SMTP_CALDAV_CONNECTION_TEST_ENABLED')) {
            return true;
        }
        switch(accountType){
            case 'IMAP':
                return this.testImapConnection(handle, params);
            case 'SMTP':
                return this.testSmtpConnection(handle, params);
            case 'CALDAV':
                return this.testCaldavConnection(handle, params);
            default:
                (0, _utils.assertUnreachable)(accountType);
        }
    }
    async validateAndTestConnectionParameters({ connectionParameters, handle, existingConnectionParameters }) {
        const validatedParams = {};
        for (const protocol of _constants.ACCOUNT_TYPES){
            const params = connectionParameters[protocol];
            if (params) {
                const existingProtocolParams = existingConnectionParameters?.[protocol] ?? null;
                const validatedProtocolParams = await this.imapSmtpCaldavValidatorService.validateProtocolConnectionParams({
                    params,
                    existingProtocolParams
                });
                await this.testImapSmtpCaldav({
                    handle,
                    params: validatedProtocolParams,
                    accountType: protocol
                });
                validatedParams[protocol] = validatedProtocolParams;
            }
        }
        return validatedParams;
    }
    constructor(secureHttpClientService, twentyConfigService, caldavClientService, caldavFetchEventsService, imapSmtpCaldavValidatorService){
        this.secureHttpClientService = secureHttpClientService;
        this.twentyConfigService = twentyConfigService;
        this.caldavClientService = caldavClientService;
        this.caldavFetchEventsService = caldavFetchEventsService;
        this.imapSmtpCaldavValidatorService = imapSmtpCaldavValidatorService;
        this.logger = new _common.Logger(ImapSmtpCaldavService.name);
    }
};
ImapSmtpCaldavService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _caldavclientservice.CalDavClientService === "undefined" ? Object : _caldavclientservice.CalDavClientService,
        typeof _caldavfetcheventsservice.CalDavFetchEventsService === "undefined" ? Object : _caldavfetcheventsservice.CalDavFetchEventsService,
        typeof _imapsmtpcaldavconnectionvalidatorservice.ImapSmtpCaldavValidatorService === "undefined" ? Object : _imapsmtpcaldavconnectionvalidatorservice.ImapSmtpCaldavValidatorService
    ])
], ImapSmtpCaldavService);

//# sourceMappingURL=imap-smtp-caldav-connection.service.js.map