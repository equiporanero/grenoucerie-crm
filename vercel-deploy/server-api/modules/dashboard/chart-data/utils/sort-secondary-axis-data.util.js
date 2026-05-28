"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sortSecondaryAxisData", {
    enumerable: true,
    get: function() {
        return sortSecondaryAxisData;
    }
});
const _utils = require("twenty-shared/utils");
const _graphorderbyenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _comparedimensionvaluesutil = require("./compare-dimension-values.util");
const _sortbymanualorderutil = require("./sort-by-manual-order.util");
const _sortbyselectoptionpositionutil = require("./sort-by-select-option-position.util");
const sortSecondaryAxisData = ({ items, orderBy, manualSortOrder, formattedToRawLookup, selectFieldOptions, getFormattedValue, getNumericValue, fieldType, subFieldName, dateGranularity })=>{
    if (!(0, _utils.isDefined)(orderBy)) {
        return items;
    }
    switch(orderBy){
        case _graphorderbyenum.GraphOrderBy.FIELD_ASC:
        case _graphorderbyenum.GraphOrderBy.FIELD_DESC:
            return [
                ...items
            ].sort((a, b)=>{
                const formattedValueA = getFormattedValue(a);
                const formattedValueB = getFormattedValue(b);
                return (0, _comparedimensionvaluesutil.compareDimensionValues)({
                    rawValueA: formattedToRawLookup?.get(formattedValueA),
                    rawValueB: formattedToRawLookup?.get(formattedValueB),
                    formattedValueA,
                    formattedValueB,
                    direction: orderBy === _graphorderbyenum.GraphOrderBy.FIELD_ASC ? 'ASC' : 'DESC',
                    fieldType,
                    subFieldName,
                    dateGranularity
                });
            });
        case _graphorderbyenum.GraphOrderBy.VALUE_ASC:
            return [
                ...items
            ].sort((a, b)=>getNumericValue(a) - getNumericValue(b));
        case _graphorderbyenum.GraphOrderBy.VALUE_DESC:
            return [
                ...items
            ].sort((a, b)=>getNumericValue(b) - getNumericValue(a));
        case _graphorderbyenum.GraphOrderBy.FIELD_POSITION_ASC:
        case _graphorderbyenum.GraphOrderBy.FIELD_POSITION_DESC:
            {
                if (!(0, _utils.isDefined)(selectFieldOptions) || selectFieldOptions.length === 0 || !(0, _utils.isDefined)(formattedToRawLookup)) {
                    return items;
                }
                return (0, _sortbyselectoptionpositionutil.sortBySelectOptionPosition)({
                    items,
                    options: selectFieldOptions,
                    formattedToRawLookup,
                    getFormattedValue,
                    direction: orderBy === _graphorderbyenum.GraphOrderBy.FIELD_POSITION_ASC ? 'ASC' : 'DESC'
                });
            }
        case _graphorderbyenum.GraphOrderBy.MANUAL:
            {
                if (!(0, _utils.isDefined)(manualSortOrder)) {
                    return items;
                }
                return (0, _sortbymanualorderutil.sortByManualOrder)({
                    items,
                    manualSortOrder,
                    getRawValue: (item)=>{
                        const formattedValue = getFormattedValue(item);
                        const rawValue = formattedToRawLookup?.get(formattedValue);
                        return (0, _utils.isDefined)(rawValue) ? String(rawValue) : formattedValue;
                    }
                });
            }
        default:
            return items;
    }
};

//# sourceMappingURL=sort-secondary-axis-data.util.js.map