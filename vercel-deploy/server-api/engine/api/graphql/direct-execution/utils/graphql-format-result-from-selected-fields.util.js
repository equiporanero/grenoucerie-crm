"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "graphQLFormatResultFromSelectedFields", {
    enumerable: true,
    get: function() {
        return graphQLFormatResultFromSelectedFields;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _graphqldirectexecutionexception = require("../errors/graphql-direct-execution.exception");
const _graphqlisresolveroutputtypeutil = require("./graphql-is-resolver-output-type.util");
const _iscompositefieldmetadatatypeutil = require("../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _utils = require("twenty-shared/utils");
const graphQLFormatResultFromSelectedFields = (result, selectedFields, objectNameSingular, input)=>{
    const context = {
        ...input,
        fieldMetadataByNameCache: new Map()
    };
    if ((0, _graphqlisresolveroutputtypeutil.isObjectRecord)(result)) {
        return backfillNullValuesAndComputeTypeNameForObjectRecord(result, selectedFields, objectNameSingular, context);
    }
    if ((0, _graphqlisresolveroutputtypeutil.isObjectRecordArray)(result)) {
        return result.map((item)=>backfillNullValuesAndComputeTypeNameForObjectRecord(item, selectedFields, objectNameSingular, context));
    }
    if ((0, _graphqlisresolveroutputtypeutil.isGroupByConnection)(result)) {
        return backfillNullValuesAndComputeTypeNameForGroupByConnection(result, selectedFields, objectNameSingular, context);
    }
    if ((0, _graphqlisresolveroutputtypeutil.isConnection)(result)) {
        return backfillNullValuesAndComputeTypeNameForConnection(result, selectedFields, objectNameSingular, context);
    }
    if ((0, _graphqlisresolveroutputtypeutil.isConnectionArray)(result)) {
        return backfillNullValuesAndComputeTypeNameForConnectionArray(result, selectedFields, objectNameSingular, context);
    }
    if (result === null || result === undefined) {
        return result;
    }
    throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid result type', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_RESULT_TYPE, {
        userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
    });
};
const backfillNullValuesAndComputeTypeNameForObjectRecord = (record, selectedFields, objectNameSingular, context)=>{
    const formatted = {};
    for (const [key, subFields] of Object.entries(selectedFields)){
        if (key === '__typename') {
            formatted.__typename = (0, _utils.getNodeTypename)(objectNameSingular);
            continue;
        }
        if (!(0, _utils.isDefined)(record[key])) {
            formatted[key] = null;
            continue;
        }
        const value = record[key];
        const hasNestedFields = (0, _utils.isDefined)(subFields) && !(0, _utils.isEmptyObject)(subFields);
        if (!hasNestedFields || (0, _guards.isNull)(value)) {
            formatted[key] = value;
            continue;
        }
        const relationInfo = findRelationInfo(objectNameSingular, key, context);
        if ((0, _utils.isDefined)(relationInfo)) {
            if (relationInfo.relationType === _types.RelationType.ONE_TO_MANY) {
                formatted[key] = backfillNullValuesAndComputeTypeNameForConnection(value, subFields, relationInfo.targetObjectNameSingular, context);
            } else {
                formatted[key] = backfillNullValuesAndComputeTypeNameForObjectRecord(value, subFields, relationInfo.targetObjectNameSingular, context);
            }
            continue;
        }
        const fieldMetadata = findFieldMetadataByName(objectNameSingular, key, context);
        if ((0, _utils.isDefined)(fieldMetadata) && (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
            formatted[key] = backfillNullValuesAndComputeTypeNameForCompositeField(value, subFields, fieldMetadata.type);
            continue;
        }
        if ((0, _utils.isDefined)(fieldMetadata) && fieldMetadata.type === _types.FieldMetadataType.NUMBER && (0, _guards.isNonEmptyString)(value) && isFinite(Number(value))) {
            formatted[key] = Number(value);
            continue;
        }
        formatted[key] = value;
    }
    return formatted;
};
const backfillNullValuesAndComputeTypeNameForCompositeField = (record, selectedFields, fieldMetadataType)=>{
    const formatted = {};
    for (const key of Object.keys(selectedFields)){
        if (key === '__typename') {
            formatted.__typename = (0, _utils.pascalCase)(fieldMetadataType);
            continue;
        }
        formatted[key] = record[key] ?? null;
    }
    return formatted;
};
const backfillNullValuesAndComputeTypeNameForConnection = (connection, selectedFields, objectNameSingular, context)=>{
    const formatted = {};
    for (const [key, subFields] of Object.entries(selectedFields)){
        if (key === '__typename') {
            formatted.__typename = (0, _utils.getConnectionTypename)(objectNameSingular);
            continue;
        }
        if (key === 'edges') {
            formatted.edges = connection.edges.map((edge)=>{
                const edgeFormatted = {};
                for (const [edgeKey, edgeSubFields] of Object.entries(subFields)){
                    if (edgeKey === '__typename') {
                        edgeFormatted.__typename = (0, _utils.getEdgeTypename)(objectNameSingular);
                        continue;
                    }
                    if (edgeKey === 'cursor') {
                        edgeFormatted.cursor = edge.cursor;
                        continue;
                    }
                    if (edgeKey === 'node') {
                        edgeFormatted.node = backfillNullValuesAndComputeTypeNameForObjectRecord(edge.node, edgeSubFields, objectNameSingular, context);
                        continue;
                    }
                }
                return edgeFormatted;
            });
            continue;
        }
        if (key === 'pageInfo') {
            const pageInfoFormatted = {};
            for (const pageInfoKey of Object.keys(subFields)){
                if (pageInfoKey === '__typename') {
                    pageInfoFormatted.__typename = 'PageInfo';
                    continue;
                }
                pageInfoFormatted[pageInfoKey] = connection.pageInfo[pageInfoKey] ?? null;
            }
            formatted.pageInfo = pageInfoFormatted;
            continue;
        }
        const rawAggregateValue = connection[key] ?? null;
        formatted[key] = (0, _guards.isNonEmptyString)(rawAggregateValue) && isFinite(Number(rawAggregateValue)) ? Number(rawAggregateValue) : rawAggregateValue;
    }
    return formatted;
};
const backfillNullValuesAndComputeTypeNameForGroupByConnection = (connection, selectedFields, objectNameSingular, context)=>{
    const formatted = backfillNullValuesAndComputeTypeNameForConnection(connection, selectedFields, objectNameSingular, context);
    if ('__typename' in selectedFields) {
        formatted.__typename = (0, _utils.getGroupByConnectionTypename)(objectNameSingular);
    }
    if ('groupByDimensionValues' in selectedFields) {
        formatted.groupByDimensionValues = connection.groupByDimensionValues;
    }
    return formatted;
};
const backfillNullValuesAndComputeTypeNameForConnectionArray = (connections, selectedFields, objectNameSingular, context)=>{
    return connections.map((connection)=>backfillNullValuesAndComputeTypeNameForConnection(connection, selectedFields, objectNameSingular, context));
};
const getOrBuildFieldMetadataByNameMap = (objectNameSingular, context)=>{
    const cached = context.fieldMetadataByNameCache.get(objectNameSingular);
    if ((0, _utils.isDefined)(cached)) {
        return cached;
    }
    const map = new Map();
    const objectId = context.objectIdByNameSingular[objectNameSingular];
    if (!(0, _utils.isDefined)(objectId)) {
        context.fieldMetadataByNameCache.set(objectNameSingular, map);
        return map;
    }
    const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: objectId,
        flatEntityMaps: context.flatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(flatObjectMetadata)) {
        context.fieldMetadataByNameCache.set(objectNameSingular, map);
        return map;
    }
    for (const fieldId of flatObjectMetadata.fieldIds){
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldId,
            flatEntityMaps: context.flatFieldMetadataMaps
        });
        if ((0, _utils.isDefined)(fieldMetadata)) {
            map.set(fieldMetadata.name, fieldMetadata);
        }
    }
    context.fieldMetadataByNameCache.set(objectNameSingular, map);
    return map;
};
const findFieldMetadataByName = (objectNameSingular, fieldName, context)=>{
    return getOrBuildFieldMetadataByNameMap(objectNameSingular, context).get(fieldName);
};
const findRelationInfo = (objectNameSingular, fieldName, context)=>{
    const fieldMetadata = findFieldMetadataByName(objectNameSingular, fieldName, context);
    if (!(0, _utils.isDefined)(fieldMetadata) || !(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata)) {
        return undefined;
    }
    const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
        flatEntityMaps: context.flatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(targetObjectMetadata)) {
        return undefined;
    }
    return {
        targetObjectNameSingular: targetObjectMetadata.nameSingular,
        relationType: fieldMetadata.settings.relationType
    };
};

//# sourceMappingURL=graphql-format-result-from-selected-fields.util.js.map