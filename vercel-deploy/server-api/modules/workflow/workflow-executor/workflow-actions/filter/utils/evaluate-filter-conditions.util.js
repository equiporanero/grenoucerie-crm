"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "evaluateFilterConditions", {
    enumerable: true,
    get: function() {
        return evaluateFilterConditions;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _finddefaultnullequivalentvalueutil = require("./find-default-null-equivalent-value.util");
const _parseandevaluaterelativedatefilterutil = require("./parse-and-evaluate-relative-date-filter.util");
function evaluateFilter(filter) {
    const filterWithConvertedOperand = {
        ...filter,
        operand: (0, _utils.convertViewFilterOperandToCoreOperand)(filter.operand)
    };
    switch(filter.type){
        case 'NUMBER':
        case 'NUMERIC':
        case 'number':
            return evaluateNumberFilter(filterWithConvertedOperand);
        case 'DATE':
        case 'DATE_TIME':
            return evaluateDateFilter(filterWithConvertedOperand);
        case 'TEXT':
        case 'MULTI_SELECT':
        case 'FULL_NAME':
        case 'EMAILS':
        case 'PHONES':
        case 'ADDRESS':
        case 'LINKS':
        case 'ARRAY':
        case 'array':
        case 'RAW_JSON':
            return evaluateTextAndArrayFilter(filterWithConvertedOperand, filter.type, filter.compositeFieldSubFieldName);
        case 'SELECT':
            return evaluateSelectFilter(filterWithConvertedOperand);
        case 'BOOLEAN':
        case 'boolean':
            return evaluateBooleanFilter(filterWithConvertedOperand);
        case 'UUID':
            return evaluateUuidFilter(filterWithConvertedOperand);
        case 'RATING':
            return evaluateRatingFilter(filterWithConvertedOperand);
        case 'RELATION':
            return evaluateRelationFilter(filterWithConvertedOperand);
        case 'CURRENCY':
            return evaluateCurrencyFilter(filterWithConvertedOperand);
        case 'ACTOR':
            return evaluateActorFilter(filterWithConvertedOperand);
        default:
            return evaluateDefaultFilter(filterWithConvertedOperand);
    }
}
function evaluateFilterGroup(groupId, filterGroups, filters) {
    const group = filterGroups.find((g)=>g.id === groupId);
    if (!group) {
        throw new Error(`Filter group with id ${groupId} not found`);
    }
    const childGroups = filterGroups.filter((g)=>g.parentStepFilterGroupId === groupId).sort((a, b)=>(a.positionInStepFilterGroup || 0) - (b.positionInStepFilterGroup || 0));
    const groupFilters = filters.filter((f)=>f.stepFilterGroupId === groupId);
    const filterResults = groupFilters.map((filter)=>evaluateFilter(filter));
    const childGroupResults = childGroups.map((childGroup)=>evaluateFilterGroup(childGroup.id, filterGroups, filters));
    const allResults = [
        ...filterResults,
        ...childGroupResults
    ];
    if (allResults.length === 0) {
        return true;
    }
    switch(group.logicalOperator){
        case 'AND':
            return allResults.every((result)=>result);
        case 'OR':
            return allResults.some((result)=>result);
        default:
            throw new Error(`Unknown logical operator: ${group.logicalOperator}`);
    }
}
function contains(leftValue, rightValue) {
    // if two arrays, check if any item is in the other array
    if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
        return leftValue.some((item)=>rightValue.includes(item));
    }
    if ((Array.isArray(leftValue) || (0, _guards.isString)(leftValue)) && (0, _guards.isString)(rightValue)) {
        try {
            const parsedRightValue = JSON.parse(rightValue);
            if (Array.isArray(parsedRightValue)) {
                return parsedRightValue.some((item)=>leftValue.includes(item));
            } else {
                return leftValue.includes(parsedRightValue);
            }
        } catch  {
            return leftValue.includes(rightValue);
        }
    }
    return String(leftValue).includes(String(rightValue));
}
function evaluateTextAndArrayFilter(filter, filterType, compositeFieldSubFieldName) {
    //TODO : nullEquivalentRightValue to remove once feature flag removed + workflow action based on common api
    const nullEquivalentRightValue = (0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
        value: filter.rightOperand,
        fieldMetadataType: filterType,
        key: compositeFieldSubFieldName
    });
    switch(filter.operand){
        case _types.ViewFilterOperand.CONTAINS:
            return contains(filter.leftOperand, filter.rightOperand) || (0, _utils.isDefined)(nullEquivalentRightValue) && !isNotEmptyTextOrArray(filter.leftOperand);
        case _types.ViewFilterOperand.DOES_NOT_CONTAIN:
            return !contains(filter.leftOperand, filter.rightOperand) || (0, _utils.isDefined)(nullEquivalentRightValue) && isNotEmptyTextOrArray(filter.leftOperand);
        case _types.ViewFilterOperand.IS_EMPTY:
            return !isNotEmptyTextOrArray(filter.leftOperand);
        case _types.ViewFilterOperand.IS_NOT_EMPTY:
            return isNotEmptyTextOrArray(filter.leftOperand);
        default:
            throw new Error(`Operand ${filter.operand} not supported for this filter type`);
    }
}
function isNotEmptyTextOrArray(value) {
    return (0, _guards.isNonEmptyString)(value) || (0, _guards.isNonEmptyArray)(value);
}
function evaluateBooleanFilter(filter) {
    switch(filter.operand){
        case _types.ViewFilterOperand.IS:
            return (0, _workflow.parseBooleanFromStringValue)(filter.leftOperand) === (0, _workflow.parseBooleanFromStringValue)(filter.rightOperand);
        default:
            throw new Error(`Operand ${filter.operand} not supported for boolean filter`);
    }
}
function evaluateDateFilter(filter) {
    // TODO: refactor this with Temporal
    const dateLeftValue = new Date(String(filter.leftOperand));
    switch(filter.operand){
        case _types.ViewFilterOperand.IS:
            return dateLeftValue.getDate() === new Date(String(filter.rightOperand)).getDate();
        case _types.ViewFilterOperand.IS_IN_PAST:
            return dateLeftValue.getTime() < Date.now();
        case _types.ViewFilterOperand.IS_IN_FUTURE:
            return dateLeftValue.getTime() > Date.now();
        case _types.ViewFilterOperand.IS_TODAY:
            return dateLeftValue.toDateString() === new Date().toDateString();
        case _types.ViewFilterOperand.IS_BEFORE:
            return dateLeftValue.getTime() < new Date(String(filter.rightOperand)).getTime();
        case _types.ViewFilterOperand.IS_AFTER:
            return dateLeftValue.getTime() > new Date(String(filter.rightOperand)).getTime();
        case _types.ViewFilterOperand.IS_EMPTY:
            return !(0, _utils.isDefined)(filter.leftOperand) || filter.leftOperand === '';
        case _types.ViewFilterOperand.IS_NOT_EMPTY:
            return (0, _utils.isDefined)(filter.leftOperand) && filter.leftOperand !== '';
        case _types.ViewFilterOperand.IS_RELATIVE:
            return (0, _parseandevaluaterelativedatefilterutil.parseAndEvaluateRelativeDateFilter)({
                dateToCheck: dateLeftValue,
                relativeDateString: String(filter.rightOperand)
            });
        default:
            throw new Error(`Operand ${filter.operand} not supported for date filter`);
    }
}
function evaluateUuidFilter(filter) {
    switch(filter.operand){
        case _types.ViewFilterOperand.IS:
            return filter.leftOperand === filter.rightOperand;
        case _types.ViewFilterOperand.IS_NOT:
            return filter.leftOperand !== filter.rightOperand;
        case _types.ViewFilterOperand.IS_EMPTY:
            return !(0, _guards.isNonEmptyString)(filter.leftOperand);
        case _types.ViewFilterOperand.IS_NOT_EMPTY:
            return (0, _guards.isNonEmptyString)(filter.leftOperand);
        default:
            throw new Error(`Operand ${filter.operand} not supported for uuid filter`);
    }
}
// Rating values are stored as enum strings 'RATING_1'..'RATING_5'. Comparisons
// must operate on the numeric rank (1..5), not lexicographic order or Number()
// on the enum string (which would be NaN).
function parseRatingRank(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === 'string' && value.length > 0) {
        const ratingPrefixMatch = value.match(/^RATING_(\d+)$/);
        if (ratingPrefixMatch !== null) {
            return Number(ratingPrefixMatch[1]);
        }
        const numericValue = Number(value);
        if (Number.isFinite(numericValue)) {
            return numericValue;
        }
    }
    return undefined;
}
function evaluateRatingFilter(filter) {
    const leftRank = parseRatingRank(filter.leftOperand);
    const rightRank = parseRatingRank(filter.rightOperand);
    switch(filter.operand){
        case _types.ViewFilterOperand.IS:
            return (0, _utils.isDefined)(leftRank) && leftRank === rightRank;
        case _types.ViewFilterOperand.IS_NOT:
            return !(0, _utils.isDefined)(leftRank) || leftRank !== rightRank;
        case _types.ViewFilterOperand.GREATER_THAN_OR_EQUAL:
            return (0, _utils.isDefined)(leftRank) && (0, _utils.isDefined)(rightRank) && leftRank >= rightRank;
        case _types.ViewFilterOperand.LESS_THAN_OR_EQUAL:
            return (0, _utils.isDefined)(leftRank) && (0, _utils.isDefined)(rightRank) && leftRank <= rightRank;
        case _types.ViewFilterOperand.IS_EMPTY:
            return !(0, _utils.isDefined)(leftRank);
        case _types.ViewFilterOperand.IS_NOT_EMPTY:
            return (0, _utils.isDefined)(leftRank);
        default:
            throw new Error(`Operand ${filter.operand} not supported for rating filter`);
    }
}
function evaluateRelationFilter(filter) {
    // compare only the ids. If the left operand is the relation object, get the id
    const leftValue = (0, _guards.isObject)(filter.leftOperand) && 'id' in filter.leftOperand ? filter.leftOperand.id : filter.leftOperand;
    const rightValue = (0, _guards.isObject)(filter.rightOperand) && 'id' in filter.rightOperand ? filter.rightOperand.id : filter.rightOperand;
    switch(filter.operand){
        case _types.ViewFilterOperand.IS:
            return leftValue === rightValue;
        case _types.ViewFilterOperand.IS_NOT:
            return leftValue !== rightValue;
        case _types.ViewFilterOperand.IS_EMPTY:
            return !(0, _guards.isNonEmptyString)(leftValue);
        case _types.ViewFilterOperand.IS_NOT_EMPTY:
            return (0, _guards.isNonEmptyString)(leftValue);
        default:
            throw new Error(`Operand ${filter.operand} not supported for relation filter`);
    }
}
function evaluateCurrencyFilter(filter) {
    if (filter.compositeFieldSubFieldName === 'currencyCode') {
        switch(filter.operand){
            case _types.ViewFilterOperand.IS:
                return contains(filter.leftOperand, filter.rightOperand);
            case _types.ViewFilterOperand.IS_NOT:
                return !contains(filter.leftOperand, filter.rightOperand);
            case _types.ViewFilterOperand.IS_EMPTY:
                return !(0, _guards.isNonEmptyString)(filter.leftOperand);
            case _types.ViewFilterOperand.IS_NOT_EMPTY:
                return (0, _guards.isNonEmptyString)(filter.leftOperand);
            default:
                throw new Error(`Operand ${filter.operand} not supported for currency filter`);
        }
    } else {
        return evaluateNumberFilter(filter);
    }
}
function evaluateNumberFilter(filter) {
    const leftValue = filter.leftOperand;
    const rightValue = filter.rightOperand;
    switch(filter.operand){
        case _types.ViewFilterOperand.GREATER_THAN_OR_EQUAL:
            return Number(leftValue) >= Number(rightValue);
        case _types.ViewFilterOperand.LESS_THAN_OR_EQUAL:
            return Number(leftValue) <= Number(rightValue);
        case _types.ViewFilterOperand.IS_EMPTY:
            return !(0, _utils.isDefined)(filter.leftOperand) || filter.leftOperand === '';
        case _types.ViewFilterOperand.IS_NOT_EMPTY:
            return (0, _utils.isDefined)(filter.leftOperand) && filter.leftOperand !== '';
        case _types.ViewFilterOperand.IS:
            return Number(leftValue) === Number(rightValue);
        case _types.ViewFilterOperand.IS_NOT:
            return Number(leftValue) !== Number(rightValue);
        default:
            throw new Error(`Operand ${filter.operand} not supported for number filter`);
    }
}
function evaluateDefaultFilter(filter) {
    const leftValue = filter.leftOperand;
    const rightValue = filter.rightOperand;
    switch(filter.operand){
        case _types.ViewFilterOperand.IS:
            return leftValue == rightValue;
        case _types.ViewFilterOperand.IS_NOT:
            return leftValue != rightValue;
        case _types.ViewFilterOperand.IS_EMPTY:
            return !isNotEmptyTextOrArray(leftValue);
        case _types.ViewFilterOperand.IS_NOT_EMPTY:
            return isNotEmptyTextOrArray(leftValue);
        case _types.ViewFilterOperand.CONTAINS:
            return contains(leftValue, rightValue);
        case _types.ViewFilterOperand.DOES_NOT_CONTAIN:
            return !contains(leftValue, rightValue);
        case _types.ViewFilterOperand.GREATER_THAN_OR_EQUAL:
            return Number(leftValue) >= Number(rightValue);
        case _types.ViewFilterOperand.LESS_THAN_OR_EQUAL:
            return Number(leftValue) <= Number(rightValue);
        default:
            throw new Error(`Operand ${filter.operand} not supported for ${filter.type} filter type`);
    }
}
function evaluateSelectFilter(filter) {
    switch(filter.operand){
        case _types.ViewFilterOperand.IS:
            return contains(filter.leftOperand, filter.rightOperand);
        case _types.ViewFilterOperand.IS_NOT:
            return !contains(filter.leftOperand, filter.rightOperand);
        case _types.ViewFilterOperand.IS_EMPTY:
            return !isNotEmptyTextOrArray(filter.leftOperand);
        case _types.ViewFilterOperand.IS_NOT_EMPTY:
            return isNotEmptyTextOrArray(filter.leftOperand);
        default:
            throw new Error(`Operand ${filter.operand} not supported for select filter`);
    }
}
function evaluateActorFilter(filter) {
    const { compositeFieldSubFieldName } = filter;
    if (compositeFieldSubFieldName === 'source') {
        return evaluateSelectFilter(filter);
    }
    if (compositeFieldSubFieldName === 'workspaceMemberId') {
        return evaluateRelationFilter(filter);
    }
    return evaluateTextAndArrayFilter(filter, 'TEXT', compositeFieldSubFieldName);
}
function evaluateFilterConditions({ filterGroups = [], filters = [] }) {
    if (filterGroups.length === 0 && filters.length === 0) {
        return true;
    }
    if (filterGroups.length > 0) {
        const groupIds = new Set(filterGroups.map((g)=>g.id));
        for (const filter of filters){
            if (!groupIds.has(filter.stepFilterGroupId)) {
                throw new Error(`Filter group with id ${filter.stepFilterGroupId} not found`);
            }
        }
    }
    const rootGroups = filterGroups.filter((g)=>!g.parentStepFilterGroupId);
    if (rootGroups.length === 0 && filters.length > 0) {
        const filterResults = filters.map((filter)=>evaluateFilter(filter));
        return filterResults.every((result)=>result);
    }
    const rootResults = rootGroups.map((rootGroup)=>evaluateFilterGroup(rootGroup.id, filterGroups, filters));
    return rootResults.every((result)=>result);
}

//# sourceMappingURL=evaluate-filter-conditions.util.js.map