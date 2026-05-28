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
    get fillSelectGaps () {
        return fillSelectGaps;
    },
    get fillSelectGapsTwoDimensional () {
        return fillSelectGapsTwoDimensional;
    }
});
const _utils = require("twenty-shared/utils");
const fillSelectGaps = ({ data, selectOptions })=>{
    if (!(0, _utils.isDefined)(selectOptions) || selectOptions.length === 0 || data.length === 0) {
        return data;
    }
    const existingGroupsMap = new Map();
    for (const item of data){
        const dimensionValue = item.groupByDimensionValues?.[0];
        if ((0, _utils.isDefined)(dimensionValue)) {
            existingGroupsMap.set(String(dimensionValue), item);
        }
    }
    const filledData = selectOptions.map((option)=>{
        const existingGroup = existingGroupsMap.get(option.value);
        if ((0, _utils.isDefined)(existingGroup)) {
            return existingGroup;
        }
        return {
            groupByDimensionValues: [
                option.value
            ],
            aggregateValue: 0
        };
    });
    return filledData;
};
const fillSelectGapsTwoDimensional = ({ data, selectOptions })=>{
    if (!(0, _utils.isDefined)(selectOptions) || selectOptions.length === 0 || data.length === 0) {
        return data;
    }
    const existingGroupsMap = new Map();
    const uniqueSecondDimensionValues = new Set();
    for (const item of data){
        const primaryValue = item.groupByDimensionValues?.[0];
        const secondaryValue = item.groupByDimensionValues?.[1] ?? null;
        if ((0, _utils.isDefined)(primaryValue)) {
            const key = `${String(primaryValue)}_${String(secondaryValue)}`;
            existingGroupsMap.set(key, item);
            uniqueSecondDimensionValues.add(secondaryValue);
        }
    }
    const filledData = selectOptions.flatMap((option)=>Array.from(uniqueSecondDimensionValues).map((secondaryValue)=>{
            const key = `${option.value}_${String(secondaryValue)}`;
            const existingGroup = existingGroupsMap.get(key);
            if ((0, _utils.isDefined)(existingGroup)) {
                return existingGroup;
            }
            return {
                groupByDimensionValues: [
                    option.value,
                    secondaryValue
                ],
                aggregateValue: 0
            };
        }));
    return filledData;
};

//# sourceMappingURL=fill-select-gaps.util.js.map