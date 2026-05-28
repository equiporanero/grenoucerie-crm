"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isCyclicalDateGranularity", {
    enumerable: true,
    get: function() {
        return isCyclicalDateGranularity;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const isCyclicalDateGranularity = (granularity)=>{
    if (!(0, _utils.isDefined)(granularity)) return false;
    return [
        _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK,
        _types.ObjectRecordGroupByDateGranularity.MONTH_OF_THE_YEAR,
        _types.ObjectRecordGroupByDateGranularity.QUARTER_OF_THE_YEAR
    ].includes(granularity);
};

//# sourceMappingURL=is-cyclical-date-granularity.util.js.map