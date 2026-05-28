"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildWhereConditions", {
    enumerable: true,
    get: function() {
        return buildWhereConditions;
    }
});
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _getvaluefrompathutil = require("./get-value-from-path.util");
const buildWhereConditions = (records, conflictingFieldGroups)=>{
    const whereConditions = [];
    for (const conflictingProperty of conflictingFieldGroups.flatMap((group)=>group.conflictingProperties)){
        const fieldValues = records.map((record)=>(0, _getvaluefrompathutil.getValueFromPath)(record, conflictingProperty.fullPath)).filter(_utils.isDefined);
        if (fieldValues.length > 0) {
            whereConditions.push({
                [conflictingProperty.column]: (0, _typeorm.In)(fieldValues)
            });
        }
    }
    return whereConditions;
};

//# sourceMappingURL=build-where-conditions.util.js.map