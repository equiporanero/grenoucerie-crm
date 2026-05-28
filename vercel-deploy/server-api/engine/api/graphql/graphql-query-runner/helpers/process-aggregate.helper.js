"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProcessAggregateHelper", {
    enumerable: true,
    get: function() {
        return ProcessAggregateHelper;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _formatcolumnnamesfromcompositefieldandsubfieldutil = require("../../../../twenty-orm/utils/format-column-names-from-composite-field-and-subfield.util");
let ProcessAggregateHelper = class ProcessAggregateHelper {
};
ProcessAggregateHelper.addSelectedAggregatedFieldsQueriesToQueryBuilder = ({ selectedAggregatedFields, queryBuilder, objectMetadataNameSingular })=>{
    queryBuilder.select([]);
    for (const [aggregatedFieldName, aggregatedField] of Object.entries(selectedAggregatedFields)){
        const aggregateExpression = ProcessAggregateHelper.getAggregateExpression(aggregatedField, objectMetadataNameSingular);
        if (!(0, _utils.isDefined)(aggregateExpression)) {
            continue;
        }
        queryBuilder.addSelect(aggregateExpression, aggregatedFieldName);
    }
};
ProcessAggregateHelper.extractColumnNamesFromAggregateExpression = (selection)=>{
    // Match content between CONCAT(" and ") - handle multiple columns
    const concatMatches = selection.match(/CONCAT\("([^"]+)"(?:,"([^"]+)")*\)/g);
    if (concatMatches) {
        // Extract all column names between quotes after CONCAT
        const columnNames = selection.match(/"([^"]+)"/g)?.map((match)=>{
            const fullColumn = match.slice(1, -1);
            // If there's a dot, extract only the column name (part after the dot)
            const parts = fullColumn.split('.');
            return parts[parts.length - 1];
        });
        return columnNames || null;
    }
    // For non-CONCAT expressions, match table.column pattern within quotes
    // Look for patterns like "table"."column" and extract only the column part
    const tableColumnMatches = selection.match(/"[^"]+"\."([^"]+)"/g);
    if (tableColumnMatches) {
        const columnNames = tableColumnMatches.map((match)=>{
            // Extract the column name from "table"."column" pattern
            const columnMatch = match.match(/"[^"]+"\."([^"]+)"/);
            return columnMatch ? columnMatch[1] : null;
        }).filter(Boolean);
        return columnNames.length > 0 ? columnNames.filter((c)=>(0, _utils.isDefined)(c)) : null;
    }
    // Fallback: match single quoted content that doesn't contain dots
    const singleColumnMatch = selection.match(/"([^".]+)"/);
    if (singleColumnMatch) {
        return [
            singleColumnMatch[1]
        ];
    }
    return null;
};
ProcessAggregateHelper.getAggregateExpression = (aggregatedField, objectMetadataNameSingular)=>{
    if (!(0, _utils.isDefined)(aggregatedField?.fromField) || !(0, _utils.isDefined)(aggregatedField?.aggregateOperation)) {
        return;
    }
    const columnNames = (0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)(aggregatedField.fromField, aggregatedField.fromSubFields);
    const columnNameForNumericOperation = (0, _utils.isDefined)(aggregatedField.subFieldForNumericOperation) ? (0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)(aggregatedField.fromField, [
        aggregatedField.subFieldForNumericOperation
    ])[0] : columnNames[0];
    if (!Object.values(_types.AggregateOperations).includes(aggregatedField.aggregateOperation)) {
        return;
    }
    const concatenatedColumns = columnNames.map((col)=>`"${objectMetadataNameSingular}"."${col}"`).join(',');
    const columnExpression = `NULLIF(CONCAT(${concatenatedColumns}), '')`;
    switch(aggregatedField.aggregateOperation){
        case _types.AggregateOperations.COUNT_EMPTY:
            return `CASE WHEN COUNT(*) = 0 THEN NULL ELSE COUNT(*) - COUNT(${columnExpression}) END`;
        case _types.AggregateOperations.COUNT_NOT_EMPTY:
            return `CASE WHEN COUNT(*) = 0 THEN NULL ELSE COUNT(${columnExpression}) END`;
        case _types.AggregateOperations.COUNT_UNIQUE_VALUES:
            return `CASE WHEN COUNT(*) = 0 THEN NULL ELSE COUNT(DISTINCT ${columnExpression}) END`;
        case _types.AggregateOperations.PERCENTAGE_EMPTY:
            return `CASE WHEN COUNT(*) = 0 THEN NULL ELSE CAST(((COUNT(*) - COUNT(${columnExpression})::decimal) / COUNT(*)) AS DECIMAL) END`;
        case _types.AggregateOperations.PERCENTAGE_NOT_EMPTY:
            return `CASE WHEN COUNT(*) = 0 THEN NULL ELSE CAST((COUNT(${columnExpression})::decimal / COUNT(*)) AS DECIMAL) END`;
        case _types.AggregateOperations.COUNT_TRUE:
            return `CASE WHEN COUNT(*) = 0 THEN NULL ELSE COUNT(CASE WHEN ${columnExpression}::boolean = TRUE THEN 1 ELSE NULL END) END`;
        case _types.AggregateOperations.COUNT_FALSE:
            return `CASE WHEN COUNT(*) = 0 THEN NULL ELSE COUNT(CASE WHEN ${columnExpression}::boolean = FALSE THEN 1 ELSE NULL END) END`;
        default:
            {
                return `${aggregatedField.aggregateOperation}("${objectMetadataNameSingular}"."${columnNameForNumericOperation}")`;
            }
    }
};

//# sourceMappingURL=process-aggregate.helper.js.map