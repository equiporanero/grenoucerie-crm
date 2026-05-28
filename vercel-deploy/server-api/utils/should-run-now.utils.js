"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldRunNow", {
    enumerable: true,
    get: function() {
        return shouldRunNow;
    }
});
const _cronparser = require("cron-parser");
const shouldRunNow = (pattern, now, rootCronIntervalMs = 60_000)=>{
    try {
        const interval = _cronparser.CronExpressionParser.parse(pattern, {
            currentDate: now
        });
        const prevTriggerDate = interval.prev();
        const diff = Math.abs(prevTriggerDate.getTime() - now.getTime());
        return diff < rootCronIntervalMs;
    } catch  {
        return false;
    }
};

//# sourceMappingURL=should-run-now.utils.js.map