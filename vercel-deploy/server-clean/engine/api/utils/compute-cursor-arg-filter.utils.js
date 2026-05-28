"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCursorArgFilter", {
    enumerable: true,
    get: function() {
        return computeCursorArgFilter;
    }
});
const _utils = require("twenty-shared/utils");
const _buildcursorcumulativewhereconditionsutils = require("./build-cursor-cumulative-where-conditions.utils");
const _buildcursorwhereconditionutils = require("./build-cursor-where-condition.utils");
const computeCursorArgFilter = (cursor, orderBy, flatObjectMetadata, flatFieldMetadataMaps, isForwardPagination = true)=>{
    const cursorEntries = Object.entries(cursor).map(([key, value])=>{
        if (value === undefined) {
            return null;
        }
        return {
            [key]: value
        };
    }).filter(_utils.isDefined);
    if (cursorEntries.length === 0) {
        return [];
    }
    return (0, _buildcursorcumulativewhereconditionsutils.buildCursorCumulativeWhereCondition)({
        cursorEntries,
        buildEqualityCondition: ({ cursorKey, cursorValue })=>(0, _buildcursorwhereconditionutils.buildCursorWhereCondition)({
                cursorKey,
                cursorValue,
                flatObjectMetadata,
                flatFieldMetadataMaps,
                orderBy,
                isForwardPagination: true,
                isEqualityCondition: true
            }),
        buildMainCondition: ({ cursorKey, cursorValue })=>(0, _buildcursorwhereconditionutils.buildCursorWhereCondition)({
                cursorKey,
                cursorValue,
                flatObjectMetadata,
                flatFieldMetadataMaps,
                orderBy,
                isForwardPagination
            })
    });
};

//# sourceMappingURL=compute-cursor-arg-filter.utils.js.map