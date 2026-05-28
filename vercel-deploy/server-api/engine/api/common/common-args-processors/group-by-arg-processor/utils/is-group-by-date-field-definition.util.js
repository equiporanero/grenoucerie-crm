"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isGroupByDateFieldDefinition", {
    enumerable: true,
    get: function() {
        return isGroupByDateFieldDefinition;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const GROUP_BY_DATE_GRANULARITIES = new Set(Object.values(_types.ObjectRecordGroupByDateGranularity));
const isGroupByDateFieldDefinition = (fieldGroupByDefinition)=>{
    if (!(0, _utils.isPlainObject)(fieldGroupByDefinition)) {
        return false;
    }
    if (!('granularity' in fieldGroupByDefinition)) {
        return false;
    }
    const granularity = fieldGroupByDefinition.granularity;
    return typeof granularity === 'string' && GROUP_BY_DATE_GRANULARITIES.has(granularity);
};

//# sourceMappingURL=is-group-by-date-field-definition.util.js.map