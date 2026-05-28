"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatResultWithGroupByDimensionValues", {
    enumerable: true,
    get: function() {
        return formatResultWithGroupByDimensionValues;
    }
});
const _core = require("@lingui/core");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _formatresultutil = require("../../../../../../twenty-orm/utils/format-result.util");
const formatResultWithGroupByDimensionValues = async ({ groupsResult, groupByDefinitions, aggregateFieldNames, recordsResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, processRecord })=>{
    const formattedResult = [];
    const recordsByGroupKey = new Map();
    if ((0, _utils.isDefined)(recordsResult)) {
        if (!(0, _utils.isDefined)(flatObjectMetadata) || !(0, _utils.isDefined)(flatObjectMetadataMaps) || !(0, _utils.isDefined)(flatFieldMetadataMaps)) {
            throw new Error('Metadata are required to format result');
        }
        if (!(0, _utils.isDefined)(processRecord)) {
            throw new Error('Process record is required to format results including records');
        }
        for (const entry of recordsResult){
            const groupKey = createGroupKey(entry, groupByDefinitions);
            const records = await Promise.all((entry.records ?? []).map(async (record)=>await processRecord((0, _formatresultutil.formatResult)(record, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps))));
            recordsByGroupKey.set(groupKey, records);
        }
    }
    groupsResult.forEach((group)=>{
        const dimensionValues = [];
        for (const groupByColumn of groupByDefinitions){
            dimensionValues.push(getTranslatedValueIfApplicable(group[groupByColumn.alias], groupByColumn.dateGranularity));
        }
        const aggregateValues = aggregateFieldNames.reduce((acc, fieldName)=>{
            if (fieldName in group) {
                acc[fieldName] = group[fieldName];
            }
            return acc;
        }, {});
        const groupKey = createGroupKey(group, groupByDefinitions);
        const records = recordsByGroupKey.get(groupKey) || [];
        formattedResult.push({
            ...aggregateValues,
            groupByDimensionValues: dimensionValues,
            ...(0, _utils.isDefined)(recordsResult) ? {
                records
            } : {}
        });
    });
    return formattedResult;
};
const createGroupKey = (group, groupByDefinitions)=>{
    return groupByDefinitions.map((def)=>String(group[def.alias])).join('|');
};
const getTranslatedValueIfApplicable = (value, dateGranularity)=>{
    if (typeof value !== 'string') {
        return value;
    }
    switch(dateGranularity){
        case _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK:
            switch(value){
                case 'Monday':
                    return _core.i18n._(/*i18n*/ {
                        id: "hty0d5",
                        message: "Monday"
                    });
                case 'Tuesday':
                    return _core.i18n._(/*i18n*/ {
                        id: "G3myU+",
                        message: "Tuesday"
                    });
                case 'Wednesday':
                    return _core.i18n._(/*i18n*/ {
                        id: "VAcXNz",
                        message: "Wednesday"
                    });
                case 'Thursday':
                    return _core.i18n._(/*i18n*/ {
                        id: "kkDQ8m",
                        message: "Thursday"
                    });
                case 'Friday':
                    return _core.i18n._(/*i18n*/ {
                        id: "39y5bn",
                        message: "Friday"
                    });
                case 'Saturday':
                    return _core.i18n._(/*i18n*/ {
                        id: "+5kO8P",
                        message: "Saturday"
                    });
                case 'Sunday':
                    return _core.i18n._(/*i18n*/ {
                        id: "DBC3t5",
                        message: "Sunday"
                    });
                default:
                    return value;
            }
        case _types.ObjectRecordGroupByDateGranularity.MONTH_OF_THE_YEAR:
            switch(value){
                case 'January':
                    return _core.i18n._(/*i18n*/ {
                        id: "rjyWPb",
                        message: "January"
                    });
                case 'February':
                    return _core.i18n._(/*i18n*/ {
                        id: "4lgLew",
                        message: "February"
                    });
                case 'March':
                    return _core.i18n._(/*i18n*/ {
                        id: "hg6l4j",
                        message: "March"
                    });
                case 'April':
                    return _core.i18n._(/*i18n*/ {
                        id: "naCW6Z",
                        message: "April"
                    });
                case 'May':
                    return _core.i18n._(/*i18n*/ {
                        id: "3JzsDb",
                        message: "May"
                    });
                case 'June':
                    return _core.i18n._(/*i18n*/ {
                        id: "zeEQd/",
                        message: "June"
                    });
                case 'July':
                    return _core.i18n._(/*i18n*/ {
                        id: "u4ex5r",
                        message: "July"
                    });
                case 'August':
                    return _core.i18n._(/*i18n*/ {
                        id: "DBHTm/",
                        message: "August"
                    });
                case 'September':
                    return _core.i18n._(/*i18n*/ {
                        id: "hgvbYY",
                        message: "September"
                    });
                case 'October':
                    return _core.i18n._(/*i18n*/ {
                        id: "dzQfDY",
                        message: "October"
                    });
                case 'November':
                    return _core.i18n._(/*i18n*/ {
                        id: "t9QlBd",
                        message: "November"
                    });
                case 'December':
                    return _core.i18n._(/*i18n*/ {
                        id: "r6zgGo",
                        message: "December"
                    });
                default:
                    return value;
            }
        default:
            return value;
    }
};

//# sourceMappingURL=format-result-with-group-by-dimension-values.util.js.map