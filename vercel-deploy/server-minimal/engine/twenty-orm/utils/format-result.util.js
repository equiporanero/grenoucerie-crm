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
    get formatResult () {
        return formatResult;
    },
    get getCompositeFieldMetadataMap () {
        return getCompositeFieldMetadataMap;
    }
});
const _sharedutils = require("@nestjs/common/utils/shared.utils");
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _nullequivalentvaluesconstant = require("../../api/common/common-args-processors/data-arg-processor/constants/null-equivalent-values.constant");
const _getflatfieldsforflatobjectmetadatautil = require("../../api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _computecolumnnameutil = require("../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _getcompositefieldmetadatacollection = require("./get-composite-field-metadata-collection");
const _isfieldmetadataoftypeutil = require("../../utils/is-field-metadata-of-type.util");
function formatResult(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
data, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, fieldMapsForObject) {
    if (!(0, _utils.isDefined)(data)) {
        return data;
    }
    if (!(0, _sharedutils.isPlainObject)(data)) {
        if (Array.isArray(data)) {
            return data.map((item)=>formatResult(item, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, fieldMapsForObject));
        }
        return data;
    }
    if (!flatObjectMetadata) {
        throw new Error('Object metadata is missing');
    }
    const fieldMaps = fieldMapsForObject ?? (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
    const { fieldIdByName, fieldIdByJoinColumnName } = fieldMaps;
    const compositeFieldMetadataMap = getCompositeFieldMetadataMap(flatObjectMetadata, flatFieldMetadataMaps);
    const newData = {};
    for (const [key, value] of Object.entries(data)){
        const compositePropertyArgs = compositeFieldMetadataMap.get(key);
        const fieldMetadataId = fieldIdByName[key] || fieldIdByJoinColumnName[key] || fieldIdByName[compositePropertyArgs?.parentField ?? ''];
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(fieldMetadata)) {
            continue;
        }
        const isRelation = fieldMetadata ? (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(fieldMetadata, _types.FieldMetadataType.RELATION) : false;
        if (isRelation) {
            if (!(0, _utils.isDefined)(fieldMetadata?.relationTargetObjectMetadataId)) {
                throw new Error(`Relation target object metadata ID is missing for field "${key}"`);
            }
            const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
                flatEntityMaps: flatObjectMetadataMaps
            });
            if (!targetObjectMetadata) {
                throw new Error(`Object metadata for object metadataId "${fieldMetadata.relationTargetObjectMetadataId}" is missing`);
            }
            // @ts-expect-error legacy noImplicitAny
            newData[key] = formatResult(value, targetObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps);
            continue;
        }
        if ((0, _utils.isDefined)(compositePropertyArgs)) {
            const { parentField, ...compositeProperty } = compositePropertyArgs;
            // @ts-expect-error legacy noImplicitAny
            if (!newData[parentField]) {
                // @ts-expect-error legacy noImplicitAny
                newData[parentField] = {};
            }
            // @ts-expect-error legacy noImplicitAny
            newData[parentField][compositeProperty.name] = (0, _guards.isNull)(value) ? transformCompositeFieldNullValue(value, compositeProperty.name, fieldMetadata) : formatCompositeFieldValue(value, compositeProperty.name, fieldMetadata);
            continue;
        }
        const formattedFieldValue = formatFieldMetadataValue(value, fieldMetadata.type);
        // @ts-expect-error legacy noImplicitAny
        newData[key] = formattedFieldValue;
    }
    // After assembling composite fields, handle those with missing required subfields
    handleEmptyCompositeFields(newData, flatObjectMetadata, flatFieldMetadataMaps);
    const fieldMetadataItemsOfTypeDateOnly = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps).filter((field)=>field.type === _types.FieldMetadataType.DATE);
    for (const dateField of fieldMetadataItemsOfTypeDateOnly){
        // @ts-expect-error legacy noImplicitAny
        const rawUpdatedDate = newData[dateField.name];
        if (!(0, _utils.isDefined)(rawUpdatedDate)) {
            continue;
        }
        // @ts-expect-error legacy noImplicitAny
        newData[dateField.name] = rawUpdatedDate;
    }
    const fieldMetadataItemsOfTypeDateTimeOnly = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps).filter((field)=>field.type === _types.FieldMetadataType.DATE_TIME);
    for (const dateTimeField of fieldMetadataItemsOfTypeDateTimeOnly){
        // @ts-expect-error legacy noImplicitAny
        const rawUpdatedDateTime = newData[dateTimeField.name];
        if (!(0, _utils.isDefined)(rawUpdatedDateTime)) {
            continue;
        }
        if (typeof rawUpdatedDateTime === 'string' || rawUpdatedDateTime instanceof Date || (0, _sharedutils.isPlainObject)(rawUpdatedDateTime)) {
            // @ts-expect-error legacy noImplicitAny
            newData[dateTimeField.name] = rawUpdatedDateTime;
        } else {
            const stringifiedUnknownValue = (0, _utils.stringifySafely)(rawUpdatedDateTime);
            throw new Error(`Invalid DATE_TIME field "${dateTimeField.name}", value: "${stringifiedUnknownValue}", it should be a string, Date instance or plain object, (current type : ${typeof rawUpdatedDateTime}).`);
        }
    }
    return newData;
}
function getCompositeFieldMetadataMap(flatObjectMetadata, flatFieldMetadataMaps) {
    const compositeFieldMetadataCollection = (0, _getcompositefieldmetadatacollection.getCompositeFieldMetadataCollection)(flatObjectMetadata, flatFieldMetadataMaps);
    return new Map(compositeFieldMetadataCollection.flatMap((fieldMetadata)=>{
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
        if (!compositeType) return [];
        // Map each composite property to a [key, value] pair
        return compositeType.properties.map((compositeProperty)=>[
                (0, _computecolumnnameutil.computeCompositeColumnName)(fieldMetadata.name, compositeProperty),
                {
                    parentField: fieldMetadata.name,
                    ...compositeProperty
                }
            ]);
    }));
}
function formatFieldMetadataValue(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
value, fieldMetadataType) {
    if (typeof value === 'string' && (fieldMetadataType === _types.FieldMetadataType.MULTI_SELECT || fieldMetadataType === _types.FieldMetadataType.ARRAY)) {
        const cleanedValue = value.replace(/{|}/g, '').trim();
        return cleanedValue ? cleanedValue.split(',') : [];
    }
    if ((0, _guards.isNull)(value)) {
        if (fieldMetadataType === _types.FieldMetadataType.MULTI_SELECT || fieldMetadataType === _types.FieldMetadataType.ARRAY) {
            return _nullequivalentvaluesconstant.DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE;
        }
        if (fieldMetadataType === _types.FieldMetadataType.TEXT) {
            return _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE;
        }
        return value;
    }
    return value;
}
function transformCompositeFieldNullValue(value, compositePropertyName, fieldMetadata) {
    if (!(0, _guards.isNull)(value)) return value;
    return _nullequivalentvaluesconstant.DEFAULT_COMPOSITE_FIELDS_NULL_EQUIVALENT_VALUE[fieldMetadata.type]?.[compositePropertyName] ?? value;
}
function formatCompositeFieldValue(value, compositePropertyName, fieldMetadata) {
    switch(fieldMetadata.type){
        case _types.FieldMetadataType.CURRENCY:
            {
                if (compositePropertyName === 'amountMicros') {
                    if ((0, _guards.isNonEmptyString)(value)) {
                        return parseInt(value);
                    }
                    return value;
                }
            }
    }
    return value;
}
/**
 * Handles composite fields with missing required subfields.
 * - For nullable fields: sets to null if all required subfields are null
 * - For non-nullable fields: provides a default value to prevent GraphQL errors
 *
 * This handles existing records that were created before the field was added
 * or records with incomplete data.
 */ function handleEmptyCompositeFields(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
data, flatObjectMetadata, flatFieldMetadataMaps) {
    const compositeFieldMetadataCollection = (0, _getcompositefieldmetadatacollection.getCompositeFieldMetadataCollection)(flatObjectMetadata, flatFieldMetadataMaps);
    for (const fieldMetadata of compositeFieldMetadataCollection){
        const fieldValue = data[fieldMetadata.name];
        if (!(0, _utils.isDefined)(fieldValue) || !(0, _sharedutils.isPlainObject)(fieldValue)) {
            continue;
        }
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
        if (!compositeType) {
            continue;
        }
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const typedFieldValue = fieldValue;
        // Check if all required properties are null/undefined
        const requiredProperties = compositeType.properties.filter((prop)=>prop.isRequired);
        const allRequiredPropertiesAreNull = requiredProperties.every((prop)=>!(0, _utils.isDefined)(typedFieldValue[prop.name]) || (0, _guards.isNull)(typedFieldValue[prop.name]));
        if (allRequiredPropertiesAreNull && requiredProperties.length > 0) {
            if (fieldMetadata.isNullable) {
                // Field is nullable, set to null
                data[fieldMetadata.name] = null;
            } else {
                // Field is non-nullable, provide a default value
                data[fieldMetadata.name] = getDefaultCompositeFieldValue(fieldMetadata.type);
            }
        }
    }
}
/**
 * Returns a default value for non-nullable composite fields.
 */ function getDefaultCompositeFieldValue(fieldType) {
    switch(fieldType){
        case _types.FieldMetadataType.ACTOR:
            return {
                source: _types.FieldActorSource.MANUAL,
                name: '',
                workspaceMemberId: null,
                context: {}
            };
        default:
            // For other composite types, return null and let GraphQL handle the error
            // This should be extended as needed for other non-nullable composite fields
            return null;
    }
}

//# sourceMappingURL=format-result.util.js.map