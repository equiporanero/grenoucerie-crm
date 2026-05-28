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
    get CalendarChannelException () {
        return CalendarChannelException;
    },
    get CalendarChannelExceptionCode () {
        return CalendarChannelExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var CalendarChannelExceptionCode = /*#__PURE__*/ function(CalendarChannelExceptionCode) {
    CalendarChannelExceptionCode["CALENDAR_CHANNEL_NOT_FOUND"] = "CALENDAR_CHANNEL_NOT_FOUND";
    CalendarChannelExceptionCode["INVALID_CALENDAR_CHANNEL_INPUT"] = "INVALID_CALENDAR_CHANNEL_INPUT";
    CalendarChannelExceptionCode["CALENDAR_CHANNEL_OWNERSHIP_VIOLATION"] = "CALENDAR_CHANNEL_OWNERSHIP_VIOLATION";
    return CalendarChannelExceptionCode;
}({});
const getCalendarChannelExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "CALENDAR_CHANNEL_NOT_FOUND":
            return /*i18n*/ {
                id: "3J2x1Q",
                message: "Calendar channel not found."
            };
        case "INVALID_CALENDAR_CHANNEL_INPUT":
            return /*i18n*/ {
                id: "cizVEW",
                message: "Invalid calendar channel input."
            };
        case "CALENDAR_CHANNEL_OWNERSHIP_VIOLATION":
            return /*i18n*/ {
                id: "p6uSBj",
                message: "You do not have access to this calendar channel."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let CalendarChannelException = class CalendarChannelException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getCalendarChannelExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=calendar-channel.exception.js.map