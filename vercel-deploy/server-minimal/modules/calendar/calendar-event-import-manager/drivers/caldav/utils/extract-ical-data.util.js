"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractICalData", {
    enumerable: true,
    get: function() {
        return extractICalData;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const extractICalData = (calendarData)=>{
    if (!(0, _utils.isDefined)(calendarData)) return null;
    if ((0, _guards.isString)(calendarData) && calendarData.includes('VCALENDAR')) {
        return calendarData;
    }
    if (typeof calendarData === 'object') {
        for (const value of Object.values(calendarData)){
            const result = extractICalData(value);
            if ((0, _utils.isDefined)(result)) return result;
        }
    }
    return null;
};

//# sourceMappingURL=extract-ical-data.util.js.map