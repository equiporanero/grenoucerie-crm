"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "compareDimensionValues", {
    enumerable: true,
    get: function() {
        return compareDimensionValues;
    }
});
const _temporalpolyfill = require("temporal-polyfill");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _iscyclicaldategranularityutil = require("./is-cyclical-date-granularity.util");
const parseDate = (rawValue)=>{
    if (!(0, _utils.isDefined)(rawValue)) {
        return null;
    }
    const stringValue = String(rawValue);
    return _temporalpolyfill.Temporal.PlainDate.from(stringValue);
};
const compareDimensionValues = ({ rawValueA, rawValueB, formattedValueA, formattedValueB, direction, fieldType, subFieldName, dateGranularity })=>{
    const applyDirection = (comparison)=>direction === 'ASC' ? comparison : -comparison;
    if ((0, _utils.isDefined)(fieldType)) {
        if ((0, _utils.isFieldMetadataDateKind)(fieldType)) {
            if ((0, _iscyclicaldategranularityutil.isCyclicalDateGranularity)(dateGranularity)) {
                return 0;
            }
            const dateA = parseDate(rawValueA);
            const dateB = parseDate(rawValueB);
            if ((0, _utils.isDefined)(dateA) && (0, _utils.isDefined)(dateB)) {
                return applyDirection(_temporalpolyfill.Temporal.PlainDate.compare(dateA, dateB));
            }
        }
        if (fieldType === _types.FieldMetadataType.CURRENCY) {
            if (subFieldName === 'amountMicros') {
                if ((0, _utils.isDefined)(rawValueA) && (0, _utils.isDefined)(rawValueB)) {
                    return applyDirection(Number(rawValueA) - Number(rawValueB));
                }
            }
            return applyDirection(formattedValueA.localeCompare(formattedValueB));
        }
        if ((0, _utils.isFieldMetadataNumericKind)(fieldType)) {
            if ((0, _utils.isDefined)(rawValueA) && (0, _utils.isDefined)(rawValueB)) {
                return applyDirection(Number(rawValueA) - Number(rawValueB));
            }
        }
    }
    return applyDirection(formattedValueA.localeCompare(formattedValueB));
};

//# sourceMappingURL=compare-dimension-values.util.js.map