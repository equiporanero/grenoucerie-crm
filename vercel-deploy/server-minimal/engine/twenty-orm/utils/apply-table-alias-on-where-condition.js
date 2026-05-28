"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyTableAliasOnWhereCondition", {
    enumerable: true,
    get: function() {
        return applyTableAliasOnWhereCondition;
    }
});
const _guards = require("@sniptt/guards");
const applyTableAliasOnWhereCondition = ({ condition, tableName, aliasName })=>{
    if ((0, _guards.isString)(condition)) {
        const conditionParts = condition.split('.');
        if (conditionParts.length === 1) {
            return condition;
        }
        const [tableNamePart, ...rest] = conditionParts;
        return `${tableNamePart.replace(aliasName, tableName)}.${rest.join('.')}`;
    }
    if ((0, _guards.isArray)(condition)) {
        return condition.map((where)=>{
            return {
                ...where,
                condition: applyTableAliasOnWhereCondition({
                    condition: where.condition,
                    tableName,
                    aliasName
                })
            };
        });
    }
    if ((0, _guards.isObject)(condition)) {
        if ('condition' in condition) {
            return {
                ...condition,
                condition: applyTableAliasOnWhereCondition({
                    condition: condition.condition,
                    tableName,
                    aliasName
                })
            };
        }
        if ('operator' in condition) {
            return condition;
        }
    }
    return condition;
};

//# sourceMappingURL=apply-table-alias-on-where-condition.js.map