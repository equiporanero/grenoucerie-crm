"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectRecordsToGraphqlConnectionHelper", {
    enumerable: true,
    get: function() {
        return ObjectRecordsToGraphqlConnectionHelper;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _connectionmaxdepthconstant = require("../constants/connection-max-depth.constant");
const _graphqlqueryrunnerexception = require("../errors/graphql-query-runner.exception");
const _cursorsutil = require("../utils/cursors.util");
const _gettargetobjectmetadatautil = require("../utils/get-target-object-metadata.util");
const _iscompositefieldmetadatatypeutil = require("../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
let ObjectRecordsToGraphqlConnectionHelper = class ObjectRecordsToGraphqlConnectionHelper {
    createConnection({ objectRecords, parentObjectRecord, objectRecordsAggregatedValues = {}, selectedAggregatedFields = [], objectName, take, totalCount, order, hasNextPage, hasPreviousPage, depth = 0 }) {
        const edges = (objectRecords ?? []).map((objectRecord)=>({
                node: this.processRecord({
                    objectRecord,
                    objectName,
                    objectRecordsAggregatedValues,
                    selectedAggregatedFields,
                    take,
                    totalCount,
                    order,
                    depth
                }),
                cursor: (0, _cursorsutil.encodeCursor)(objectRecord, order)
            }));
        const aggregatedFieldsValues = this.extractAggregatedFieldsValues({
            selectedAggregatedFields,
            objectRecordsAggregatedValues: parentObjectRecord ? objectRecordsAggregatedValues[parentObjectRecord.id] : objectRecordsAggregatedValues
        });
        return {
            ...aggregatedFieldsValues,
            edges,
            pageInfo: {
                hasNextPage,
                hasPreviousPage,
                startCursor: edges[0]?.cursor,
                endCursor: edges[edges.length - 1]?.cursor
            },
            totalCount: totalCount
        };
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    processRecord({ objectRecord, objectName, objectRecordsAggregatedValues = {}, selectedAggregatedFields = [], take, totalCount, order, depth = 0 }) {
        if (depth >= _connectionmaxdepthconstant.CONNECTION_MAX_DEPTH) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Maximum depth of ${_connectionmaxdepthconstant.CONNECTION_MAX_DEPTH} reached`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.MAX_DEPTH_REACHED, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const objectMetadataId = this.objectIdByNameSingular[objectName];
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: objectMetadataId,
            flatEntityMaps: this.flatObjectMetadataMaps
        });
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const processedObjectRecord = {};
        for (const fieldId of flatObjectMetadata.fieldIds){
            const fieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: fieldId,
                flatEntityMaps: this.flatFieldMetadataMaps
            });
            if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
                const objectValue = objectRecord[fieldMetadata.name];
                if (!(0, _utils.isDefined)(objectValue)) {
                    continue;
                }
                processedObjectRecord[fieldMetadata.name] = this.processCompositeField(fieldMetadata, objectValue);
                continue;
            }
            if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata)) {
                const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
                    flatEntityMaps: this.flatObjectMetadataMaps
                });
                if (!(0, _utils.isDefined)(targetObjectMetadata)) {
                    continue;
                }
                const fieldMetadataNameWithId = `${fieldMetadata.name}Id`;
                if ((0, _utils.isDefined)(objectRecord[fieldMetadataNameWithId])) {
                    processedObjectRecord[fieldMetadataNameWithId] = objectRecord[fieldMetadataNameWithId];
                }
                const objectValue = objectRecord[fieldMetadata.name];
                if (!(0, _utils.isDefined)(objectValue)) {
                    continue;
                }
                if (Array.isArray(objectValue)) {
                    processedObjectRecord[fieldMetadata.name] = this.createConnection({
                        objectRecords: objectValue,
                        parentObjectRecord: objectRecord,
                        objectRecordsAggregatedValues: objectRecordsAggregatedValues[fieldMetadata.name],
                        selectedAggregatedFields: selectedAggregatedFields[fieldMetadata.name],
                        objectName: targetObjectMetadata.nameSingular,
                        take,
                        totalCount: objectRecordsAggregatedValues[fieldMetadata.name]?.totalCount ?? objectValue.length,
                        order,
                        hasNextPage: false,
                        hasPreviousPage: false,
                        depth: depth + 1
                    });
                } else if ((0, _utils.isPlainObject)(objectValue)) {
                    const targetObjectMetadataOrThrow = (0, _gettargetobjectmetadatautil.getTargetObjectMetadataOrThrow)(fieldMetadata, this.flatObjectMetadataMaps);
                    processedObjectRecord[fieldMetadata.name] = this.processRecord({
                        objectRecord: objectValue,
                        objectRecordsAggregatedValues: objectRecordsAggregatedValues[fieldMetadata.name],
                        selectedAggregatedFields: selectedAggregatedFields[fieldMetadata.name],
                        objectName: targetObjectMetadataOrThrow.nameSingular,
                        take,
                        totalCount,
                        order,
                        depth: depth + 1
                    });
                }
                continue;
            }
            const objectValue = objectRecord[fieldMetadata.name];
            if (!(0, _utils.isDefined)(objectValue)) {
                continue;
            }
            processedObjectRecord[fieldMetadata.name] = this.formatFieldValue(objectValue, fieldMetadata.type);
        }
        return processedObjectRecord;
    }
    processCompositeField(fieldMetadata, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    fieldValue) {
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
        if (!compositeType) {
            throw new Error(`Composite type definition not found for type: ${fieldMetadata.type}`);
        }
        return Object.entries(fieldValue).reduce((acc, [subFieldKey, subFieldValue])=>{
            if (subFieldKey === '__typename') return acc;
            const subFieldMetadata = compositeType.properties.find((property)=>property.name === subFieldKey);
            if (!subFieldMetadata) {
                throw new Error(`Sub field metadata not found for composite type: ${fieldMetadata.type}`);
            }
            acc[subFieldKey] = this.formatFieldValue(subFieldValue, subFieldMetadata.type);
            return acc;
        }, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        {});
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    formatFieldValue(value, fieldType) {
        switch(fieldType){
            case _types.FieldMetadataType.DATE:
            case _types.FieldMetadataType.DATE_TIME:
                return value instanceof Date ? value.toISOString() : value;
            default:
                return value;
        }
    }
    constructor(flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular){
        this.extractAggregatedFieldsValues = ({ selectedAggregatedFields, objectRecordsAggregatedValues })=>{
            if (!(0, _utils.isDefined)(objectRecordsAggregatedValues)) {
                return {};
            }
            return Object.entries(selectedAggregatedFields).reduce((acc, [aggregatedFieldName])=>{
                const aggregatedFieldValue = objectRecordsAggregatedValues[aggregatedFieldName];
                if (!(0, _utils.isDefined)(aggregatedFieldValue)) {
                    return acc;
                }
                return {
                    ...acc,
                    [aggregatedFieldName]: objectRecordsAggregatedValues[aggregatedFieldName]
                };
            }, {});
        };
        this.flatObjectMetadataMaps = flatObjectMetadataMaps;
        this.flatFieldMetadataMaps = flatFieldMetadataMaps;
        this.objectIdByNameSingular = objectIdByNameSingular;
    }
};

//# sourceMappingURL=object-records-to-graphql-connection.helper.js.map