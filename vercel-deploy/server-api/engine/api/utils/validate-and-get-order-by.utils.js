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
    get countRelationFieldsInOrderBy () {
        return countRelationFieldsInOrderBy;
    },
    get hasRelationFieldInOrderBy () {
        return hasRelationFieldInOrderBy;
    },
    get validateAndGetOrderByForCompositeField () {
        return validateAndGetOrderByForCompositeField;
    },
    get validateAndGetOrderByForScalarField () {
        return validateAndGetOrderByForScalarField;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../common/common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../graphql/graphql-query-runner/errors/graphql-query-runner.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const isOrderByDirection = (value)=>{
    return Object.values(_types.OrderByDirection).includes(value);
};
const isOrderByForScalarField = (orderByLeaf, key)=>{
    const value = orderByLeaf[key];
    return (0, _utils.isDefined)(value) && isOrderByDirection(value);
};
const isOrderByForCompositeField = (orderByLeaf, key)=>{
    const value = orderByLeaf[key];
    return (0, _utils.isDefined)(value) && typeof value === 'object' && value !== null && !isOrderByDirection(value) && Object.values(value).every(isOrderByDirection);
};
const validateAndGetOrderByForScalarField = (key, orderBy)=>{
    const keyOrderBy = orderBy.find((order)=>key in order);
    if (!(0, _utils.isDefined)(keyOrderBy)) {
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException('Invalid cursor', _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_CURSOR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if (!isOrderByForScalarField(keyOrderBy, key)) {
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException('Expected non-composite field order by', _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_CURSOR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    return keyOrderBy;
};
const validateAndGetOrderByForCompositeField = (key, orderBy)=>{
    const keyOrderBy = orderBy.find((order)=>key in order);
    if (!(0, _utils.isDefined)(keyOrderBy)) {
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException('Invalid cursor', _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_CURSOR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if (!isOrderByForCompositeField(keyOrderBy, key)) {
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException('Expected composite field order by', _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_CURSOR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    return keyOrderBy;
};
const countRelationFieldsInOrderBy = (orderBy, flatFieldMetadataMaps, fieldIdByName)=>{
    return orderBy.filter((orderByItem)=>{
        const fieldName = Object.keys(orderByItem)[0];
        const fieldMetadataId = fieldIdByName[fieldName];
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        return fieldMetadata?.type === _types.FieldMetadataType.RELATION;
    }).length;
};
const hasRelationFieldInOrderBy = (orderBy, flatFieldMetadataMaps, fieldIdByName)=>{
    return countRelationFieldsInOrderBy(orderBy, flatFieldMetadataMaps, fieldIdByName) > 0;
};

//# sourceMappingURL=validate-and-get-order-by.utils.js.map