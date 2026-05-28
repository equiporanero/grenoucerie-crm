"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createSqlWhereTupleInClause", {
    enumerable: true,
    get: function() {
        return createSqlWhereTupleInClause;
    }
});
const createSqlWhereTupleInClause = (conditions, tableName)=>{
    const fieldNames = conditions[0].map(([field, _])=>field);
    const tupleClause = fieldNames.map((field)=>`"${tableName}"."${field}"`).join(', ');
    const valuePlaceholders = conditions.map((_, index)=>{
        const placeholders = fieldNames.map((_, fieldIndex)=>`:value${index}_${fieldIndex}`);
        return `(${placeholders.join(', ')})`;
    }).join(', ');
    const clause = `(${tupleClause}) IN (${valuePlaceholders})`;
    const parameters = {};
    conditions.forEach((condition, conditionIndex)=>{
        condition.forEach(([_, value], fieldIndex)=>{
            parameters[`value${conditionIndex}_${fieldIndex}`] = value;
        });
    });
    return {
        clause,
        parameters
    };
};

//# sourceMappingURL=create-sql-where-tuple-in-clause.utils.js.map