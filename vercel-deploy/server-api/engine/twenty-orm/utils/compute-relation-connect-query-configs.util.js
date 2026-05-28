"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeRelationConnectQueryConfigs", {
    enumerable: true,
    get: function() {
        return computeRelationConnectQueryConfigs;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _relationtypeinterface = require("../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _getflatfieldsforflatobjectmetadatautil = require("../../api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _iscompositefieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findmanyflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const _formatdatautil = require("./format-data.util");
const _getassociatedrelationfieldnameutil = require("./get-associated-relation-field-name.util");
const _isfieldmetadataoftypeutil = require("../../utils/is-field-metadata-of-type.util");
const computeRelationConnectQueryConfigs = (entities, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, flatIndexMaps, relationConnectQueryFieldsByEntityIndex)=>{
    const allConnectQueryConfigs = {};
    const fieldMaps = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
    for (const [entityIndex, entity] of entities.entries()){
        const nestedRelationConnectFields = relationConnectQueryFieldsByEntityIndex[entityIndex];
        if (!(0, _utils.isDefined)(nestedRelationConnectFields)) continue;
        for (const [connectFieldName, connectObject] of Object.entries(nestedRelationConnectFields)){
            const { recordToConnectCondition, uniqueConstraintFields, targetObjectNameSingular } = computeRecordToConnectCondition(connectFieldName, connectObject, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, flatIndexMaps, entity, fieldMaps);
            const connectQueryConfig = allConnectQueryConfigs[connectFieldName];
            if ((0, _utils.isDefined)(connectQueryConfig)) {
                checkUniqueConstraintsAreSameOrThrow(connectQueryConfig, uniqueConstraintFields);
                allConnectQueryConfigs[connectFieldName] = updateConnectQueryConfigs(connectQueryConfig, recordToConnectCondition, entityIndex);
            } else {
                allConnectQueryConfigs[connectFieldName] = createConnectQueryConfig(connectFieldName, recordToConnectCondition, uniqueConstraintFields, targetObjectNameSingular, entityIndex);
            }
        }
    }
    return Object.values(allConnectQueryConfigs);
};
const updateConnectQueryConfigs = (connectQueryConfig, recordToConnectCondition, entityIndex)=>{
    return {
        ...connectQueryConfig,
        recordToConnectConditions: [
            ...connectQueryConfig.recordToConnectConditions,
            recordToConnectCondition
        ],
        recordToConnectConditionByEntityIndex: {
            ...connectQueryConfig.recordToConnectConditionByEntityIndex,
            [entityIndex]: recordToConnectCondition
        }
    };
};
const createConnectQueryConfig = (connectFieldName, recordToConnectCondition, uniqueConstraintFields, targetObjectNameSingular, entityIndex)=>{
    return {
        targetObjectName: targetObjectNameSingular,
        recordToConnectConditions: [
            recordToConnectCondition
        ],
        relationFieldName: (0, _getassociatedrelationfieldnameutil.getAssociatedRelationFieldName)(connectFieldName),
        connectFieldName,
        uniqueConstraintFields,
        recordToConnectConditionByEntityIndex: {
            [entityIndex]: recordToConnectCondition
        }
    };
};
const computeRecordToConnectCondition = (connectFieldName, connectObject, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, flatIndexMaps, entity, fieldMaps)=>{
    const field = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: fieldMaps.fieldIdByName[connectFieldName],
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(field) || !(0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.RELATION) && !(0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.MORPH_RELATION) || field.settings?.relationType !== _relationtypeinterface.RelationType.MANY_TO_ONE) {
        const objectMetadataNameSingular = flatObjectMetadata.nameSingular;
        throw new _twentyormexception.TwentyORMException(`Connect is not allowed for ${connectFieldName} on ${flatObjectMetadata.nameSingular}`, _twentyormexception.TwentyORMExceptionCode.CONNECT_NOT_ALLOWED, {
            userFriendlyMessage: /*i18n*/ {
                id: "1fFL4B",
                message: "Connect is not allowed for {connectFieldName} on {objectMetadataNameSingular}",
                values: {
                    connectFieldName: connectFieldName,
                    objectMetadataNameSingular: objectMetadataNameSingular
                }
            }
        });
    }
    checkNoRelationFieldConflictOrThrow(entity, connectFieldName);
    const targetObjectMetadata = field.relationTargetObjectMetadataId ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: field.relationTargetObjectMetadataId,
        flatEntityMaps: flatObjectMetadataMaps
    }) : undefined;
    if (!(0, _utils.isDefined)(targetObjectMetadata)) {
        throw new _twentyormexception.TwentyORMException(`Target object metadata not found for ${connectFieldName}`, _twentyormexception.TwentyORMExceptionCode.MALFORMED_METADATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "5y3Wbw",
                message: "Target object metadata not found for {connectFieldName}",
                values: {
                    connectFieldName: connectFieldName
                }
            }
        });
    }
    const uniqueConstraintFields = checkUniqueConstraintFullyPopulated(targetObjectMetadata, flatFieldMetadataMaps, flatIndexMaps, connectObject, connectFieldName);
    return {
        recordToConnectCondition: computeUniqueConstraintCondition(uniqueConstraintFields, connectObject),
        uniqueConstraintFields,
        targetObjectNameSingular: targetObjectMetadata.nameSingular
    };
};
const checkUniqueConstraintFullyPopulated = (flatObjectMetadata, flatFieldMetadataMaps, flatIndexMaps, connectObject, connectFieldName)=>{
    const fields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps);
    const indexMetadatas = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
        flatEntityIds: flatObjectMetadata.indexMetadataIds,
        flatEntityMaps: flatIndexMaps
    }).map((index)=>({
            id: index.id,
            isUnique: index.isUnique,
            indexFieldMetadatas: index.flatIndexFieldMetadatas.map((fieldMetadata)=>({
                    fieldMetadataId: fieldMetadata.fieldMetadataId
                }))
        }));
    const uniqueConstraintsFields = (0, _utils.getUniqueConstraintsFields)({
        id: flatObjectMetadata.id,
        indexMetadatas,
        fields
    });
    const hasUniqueConstraintFieldFullyPopulated = uniqueConstraintsFields.some((uniqueConstraintFields)=>uniqueConstraintFields.every((uniqueConstraintField)=>(0, _utils.isDefined)(connectObject.connect.where[uniqueConstraintField.name])));
    if (!hasUniqueConstraintFieldFullyPopulated) {
        throw new _twentyormexception.TwentyORMException(`Missing required fields: at least one unique constraint have to be fully populated for '${connectFieldName}'.`, _twentyormexception.TwentyORMExceptionCode.CONNECT_UNIQUE_CONSTRAINT_ERROR, {
            userFriendlyMessage: /*i18n*/ {
                id: "SzCMUQ",
                message: "Missing required fields: at least one unique constraint have to be fully populated for '{connectFieldName}'.",
                values: {
                    connectFieldName: connectFieldName
                }
            }
        });
    }
    return Object.keys(connectObject.connect.where).map((key)=>{
        const field = uniqueConstraintsFields.flat().find((uniqueConstraintField)=>uniqueConstraintField.name === key);
        if (!(0, _utils.isDefined)(field)) {
            throw new _twentyormexception.TwentyORMException(`Field ${key} is not a unique constraint field for '${connectFieldName}'.`, _twentyormexception.TwentyORMExceptionCode.CONNECT_UNIQUE_CONSTRAINT_ERROR);
        }
        return field;
    });
};
const checkNoRelationFieldConflictOrThrow = (entity, fieldName)=>{
    const hasRelationFieldConflict = (0, _utils.isDefined)(entity[fieldName]) && (0, _utils.isDefined)(entity[`${fieldName}Id`]);
    if (hasRelationFieldConflict) {
        throw new _twentyormexception.TwentyORMException(`${fieldName} and ${fieldName}Id cannot be both provided.`, _twentyormexception.TwentyORMExceptionCode.CONNECT_NOT_ALLOWED, {
            userFriendlyMessage: /*i18n*/ {
                id: "Q0ISF1",
                message: "{fieldName} and {fieldName}Id cannot be both provided.",
                values: {
                    fieldName: fieldName
                }
            }
        });
    }
};
const computeUniqueConstraintCondition = (uniqueConstraintFields, connectObject)=>{
    return uniqueConstraintFields.reduce((acc, uniqueConstraintField)=>{
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(uniqueConstraintField.type)) {
            return [
                ...acc,
                ...Object.entries((0, _formatdatautil.formatCompositeField)(connectObject.connect.where[uniqueConstraintField.name], uniqueConstraintField))
            ];
        }
        return [
            ...acc,
            [
                uniqueConstraintField.name,
                connectObject.connect.where[uniqueConstraintField.name]
            ]
        ];
    }, []);
};
const checkUniqueConstraintsAreSameOrThrow = (relationConnectQueryConfig, uniqueConstraintFields)=>{
    if (!(0, _utils.fastDeepEqual)(relationConnectQueryConfig.uniqueConstraintFields, uniqueConstraintFields)) {
        const connectFieldName = relationConnectQueryConfig.connectFieldName;
        throw new _twentyormexception.TwentyORMException(`Expected the same constraint fields to be used consistently across all operations for ${relationConnectQueryConfig.connectFieldName}.`, _twentyormexception.TwentyORMExceptionCode.CONNECT_UNIQUE_CONSTRAINT_ERROR, {
            userFriendlyMessage: /*i18n*/ {
                id: "AiFXmG",
                message: "Expected the same constraint fields to be used consistently across all operations for {connectFieldName}.",
                values: {
                    connectFieldName: connectFieldName
                }
            }
        });
    }
};

//# sourceMappingURL=compute-relation-connect-query-configs.util.js.map