"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailFoldersErrorHandlerService", {
    enumerable: true,
    get: function() {
        return GmailFoldersErrorHandlerService;
    }
});
const _common = require("@nestjs/common");
const _messageimportdriverexception = require("../../../../message-import-manager/drivers/exceptions/message-import-driver.exception");
const _isgmailapierrorutil = require("../../../../message-import-manager/drivers/gmail/utils/is-gmail-api-error.util");
const _isgmailnetworkerrorutil = require("../../../../message-import-manager/drivers/gmail/utils/is-gmail-network-error.util");
const _parsegmailapierrorutil = require("../../../../message-import-manager/drivers/gmail/utils/parse-gmail-api-error.util");
const _parsegmailnetworkerrorutil = require("../../../../message-import-manager/drivers/gmail/utils/parse-gmail-network-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GmailFoldersErrorHandlerService = class GmailFoldersErrorHandlerService {
    handleError(error) {
        const constructorName = error?.constructor?.name ?? 'Unknown';
        this.logger.error(`Gmail: Error fetching folders: ${JSON.stringify(error)}, constructor: ${constructorName}`);
        if ((0, _isgmailnetworkerrorutil.isGmailNetworkError)(error)) {
            throw (0, _parsegmailnetworkerrorutil.parseGmailNetworkError)(error);
        }
        if ((0, _isgmailapierrorutil.isGmailApiError)(error)) {
            throw (0, _parsegmailapierrorutil.parseGmailApiError)(error);
        }
        throw new _messageimportdriverexception.MessageImportDriverException(`Gmail folders fetch error: ${error instanceof Error ? error.message : String(error)}`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN);
    }
    constructor(){
        this.logger = new _common.Logger(GmailFoldersErrorHandlerService.name);
    }
};
GmailFoldersErrorHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], GmailFoldersErrorHandlerService);

//# sourceMappingURL=gmail-folders-error-handler.service.js.map