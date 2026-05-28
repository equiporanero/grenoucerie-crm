"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get fillDateGaps () {
        return fillDateGaps;
    },
    get fillDateGapsTwoDimensional () {
        return fillDateGapsTwoDimensional;
    }
});
const _temporalpolyfill = require("temporal-polyfill");
const _utils = require("twenty-shared/utils");
const _dategranularitieswithoutgapfillingconstant = require("../constants/date-granularities-without-gap-filling.constant");
const _generatedategroupsinrangeutil = require("./generate-date-groups-in-range.util");
const fillDateGaps = ({ data, dateGranularity, isDescOrder = false })=>{
    if (data.length === 0) {
        return {
            data,
            wasTruncated: false
        };
    }
    if (!(0, _utils.isDefined)(dateGranularity) || _dategranularitieswithoutgapfillingconstant.DATE_GRANULARITIES_WITHOUT_GAP_FILLING.has(dateGranularity)) {
        return {
            data,
            wasTruncated: false
        };
    }
    const existingDateGroupsMap = new Map();
    const parsedDates = [];
    for (const item of data){
        const dateValue = item.groupByDimensionValues?.[0];
        if (!(0, _utils.isDefined)(dateValue)) {
            continue;
        }
        const parsedDate = _temporalpolyfill.Temporal.PlainDate.from(String(dateValue));
        parsedDates.push(parsedDate);
        existingDateGroupsMap.set(parsedDate.toString(), item);
    }
    if (parsedDates.length === 0) {
        return {
            data,
            wasTruncated: false
        };
    }
    const sortedPlainDates = [
        ...parsedDates
    ].sort((0, _utils.sortPlainDate)('asc'));
    const minDate = sortedPlainDates[0];
    const maxDate = sortedPlainDates[sortedPlainDates.length - 1];
    if (!(0, _utils.isDefined)(minDate) || !(0, _utils.isDefined)(maxDate)) {
        return {
            data,
            wasTruncated: false
        };
    }
    const { dates: allDates, wasTruncated } = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
        startDate: minDate,
        endDate: maxDate,
        granularity: dateGranularity
    });
    const orderedDates = isDescOrder ? [
        ...allDates
    ].reverse() : allDates;
    const filledData = orderedDates.map((date)=>{
        const key = date.toString();
        const existingDateGroup = existingDateGroupsMap.get(key);
        if ((0, _utils.isDefined)(existingDateGroup)) {
            return existingDateGroup;
        }
        return {
            groupByDimensionValues: [
                date.toString()
            ],
            aggregateValue: 0
        };
    });
    return {
        data: filledData,
        wasTruncated
    };
};
const fillDateGapsTwoDimensional = ({ data, dateGranularity, isDescOrder = false })=>{
    if (data.length === 0) {
        return {
            data,
            wasTruncated: false
        };
    }
    if (!(0, _utils.isDefined)(dateGranularity) || _dategranularitieswithoutgapfillingconstant.DATE_GRANULARITIES_WITHOUT_GAP_FILLING.has(dateGranularity)) {
        return {
            data,
            wasTruncated: false
        };
    }
    const existingDateGroupsMap = new Map();
    const parsedDates = [];
    const uniqueSecondDimensionValues = new Set();
    for (const item of data){
        const dateValue = item.groupByDimensionValues?.[0];
        if (!(0, _utils.isDefined)(dateValue)) {
            continue;
        }
        const parsedDate = _temporalpolyfill.Temporal.PlainDate.from(String(dateValue));
        parsedDates.push(parsedDate);
        const secondDimensionValue = item.groupByDimensionValues?.[1] ?? null;
        uniqueSecondDimensionValues.add(secondDimensionValue);
        const key = `${parsedDate.toString()}_${String(secondDimensionValue)}`;
        existingDateGroupsMap.set(key, item);
    }
    if (parsedDates.length === 0) {
        return {
            data,
            wasTruncated: false
        };
    }
    const sortedPlainDates = [
        ...parsedDates
    ].sort((0, _utils.sortPlainDate)('asc'));
    const minDate = sortedPlainDates[0];
    const maxDate = sortedPlainDates[sortedPlainDates.length - 1];
    if (!(0, _utils.isDefined)(minDate) || !(0, _utils.isDefined)(maxDate)) {
        return {
            data,
            wasTruncated: false
        };
    }
    const { dates: allDates, wasTruncated } = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
        startDate: minDate,
        endDate: maxDate,
        granularity: dateGranularity
    });
    const orderedDates = isDescOrder ? [
        ...allDates
    ].reverse() : allDates;
    const filledData = orderedDates.flatMap((date)=>Array.from(uniqueSecondDimensionValues).map((secondDimensionValue)=>{
            const key = `${date.toString()}_${String(secondDimensionValue)}`;
            const existingDateGroup = existingDateGroupsMap.get(key);
            if ((0, _utils.isDefined)(existingDateGroup)) {
                return existingDateGroup;
            }
            return {
                groupByDimensionValues: [
                    date.toString(),
                    secondDimensionValue
                ],
                aggregateValue: 0
            };
        }));
    return {
        data: filledData,
        wasTruncated
    };
};

//# sourceMappingURL=fill-date-gaps.util.js.map