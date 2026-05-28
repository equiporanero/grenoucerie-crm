"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectRecordGroupByDateGranularity", {
    enumerable: true,
    get: function() {
        return _types.ObjectRecordGroupByDateGranularity;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
(0, _graphql.registerEnumType)(_types.ObjectRecordGroupByDateGranularity, {
    name: 'ObjectRecordGroupByDateGranularity',
    description: 'Date granularity options (e.g. DAY, MONTH, QUARTER, YEAR, WEEK, DAY_OF_THE_WEEK, MONTH_OF_THE_YEAR, QUARTER_OF_THE_YEAR)'
});

//# sourceMappingURL=date-granularity.enum.js.map