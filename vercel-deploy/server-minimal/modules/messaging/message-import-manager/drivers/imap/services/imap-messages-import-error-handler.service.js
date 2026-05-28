"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapMessagesImportErrorHandler", {
    enumerable: true,
    get: function() {
        return ImapMessagesImportErrorHandler;
    }
});
const _common = require("@nestjs/common");
const _parseimapmessagesimporterrorutil = require("../utils/parse-imap-messages-import-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ImapMessagesImportErrorHandler = class ImapMessagesImportErrorHandler {
    handleError(error, messageExternalId) {
        this.logger.error(`IMAP: Error importing message ${messageExternalId}: ${JSON.stringify(error)}`);
        throw (0, _parseimapmessagesimporterrorutil.parseImapMessagesImportError)(error, messageExternalId, {
            cause: error
        });
    }
    constructor(){
        this.logger = new _common.Logger(ImapMessagesImportErrorHandler.name);
    }
};
ImapMessagesImportErrorHandler = _ts_decorate([
    (0, _common.Injectable)()
], ImapMessagesImportErrorHandler);

//# sourceMappingURL=imap-messages-import-error-handler.service.js.map