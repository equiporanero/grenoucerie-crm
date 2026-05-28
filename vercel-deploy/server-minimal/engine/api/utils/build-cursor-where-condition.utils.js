"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCursorWhereCondition", {
    enumerable: true,
    get: function() {
        return buildCursorWhereCondition;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../common/common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../graphql/graphql-query-runner/errors/graphql-query-runner.exception");
const _buildcursorcompositefieldwhereconditionutils = require("./build-cursor-composite-field-where-condition.utils");
const _computeoperatorutils = require("./compute-operator.utils");
const _isascendingorderutils = require("./is-ascending-order.utils");
const _validateandgetorderbyutils = require("./validate-and-get-order-by.utils");
const _iscompositefieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const buildCursorWhereCondition = ({ cursorKey, cursorValue, flatObjectMetadata, flatFieldMetadataMaps, orderBy, isForwardPagination, isEqualityCondition = false })=>{
    const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
    const fieldMetadataId = fieldIdByName[cursorKey];
    const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityId: fieldMetadataId
    });
    if (!fieldMetadata) {
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Field metadata not found for key: ${cursorKey}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_CURSOR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
        return (0, _buildcursorcompositefieldwhereconditionutils.buildCursorCompositeFieldWhereCondition)({
            fieldType: fieldMetadata.type,
            fieldKey: cursorKey,
            orderBy,
            cursorValue: cursorValue,
            isForwardPagination,
            isEqualityCondition
        });
    }
    if (isEqualityCondition) {
        return {
            [cursorKey]: {
                eq: cursorValue
            }
        };
    }
    const keyOrderBy = (0, _validateandgetorderbyutils.validateAndGetOrderByForScalarField)(cursorKey, orderBy);
    const orderByDirection = keyOrderBy[cursorKey];
    if (!(0, _utils.isDefined)(orderByDirection)) {
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException('Invalid cursor', _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_CURSOR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const isAscending = (0, _isascendingorderutils.isAscendingOrder)(orderByDirection);
    const computedOperator = (0, _computeoperatorutils.computeOperator)(isAscending, isForwardPagination);
    return {
        [cursorKey]: {
            [computedOperator]: cursorValue
        }
    };
};

//# sourceMappingURL=build-cursor-where-condition.utils.js.map