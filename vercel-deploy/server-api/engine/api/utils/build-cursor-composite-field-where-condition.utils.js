"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCursorCompositeFieldWhereCondition", {
    enumerable: true,
    get: function() {
        return buildCursorCompositeFieldWhereCondition;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../common/common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../graphql/graphql-query-runner/errors/graphql-query-runner.exception");
const _buildcursorcumulativewhereconditionsutils = require("./build-cursor-cumulative-where-conditions.utils");
const _computeoperatorutils = require("./compute-operator.utils");
const _isascendingorderutils = require("./is-ascending-order.utils");
const _validateandgetorderbyutils = require("./validate-and-get-order-by.utils");
const buildCursorCompositeFieldWhereCondition = ({ fieldType, fieldKey, orderBy, cursorValue, isForwardPagination, isEqualityCondition = false })=>{
    const compositeType = _types.compositeTypeDefinitions.get(fieldType);
    if (!compositeType) {
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Composite type definition not found for type: ${fieldType}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_CURSOR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const fieldOrderBy = (0, _validateandgetorderbyutils.validateAndGetOrderByForCompositeField)(fieldKey, orderBy);
    const compositeFieldProperties = compositeType.properties.filter((property)=>property.type !== _types.FieldMetadataType.RAW_JSON && cursorValue[property.name] !== undefined);
    if (compositeFieldProperties.length === 0) {
        return {};
    }
    const cursorEntries = compositeFieldProperties.map((property)=>{
        if (cursorValue[property.name] === undefined) {
            return null;
        }
        return {
            [property.name]: cursorValue[property.name]
        };
    }).filter(_utils.isDefined);
    if (isEqualityCondition) {
        const result = cursorEntries.reduce((acc, cursorEntry)=>{
            const [cursorKey, cursorValue] = Object.entries(cursorEntry)[0];
            return {
                ...acc,
                [cursorKey]: {
                    eq: cursorValue
                }
            };
        }, {});
        return {
            [fieldKey]: result
        };
    }
    const orConditions = (0, _buildcursorcumulativewhereconditionsutils.buildCursorCumulativeWhereCondition)({
        cursorEntries,
        buildEqualityCondition: ({ cursorKey, cursorValue })=>({
                [fieldKey]: {
                    [cursorKey]: {
                        eq: cursorValue
                    }
                }
            }),
        buildMainCondition: ({ cursorKey, cursorValue })=>{
            const orderByDirection = fieldOrderBy[fieldKey]?.[cursorKey];
            if (!(0, _utils.isDefined)(orderByDirection)) {
                throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException('Invalid cursor', _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_CURSOR, {
                    userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                });
            }
            const isAscending = (0, _isascendingorderutils.isAscendingOrder)(orderByDirection);
            const computedOperator = (0, _computeoperatorutils.computeOperator)(isAscending, isForwardPagination);
            return {
                [fieldKey]: {
                    [cursorKey]: {
                        [computedOperator]: cursorValue
                    }
                }
            };
        }
    });
    if (orConditions.length === 1) {
        return orConditions[0];
    }
    return {
        or: orConditions
    };
};

//# sourceMappingURL=build-cursor-composite-field-where-condition.utils.js.map