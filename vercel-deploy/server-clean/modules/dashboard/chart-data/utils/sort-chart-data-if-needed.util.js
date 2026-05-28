"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sortChartDataIfNeeded", {
    enumerable: true,
    get: function() {
        return sortChartDataIfNeeded;
    }
});
const _utils = require("twenty-shared/utils");
const _graphorderbyenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _comparedimensionvaluesutil = require("./compare-dimension-values.util");
const _sortbymanualorderutil = require("./sort-by-manual-order.util");
const _sortbyselectoptionpositionutil = require("./sort-by-select-option-position.util");
const sortChartDataIfNeeded = ({ data, orderBy, manualSortOrder, formattedToRawLookup, getFieldValue, getNumericValue, selectFieldOptions, fieldType, subFieldName, dateGranularity })=>{
    if (!(0, _utils.isDefined)(orderBy)) {
        return data;
    }
    switch(orderBy){
        case _graphorderbyenum.GraphOrderBy.MANUAL:
            {
                if (!(0, _utils.isDefined)(manualSortOrder)) {
                    return data;
                }
                return (0, _sortbymanualorderutil.sortByManualOrder)({
                    items: data,
                    manualSortOrder,
                    getRawValue: (item)=>{
                        const formatted = getFieldValue(item);
                        const raw = formattedToRawLookup.get(formatted);
                        return (0, _utils.isDefined)(raw) ? String(raw) : formatted;
                    }
                });
            }
        case _graphorderbyenum.GraphOrderBy.VALUE_ASC:
            return [
                ...data
            ].sort((a, b)=>getNumericValue(a) - getNumericValue(b));
        case _graphorderbyenum.GraphOrderBy.VALUE_DESC:
            return [
                ...data
            ].sort((a, b)=>getNumericValue(b) - getNumericValue(a));
        case _graphorderbyenum.GraphOrderBy.FIELD_ASC:
        case _graphorderbyenum.GraphOrderBy.FIELD_DESC:
            return [
                ...data
            ].sort((a, b)=>{
                const formattedValueA = getFieldValue(a);
                const formattedValueB = getFieldValue(b);
                return (0, _comparedimensionvaluesutil.compareDimensionValues)({
                    rawValueA: formattedToRawLookup.get(formattedValueA),
                    rawValueB: formattedToRawLookup.get(formattedValueB),
                    formattedValueA,
                    formattedValueB,
                    direction: orderBy === _graphorderbyenum.GraphOrderBy.FIELD_ASC ? 'ASC' : 'DESC',
                    fieldType,
                    subFieldName,
                    dateGranularity
                });
            });
        case _graphorderbyenum.GraphOrderBy.FIELD_POSITION_ASC:
            if (!(0, _utils.isDefined)(selectFieldOptions) || selectFieldOptions.length === 0) {
                return data;
            }
            return (0, _sortbyselectoptionpositionutil.sortBySelectOptionPosition)({
                items: data,
                options: selectFieldOptions,
                formattedToRawLookup,
                getFormattedValue: getFieldValue,
                direction: 'ASC'
            });
        case _graphorderbyenum.GraphOrderBy.FIELD_POSITION_DESC:
            if (!(0, _utils.isDefined)(selectFieldOptions) || selectFieldOptions.length === 0) {
                return data;
            }
            return (0, _sortbyselectoptionpositionutil.sortBySelectOptionPosition)({
                items: data,
                options: selectFieldOptions,
                formattedToRawLookup,
                getFormattedValue: getFieldValue,
                direction: 'DESC'
            });
        default:
            return data;
    }
};

//# sourceMappingURL=sort-chart-data-if-needed.util.js.map