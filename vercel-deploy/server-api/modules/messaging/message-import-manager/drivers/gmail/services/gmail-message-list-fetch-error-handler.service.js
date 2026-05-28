"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailMessageListFetchErrorHandler", {
    enumerable: true,
    get: function() {
        return GmailMessageListFetchErrorHandler;
    }
});
const _common = require("@nestjs/common");
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _isgmailapierrorutil = require("../utils/is-gmail-api-error.util");
const _isgmailnetworkerrorutil = require("../utils/is-gmail-network-error.util");
const _parsegmailapierrorutil = require("../utils/parse-gmail-api-error.util");
const _parsegmailnetworkerrorutil = require("../utils/parse-gmail-network-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GmailMessageListFetchErrorHandler = class GmailMessageListFetchErrorHandler {
    handleError(error) {
        const constructorName = error?.constructor?.name ?? 'Unknown';
        this.logger.error(`Gmail: Error fetching message list: ${JSON.stringify(error)}, constructor: ${constructorName}`);
        if ((0, _isgmailnetworkerrorutil.isGmailNetworkError)(error)) {
            throw (0, _parsegmailnetworkerrorutil.parseGmailNetworkError)(error);
        }
        if ((0, _isgmailapierrorutil.isGmailApiError)(error)) {
            throw (0, _parsegmailapierrorutil.parseGmailApiError)(error);
        }
        throw new _messageimportdriverexception.MessageImportDriverException(`Gmail message list fetch error: ${error instanceof Error ? error.message : String(error)}`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN);
    }
    constructor(){
        this.logger = new _common.Logger(GmailMessageListFetchErrorHandler.name);
    }
};
GmailMessageListFetchErrorHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], GmailMessageListFetchErrorHandler);

//# sourceMappingURL=gmail-message-list-fetch-error-handler.service.js.map