"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlQueryOrderFieldParser", {
    enumerable: true,
    get: function() {
        return GraphqlQueryOrderFieldParser;
    }
});
const _classvalidator = require("class-validator");
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../../common/common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../../errors/graphql-query-runner.exception");
const _buildorderbycolumnexpressionutil = require("./utils/build-order-by-column-expression.util");
const _convertorderbytofindoptionsorder = require("./utils/convert-order-by-to-find-options-order");
const _isorderbydirectionutil = require("./utils/is-order-by-direction.util");
const _parsecompositefieldfororderutil = require("./utils/parse-composite-field-for-order.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
let GraphqlQueryOrderFieldParser = class GraphqlQueryOrderFieldParser {
    parse(orderBy, objectNameSingular, isForwardPagination = true) {
        const orderByConditions = {};
        const relationJoins = [];
        const addedJoinAliases = new Set();
        for (const item of orderBy){
            for (const [fieldName, orderByDirection] of Object.entries(item)){
                // Check if accessed by relation name (company) vs FK name (companyId)
                const isAccessedByRelationName = !!this.fieldIdByName[fieldName];
                const fieldMetadataId = this.fieldIdByName[fieldName] || this.fieldIdByJoinColumnName[fieldName];
                const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: fieldMetadataId,
                    flatEntityMaps: this.flatFieldMetadataMaps
                });
                if (!fieldMetadata || orderByDirection === undefined) {
                    throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Field "${fieldName}" does not exist or is not sortable`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.FIELD_NOT_FOUND, {
                        userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                    });
                }
                // Only treat as relation if accessed by relation name (not FK like companyId)
                if (isAccessedByRelationName && (0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata)) {
                    if (!(0, _classvalidator.isObject)(orderByDirection)) {
                        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Relation field "${fieldName}" requires nested field ordering (e.g., { ${fieldName}: { fieldName: 'AscNullsFirst' } })`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                        });
                    }
                    const relationOrderResult = this.parseRelationFieldOrder({
                        fieldMetadata,
                        orderByDirection: orderByDirection,
                        isForwardPagination
                    });
                    if (relationOrderResult) {
                        Object.assign(orderByConditions, relationOrderResult.orderBy);
                        if (!addedJoinAliases.has(relationOrderResult.joinInfo.joinAlias)) {
                            relationJoins.push(relationOrderResult.joinInfo);
                            addedJoinAliases.add(relationOrderResult.joinInfo.joinAlias);
                        }
                    }
                } else if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
                    if (!(0, _classvalidator.isObject)(orderByDirection)) {
                        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Composite field "${fieldName}" requires subfield ordering (e.g., { ${fieldName}: { subFieldName: 'AscNullsFirst' } })`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                        });
                    }
                    const compositeOrder = (0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, orderByDirection, objectNameSingular, isForwardPagination);
                    Object.assign(orderByConditions, compositeOrder);
                } else {
                    if (!(0, _isorderbydirectionutil.isOrderByDirection)(orderByDirection)) {
                        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Scalar field "${fieldName}" requires a direction value (AscNullsFirst, AscNullsLast, DescNullsFirst, DescNullsLast)`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                        });
                    }
                    const columnExpression = (0, _buildorderbycolumnexpressionutil.buildOrderByColumnExpression)(objectNameSingular, fieldName);
                    orderByConditions[columnExpression] = {
                        ...(0, _convertorderbytofindoptionsorder.convertOrderByToFindOptionsOrder)(orderByDirection, isForwardPagination),
                        useLower: (0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(fieldMetadata.type),
                        castToText: (0, _buildorderbycolumnexpressionutil.shouldCastToText)(fieldMetadata.type)
                    };
                }
            }
        }
        return {
            orderBy: orderByConditions,
            relationJoins
        };
    }
    parseRelationFieldOrder({ fieldMetadata, orderByDirection, isForwardPagination }) {
        if (!(0, _utils.isDefined)(fieldMetadata.relationTargetObjectMetadataId)) {
            return null;
        }
        const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
            flatEntityMaps: this.flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(targetObjectMetadata)) {
            return null;
        }
        const nestedFieldName = Object.keys(orderByDirection)[0];
        const nestedFieldOrderByValue = orderByDirection[nestedFieldName];
        if (!(0, _utils.isDefined)(nestedFieldOrderByValue)) {
            return null;
        }
        const { fieldIdByName: targetFieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(this.flatFieldMetadataMaps, targetObjectMetadata);
        const nestedFieldMetadataId = targetFieldIdByName[nestedFieldName];
        if (!(0, _utils.isDefined)(nestedFieldMetadataId)) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Nested field "${nestedFieldName}" not found in target object "${targetObjectMetadata.nameSingular}"`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.FIELD_NOT_FOUND, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const nestedFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: nestedFieldMetadataId,
            flatEntityMaps: this.flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(nestedFieldMetadata)) {
            return null;
        }
        const joinAlias = fieldMetadata.name;
        const joinInfo = {
            joinAlias
        };
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(nestedFieldMetadata.type)) {
            if (!(0, _classvalidator.isObject)(nestedFieldOrderByValue)) {
                throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Composite field "${nestedFieldMetadata.name}" requires a subfield to be specified`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                    userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                });
            }
            const compositeOrder = (0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(nestedFieldMetadata, nestedFieldOrderByValue, joinAlias, isForwardPagination);
            if (Object.keys(compositeOrder).length === 0) {
                return null;
            }
            return {
                orderBy: compositeOrder,
                joinInfo
            };
        }
        if ((0, _isorderbydirectionutil.isOrderByDirection)(nestedFieldOrderByValue)) {
            const columnExpression = (0, _buildorderbycolumnexpressionutil.buildOrderByColumnExpression)(joinAlias, nestedFieldMetadata.name);
            return {
                orderBy: {
                    [columnExpression]: {
                        ...(0, _convertorderbytofindoptionsorder.convertOrderByToFindOptionsOrder)(nestedFieldOrderByValue, isForwardPagination),
                        useLower: (0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(nestedFieldMetadata.type),
                        castToText: (0, _buildorderbycolumnexpressionutil.shouldCastToText)(nestedFieldMetadata.type)
                    }
                },
                joinInfo
            };
        }
        return null;
    }
    constructor(flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps){
        this.flatObjectMetadata = flatObjectMetadata;
        this.flatObjectMetadataMaps = flatObjectMetadataMaps;
        this.flatFieldMetadataMaps = flatFieldMetadataMaps;
        const fieldMaps = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        this.fieldIdByName = fieldMaps.fieldIdByName;
        this.fieldIdByJoinColumnName = fieldMaps.fieldIdByJoinColumnName;
    }
};

//# sourceMappingURL=graphql-query-order.parser.js.map