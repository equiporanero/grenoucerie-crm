"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapMessageListFetchErrorHandler", {
    enumerable: true,
    get: function() {
        return ImapMessageListFetchErrorHandler;
    }
});
const _common = require("@nestjs/common");
const _parseimapmessagelistfetcherrorutil = require("../utils/parse-imap-message-list-fetch-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ImapMessageListFetchErrorHandler = class ImapMessageListFetchErrorHandler {
    handleError(error) {
        this.logger.error(`IMAP: Error fetching message list: ${JSON.stringify(error)}`);
        throw (0, _parseimapmessagelistfetcherrorutil.parseImapMessageListFetchError)(error, {
            cause: error
        });
    }
    constructor(){
        this.logger = new _common.Logger(ImapMessageListFetchErrorHandler.name);
    }
};
ImapMessageListFetchErrorHandler = _ts_decorate([
    (0, _common.Injectable)()
], ImapMessageListFetchErrorHandler);

//# sourceMappingURL=imap-message-list-fetch-error-handler.service.js.map