"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractNestedRelationFieldsByEntityIndex", {
    enumerable: true,
    get: function() {
        return extractNestedRelationFieldsByEntityIndex;
    }
});
const _classvalidator = require("class-validator");
const _constants = require("twenty-shared/constants");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const hasRelationConnect = (value)=>{
    if (!(0, _classvalidator.isDefined)(value) || typeof value !== 'object') {
        return false;
    }
    const obj = value;
    if (!(0, _classvalidator.isDefined)(obj[_constants.RELATION_NESTED_QUERY_KEYWORDS.CONNECT]) || typeof obj[_constants.RELATION_NESTED_QUERY_KEYWORDS.CONNECT] !== 'object') {
        return false;
    }
    const connect = obj[_constants.RELATION_NESTED_QUERY_KEYWORDS.CONNECT];
    if (!(0, _classvalidator.isDefined)(connect[_constants.RELATION_NESTED_QUERY_KEYWORDS.CONNECT_WHERE]) || typeof connect[_constants.RELATION_NESTED_QUERY_KEYWORDS.CONNECT_WHERE] !== 'object') {
        return false;
    }
    const where = connect[_constants.RELATION_NESTED_QUERY_KEYWORDS.CONNECT_WHERE];
    const whereKeys = Object.keys(where);
    if (whereKeys.length === 0) {
        return false;
    }
    return whereKeys.every((key)=>{
        const whereValue = where[key];
        if (typeof whereValue === 'string') {
            return true;
        }
        if (whereValue && typeof whereValue === 'object') {
            const subObj = whereValue;
            return Object.values(subObj).every((subValue)=>typeof subValue === 'string');
        }
        return false;
    });
};
const hasRelationDisconnect = (value)=>{
    if (!(0, _classvalidator.isDefined)(value) || typeof value !== 'object') return false;
    const obj = value;
    if (!(0, _classvalidator.isDefined)(obj[_constants.RELATION_NESTED_QUERY_KEYWORDS.DISCONNECT]) || typeof obj[_constants.RELATION_NESTED_QUERY_KEYWORDS.DISCONNECT] !== 'boolean') return false;
    return true;
};
const extractNestedRelationFieldsByEntityIndex = (entities)=>{
    const relationConnectQueryFieldsByEntityIndex = {};
    const relationDisconnectQueryFieldsByEntityIndex = {};
    for (const [entityIndex, entity] of Object.entries(entities)){
        for (const [key, value] of Object.entries(entity)){
            const hasConnect = hasRelationConnect(value);
            const hasDisconnect = hasRelationDisconnect(value);
            if (hasConnect && hasDisconnect) {
                throw new _twentyormexception.TwentyORMException(`Cannot have both connect and disconnect for the same field on ${entity.key}.`, _twentyormexception.TwentyORMExceptionCode.CONNECT_NOT_ALLOWED);
            }
            const relationConnectQueryFields = relationConnectQueryFieldsByEntityIndex?.[entityIndex] || {};
            if (hasConnect) {
                relationConnectQueryFieldsByEntityIndex[entityIndex] = {
                    ...relationConnectQueryFields,
                    [key]: value
                };
            }
            const relationDisconnectQueryFields = relationDisconnectQueryFieldsByEntityIndex?.[entityIndex] || {};
            if (hasDisconnect) {
                relationDisconnectQueryFieldsByEntityIndex[entityIndex] = {
                    ...relationDisconnectQueryFields,
                    [key]: value
                };
            }
        }
    }
    return {
        relationConnectQueryFieldsByEntityIndex,
        relationDisconnectQueryFieldsByEntityIndex
    };
};

//# sourceMappingURL=extract-nested-relation-fields-by-entity-index.util.js.map