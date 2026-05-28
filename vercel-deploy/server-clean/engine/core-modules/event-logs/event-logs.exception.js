/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get EventLogsException () {
        return EventLogsException;
    },
    get EventLogsExceptionCode () {
        return EventLogsExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var EventLogsExceptionCode = /*#__PURE__*/ function(EventLogsExceptionCode) {
    EventLogsExceptionCode["CLICKHOUSE_NOT_CONFIGURED"] = "CLICKHOUSE_NOT_CONFIGURED";
    EventLogsExceptionCode["NO_ENTITLEMENT"] = "NO_ENTITLEMENT";
    return EventLogsExceptionCode;
}({});
const getEventLogsExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "CLICKHOUSE_NOT_CONFIGURED":
            return /*i18n*/ {
                id: "PKMDuT",
                message: "Audit logs require ClickHouse to be configured."
            };
        case "NO_ENTITLEMENT":
            return /*i18n*/ {
                id: "aepsXP",
                message: "Audit logs require an Enterprise subscription."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let EventLogsException = class EventLogsException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getEventLogsExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=event-logs.exception.js.map