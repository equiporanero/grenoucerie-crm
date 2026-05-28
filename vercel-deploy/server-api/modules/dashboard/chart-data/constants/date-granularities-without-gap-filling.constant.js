"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DATE_GRANULARITIES_WITHOUT_GAP_FILLING", {
    enumerable: true,
    get: function() {
        return DATE_GRANULARITIES_WITHOUT_GAP_FILLING;
    }
});
const _types = require("twenty-shared/types");
const DATE_GRANULARITIES_WITHOUT_GAP_FILLING = new Set([
    _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK,
    _types.ObjectRecordGroupByDateGranularity.MONTH_OF_THE_YEAR,
    _types.ObjectRecordGroupByDateGranularity.QUARTER_OF_THE_YEAR,
    _types.ObjectRecordGroupByDateGranularity.NONE
]);

//# sourceMappingURL=date-granularities-without-gap-filling.constant.js.map