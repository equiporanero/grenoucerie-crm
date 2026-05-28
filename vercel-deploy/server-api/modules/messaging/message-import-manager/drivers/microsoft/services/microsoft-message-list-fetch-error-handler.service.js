"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftMessageListFetchErrorHandler", {
    enumerable: true,
    get: function() {
        return MicrosoftMessageListFetchErrorHandler;
    }
});
const _common = require("@nestjs/common");
const _microsoftnetworkerrorhandlerservice = require("./microsoft-network-error-handler.service");
const _parsemicrosoftmessagesimportutil = require("../utils/parse-microsoft-messages-import.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MicrosoftMessageListFetchErrorHandler = class MicrosoftMessageListFetchErrorHandler {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    handleError(error) {
        this.logger.error(`Error fetching message list: ${JSON.stringify(error)}`);
        const networkError = this.microsoftNetworkErrorHandler.handleError(error);
        if (networkError) {
            throw networkError;
        }
        throw (0, _parsemicrosoftmessagesimportutil.parseMicrosoftMessagesImportError)(error, {
            cause: error
        });
    }
    constructor(microsoftNetworkErrorHandler){
        this.microsoftNetworkErrorHandler = microsoftNetworkErrorHandler;
        this.logger = new _common.Logger(MicrosoftMessageListFetchErrorHandler.name);
    }
};
MicrosoftMessageListFetchErrorHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _microsoftnetworkerrorhandlerservice.MicrosoftNetworkErrorHandler === "undefined" ? Object : _microsoftnetworkerrorhandlerservice.MicrosoftNetworkErrorHandler
    ])
], MicrosoftMessageListFetchErrorHandler);

//# sourceMappingURL=microsoft-message-list-fetch-error-handler.service.js.map