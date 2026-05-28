"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseGaxiosError", {
    enumerable: true,
    get: function() {
        return parseGaxiosError;
    }
});
const _common = require("@nestjs/common");
const _calendareventimportdriverexception = require("../../exceptions/calendar-event-import-driver.exception");
const _messagenetworkexception = require("../../../../../messaging/message-import-manager/drivers/exceptions/message-network.exception");
const parseGaxiosError = (error)=>{
    const logger = new _common.Logger(parseGaxiosError.name);
    const { code } = error;
    switch(code){
        case _messagenetworkexception.MessageNetworkExceptionCode.ECONNRESET:
        case _messagenetworkexception.MessageNetworkExceptionCode.ENOTFOUND:
        case _messagenetworkexception.MessageNetworkExceptionCode.ECONNABORTED:
        case _messagenetworkexception.MessageNetworkExceptionCode.ETIMEDOUT:
        case _messagenetworkexception.MessageNetworkExceptionCode.ERR_NETWORK:
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(error.message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.TEMPORARY_ERROR);
        default:
            logger.error(error);
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(error.message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN_NETWORK_ERROR);
    }
};

//# sourceMappingURL=parse-gaxios-error.util.js.map