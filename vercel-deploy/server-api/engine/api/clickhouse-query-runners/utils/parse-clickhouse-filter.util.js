"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseClickHouseFilter", {
    enumerable: true,
    get: function() {
        return parseClickHouseFilter;
    }
});
const _utils = require("twenty-shared/utils");
const getClickHouseType = (value)=>{
    if (typeof value === 'string') {
        return 'String';
    }
    if (typeof value === 'number') {
        return Number.isInteger(value) ? 'Int64' : 'Float64';
    }
    if (typeof value === 'boolean') {
        return 'Bool';
    }
    return 'String';
};
const buildOperatorCondition = (fieldName, operator, paramName, paramType)=>{
    switch(operator){
        case 'eq':
            return `"${fieldName}" = {${paramName}:${paramType}}`;
        case 'neq':
            return `"${fieldName}" != {${paramName}:${paramType}}`;
        case 'gt':
            return `"${fieldName}" > {${paramName}:${paramType}}`;
        case 'gte':
            return `"${fieldName}" >= {${paramName}:${paramType}}`;
        case 'lt':
            return `"${fieldName}" < {${paramName}:${paramType}}`;
        case 'lte':
            return `"${fieldName}" <= {${paramName}:${paramType}}`;
        case 'in':
            return `"${fieldName}" IN {${paramName}:Array(${paramType})}`;
        case 'is':
            return `"${fieldName}" IS NULL`;
        case 'like':
            return `"${fieldName}" LIKE {${paramName}:${paramType}}`;
        case 'ilike':
            return `lower("${fieldName}") LIKE lower({${paramName}:${paramType}})`;
        case 'startsWith':
            return `"${fieldName}" LIKE concat({${paramName}:${paramType}}, '%')`;
        case 'endsWith':
            return `"${fieldName}" LIKE concat('%', {${paramName}:${paramType}})`;
        case 'contains':
            return `"${fieldName}" LIKE concat('%', {${paramName}:${paramType}}, '%')`;
        default:
            return `"${fieldName}" = {${paramName}:${paramType}}`;
    }
};
const parseFilterValue = (fieldName, filterValue, paramIndex)=>{
    const conditions = [];
    const params = {};
    if (!(0, _utils.isDefined)(filterValue) || typeof filterValue !== 'object') {
        return {
            conditions,
            params
        };
    }
    const filterObj = filterValue;
    for (const [operator, value] of Object.entries(filterObj)){
        if (!(0, _utils.isDefined)(value)) {
            continue;
        }
        const paramName = `${fieldName}_${paramIndex}_${operator}`;
        if (operator === 'is') {
            if (value === 'NULL') {
                conditions.push(`"${fieldName}" IS NULL`);
            } else if (value === 'NOT_NULL') {
                conditions.push(`"${fieldName}" IS NOT NULL`);
            }
            continue;
        }
        const paramType = getClickHouseType(value);
        conditions.push(buildOperatorCondition(fieldName, operator, paramName, paramType));
        params[paramName] = value;
    }
    return {
        conditions,
        params
    };
};
const parseClickHouseFilter = (filter)=>{
    if (!(0, _utils.isDefined)(filter) || Object.keys(filter).length === 0) {
        return {
            whereClause: '',
            params: {}
        };
    }
    const allConditions = [];
    const allParams = {};
    let paramIndex = 0;
    // Handle 'and' operator
    if ('and' in filter && Array.isArray(filter.and)) {
        const andConditions = [];
        for (const subFilter of filter.and){
            const { whereClause, params } = parseClickHouseFilter(subFilter);
            if (whereClause) {
                andConditions.push(`(${whereClause})`);
                Object.assign(allParams, params);
            }
        }
        if (andConditions.length > 0) {
            allConditions.push(andConditions.join(' AND '));
        }
    }
    // Handle 'or' operator
    if ('or' in filter && Array.isArray(filter.or)) {
        const orConditions = [];
        for (const subFilter of filter.or){
            const { whereClause, params } = parseClickHouseFilter(subFilter);
            if (whereClause) {
                orConditions.push(`(${whereClause})`);
                Object.assign(allParams, params);
            }
        }
        if (orConditions.length > 0) {
            allConditions.push(`(${orConditions.join(' OR ')})`);
        }
    }
    // Handle 'not' operator
    if ('not' in filter && (0, _utils.isDefined)(filter.not)) {
        const { whereClause, params } = parseClickHouseFilter(filter.not);
        if (whereClause) {
            allConditions.push(`NOT (${whereClause})`);
            Object.assign(allParams, params);
        }
    }
    // Handle field-level filters
    for (const [fieldName, filterValue] of Object.entries(filter)){
        if ([
            'and',
            'or',
            'not'
        ].includes(fieldName)) {
            continue;
        }
        const { conditions, params } = parseFilterValue(fieldName, filterValue, paramIndex++);
        allConditions.push(...conditions);
        Object.assign(allParams, params);
    }
    return {
        whereClause: allConditions.join(' AND '),
        params: allParams
    };
};

//# sourceMappingURL=parse-clickhouse-filter.util.js.map