"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeCalendarEvent", {
    enumerable: true,
    get: function() {
        return sanitizeCalendarEvent;
    }
});
const _utils = require("twenty-shared/utils");
const sanitizeCalendarEvent = (event, propertiesToSanitize)=>{
    const sanitizedEvent = {
        ...event
    };
    for (const property of propertiesToSanitize){
        if (!(0, _utils.isDefined)(sanitizedEvent[property])) {
            continue;
        }
        if (typeof sanitizedEvent[property] !== 'string') {
            continue;
        }
        sanitizedEvent[property] = sanitizeString(sanitizedEvent[property]);
    }
    return sanitizedEvent;
};
const sanitizeString = (value)=>{
    return value.replace('\u0000', '').replace('\x00', '').replace('\x7f', '');
};

//# sourceMappingURL=sanitizeCalendarEvent.js.map