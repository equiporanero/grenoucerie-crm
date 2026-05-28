"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalDavClientProvider", {
    enumerable: true,
    get: function() {
        return CalDavClientProvider;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _connectedaccountentity = require("../../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionservice = require("../../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _calendareventimportdriverexception = require("../../exceptions/calendar-event-import-driver.exception");
const _caldavclientservice = require("../services/caldav-client.service");
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
let CalDavClientProvider = class CalDavClientProvider {
    async getClient(connectedAccountId) {
        const connectedAccount = await this.connectedAccountRepository.findOne({
            where: {
                id: connectedAccountId
            }
        });
        if (!(0, _utils.isDefined)(connectedAccount) || connectedAccount.provider !== _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV || !(0, _utils.isDefined)(connectedAccount.connectionParameters?.CALDAV)) {
            throw new _calendareventimportdriverexception.CalendarEventImportDriverException(`Missing CalDAV credentials for connected account ${connectedAccountId}`, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        }
        const params = this.connectedAccountTokenEncryptionService.decryptProtocolPassword({
            protocolParams: connectedAccount.connectionParameters.CALDAV,
            workspaceId: connectedAccount.workspaceId
        });
        return this.calDavClientService.getClient({
            serverUrl: params.host,
            username: params.username ?? connectedAccount.handle,
            password: params.password
        });
    }
    constructor(calDavClientService, connectedAccountTokenEncryptionService, connectedAccountRepository){
        this.calDavClientService = calDavClientService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.connectedAccountRepository = connectedAccountRepository;
    }
};
CalDavClientProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _caldavclientservice.CalDavClientService === "undefined" ? Object : _caldavclientservice.CalDavClientService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CalDavClientProvider);

//# sourceMappingURL=caldav-client.provider.js.map