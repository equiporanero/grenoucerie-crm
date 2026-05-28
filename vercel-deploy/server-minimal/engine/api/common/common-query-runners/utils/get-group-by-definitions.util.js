"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getGroupByDefinitions", {
    enumerable: true,
    get: function() {
        return getGroupByDefinitions;
    }
});
const _getgroupbyexpressionutil = require("./get-group-by-expression.util");
const _isgroupbydatefieldutil = require("./is-group-by-date-field.util");
const _isgroupbyrelationfieldutil = require("./is-group-by-relation-field.util");
const _removequoteutil = require("./remove-quote.util");
const _formatcolumnnamesfromcompositefieldandsubfieldutil = require("../../../../twenty-orm/utils/format-column-names-from-composite-field-and-subfield.util");
const getGroupByDefinitions = ({ groupByFields, objectMetadataNameSingular })=>{
    return groupByFields.map((groupByField)=>{
        let columnName;
        let columnNameWithQuotes;
        if ((0, _isgroupbyrelationfieldutil.isGroupByRelationField)(groupByField)) {
            const joinAlias = groupByField.fieldMetadata.name;
            const nestedColumnName = (0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)(groupByField.nestedFieldMetadata.name, groupByField.nestedSubFieldName ? [
                groupByField.nestedSubFieldName
            ] : undefined)[0];
            columnNameWithQuotes = `"${joinAlias}"."${nestedColumnName}"`;
        } else {
            columnName = (0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)(groupByField.fieldMetadata.name, groupByField.subFieldName ? [
                groupByField.subFieldName
            ] : undefined)[0];
            columnNameWithQuotes = `"${objectMetadataNameSingular}"."${columnName}"`;
        }
        const isGroupByDateFieldOrTargetField = (0, _isgroupbydatefieldutil.isGroupByDateField)(groupByField) || (0, _isgroupbyrelationfieldutil.isGroupByRelationField)(groupByField) && groupByField.dateGranularity;
        const alias = (0, _removequoteutil.formatColumnNameAsAlias)(columnNameWithQuotes) + (isGroupByDateFieldOrTargetField ? `_${groupByField.dateGranularity}` : '');
        return {
            columnNameWithQuotes,
            expression: (0, _getgroupbyexpressionutil.getGroupByExpression)({
                groupByField,
                columnNameWithQuotes
            }),
            alias,
            dateGranularity: isGroupByDateFieldOrTargetField ? groupByField.dateGranularity : undefined
        };
    });
};

//# sourceMappingURL=get-group-by-definitions.util.js.map