"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftNetworkErrorHandler", {
    enumerable: true,
    get: function() {
        return MicrosoftNetworkErrorHandler;
    }
});
const _common = require("@nestjs/common");
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _istemporaryerrorutils = require("../utils/is-temporary-error.utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MicrosoftNetworkErrorHandler = class MicrosoftNetworkErrorHandler {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    handleError(error) {
        const isBodyString = error.body && typeof error.body === 'string';
        const isTemporaryError = isBodyString && (0, _istemporaryerrorutils.isMicrosoftClientTemporaryError)(error.body);
        if (isTemporaryError) {
            return new _messageimportdriverexception.MessageImportDriverException(`code: ${error.code} - body: ${error.body}`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
                cause: error
            });
        }
        return null;
    }
    constructor(){
        this.logger = new _common.Logger(MicrosoftNetworkErrorHandler.name);
    }
};
MicrosoftNetworkErrorHandler = _ts_decorate([
    (0, _common.Injectable)()
], MicrosoftNetworkErrorHandler);

//# sourceMappingURL=microsoft-network-error-handler.service.js.map