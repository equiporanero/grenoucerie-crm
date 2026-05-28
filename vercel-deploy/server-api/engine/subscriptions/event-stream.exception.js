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
    get EventStreamException () {
        return EventStreamException;
    },
    get EventStreamExceptionCode () {
        return EventStreamExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../utils/custom-exception");
var EventStreamExceptionCode = /*#__PURE__*/ function(EventStreamExceptionCode) {
    EventStreamExceptionCode["EVENT_STREAM_ALREADY_EXISTS"] = "EVENT_STREAM_ALREADY_EXISTS";
    EventStreamExceptionCode["NOT_AUTHORIZED"] = "NOT_AUTHORIZED";
    return EventStreamExceptionCode;
}({});
const getEventStreamExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "EVENT_STREAM_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "ruD0s1",
                message: "Failed to receive real time updates."
            };
        case "NOT_AUTHORIZED":
            return /*i18n*/ {
                id: "chHKg8",
                message: "You are not authorized to perform this action."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let EventStreamException = class EventStreamException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getEventStreamExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=event-stream.exception.js.map