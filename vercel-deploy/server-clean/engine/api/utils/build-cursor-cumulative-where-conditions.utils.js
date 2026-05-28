"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCursorCumulativeWhereCondition", {
    enumerable: true,
    get: function() {
        return buildCursorCumulativeWhereCondition;
    }
});
const buildCursorCumulativeWhereCondition = ({ cursorEntries, buildEqualityCondition, buildMainCondition })=>{
    return cursorEntries.map((cursorEntry, index)=>{
        const [currentCursorKey, currentCursorValue] = Object.entries(cursorEntry)[0];
        const andConditions = [];
        for(let subConditionIndex = 0; subConditionIndex < index; subConditionIndex++){
            const previousCursorEntry = cursorEntries[subConditionIndex];
            const [previousCursorKey, previousCursorValue] = Object.entries(previousCursorEntry)[0];
            andConditions.push(buildEqualityCondition({
                cursorKey: previousCursorKey,
                cursorValue: previousCursorValue
            }));
        }
        andConditions.push(buildMainCondition({
            cursorKey: currentCursorKey,
            cursorValue: currentCursorValue
        }));
        if (andConditions.length === 1) {
            return andConditions[0];
        }
        return {
            and: andConditions
        };
    });
};

//# sourceMappingURL=build-cursor-cumulative-where-conditions.utils.js.map