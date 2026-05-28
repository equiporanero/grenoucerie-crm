"use strict";
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
    get CalendarEventImportException () {
        return CalendarEventImportException;
    },
    get CalendarEventImportExceptionCode () {
        return CalendarEventImportExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var CalendarEventImportExceptionCode = /*#__PURE__*/ function(CalendarEventImportExceptionCode) {
    CalendarEventImportExceptionCode["PROVIDER_NOT_SUPPORTED"] = "PROVIDER_NOT_SUPPORTED";
    CalendarEventImportExceptionCode["UNKNOWN"] = "UNKNOWN";
    return CalendarEventImportExceptionCode;
}({});
const getCalendarEventImportExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "PROVIDER_NOT_SUPPORTED":
            return /*i18n*/ {
                id: "GtrALl",
                message: "Calendar provider is not supported."
            };
        case "UNKNOWN":
            return /*i18n*/ {
                id: "q8ZbjA",
                message: "An unknown calendar error occurred."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let CalendarEventImportException = class CalendarEventImportException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getCalendarEventImportExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=calendar-event-import.exception.js.map