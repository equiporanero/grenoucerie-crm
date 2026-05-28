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
    get ARRAY_FILTER_OPERATORS () {
        return ARRAY_FILTER_OPERATORS;
    },
    get BOOLEAN_FILTER_OPERATORS () {
        return BOOLEAN_FILTER_OPERATORS;
    },
    get DATE_FILTER_OPERATORS () {
        return DATE_FILTER_OPERATORS;
    },
    get ENUM_FILTER_OPERATORS () {
        return ENUM_FILTER_OPERATORS;
    },
    get MULTI_SELECT_FILTER_OPERATORS () {
        return MULTI_SELECT_FILTER_OPERATORS;
    },
    get NUMBER_FILTER_OPERATORS () {
        return NUMBER_FILTER_OPERATORS;
    },
    get RAW_JSON_FILTER_OPERATORS () {
        return RAW_JSON_FILTER_OPERATORS;
    },
    get RICH_TEXT_FILTER_OPERATORS () {
        return RICH_TEXT_FILTER_OPERATORS;
    },
    get STRING_FILTER_OPERATORS () {
        return STRING_FILTER_OPERATORS;
    },
    get UUID_FILTER_OPERATORS () {
        return UUID_FILTER_OPERATORS;
    }
});
const STRING_FILTER_OPERATORS = [
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'in',
    'is',
    'like',
    'ilike',
    'startsWith',
    'endsWith'
];
const NUMBER_FILTER_OPERATORS = [
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'in',
    'is'
];
const BOOLEAN_FILTER_OPERATORS = [
    'eq',
    'is'
];
const DATE_FILTER_OPERATORS = [
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'in',
    'is'
];
const UUID_FILTER_OPERATORS = [
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'in',
    'is'
];
const ARRAY_FILTER_OPERATORS = [
    'containsIlike',
    'is',
    'isEmptyArray'
];
const MULTI_SELECT_FILTER_OPERATORS = [
    'containsAny',
    'is',
    'isEmptyArray'
];
const ENUM_FILTER_OPERATORS = [
    'eq',
    'neq',
    'in',
    'containsAny',
    'is',
    'isEmptyArray'
];
const RAW_JSON_FILTER_OPERATORS = [
    'is',
    'like'
];
const RICH_TEXT_FILTER_OPERATORS = [
    'ilike'
];

//# sourceMappingURL=filter-operators.constant.js.map