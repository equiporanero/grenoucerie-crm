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
    get formatCompositeField () {
        return formatCompositeField;
    },
    get formatData () {
        return formatData;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _iscompositefieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
function formatData(data, flatObjectMetadata, flatFieldMetadataMaps, fieldMapsForObject) {
    if (!data) {
        return data;
    }
    const fieldMaps = fieldMapsForObject ?? (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
    if (Array.isArray(data)) {
        return data.map((item)=>formatData(item, flatObjectMetadata, flatFieldMetadataMaps, fieldMaps));
    }
    const { fieldIdByName, fieldIdByJoinColumnName } = fieldMaps;
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    const newData = {};
    for (const [key, value] of Object.entries(data)){
        const fieldMetadataId = fieldIdByName[key] || fieldIdByJoinColumnName[key];
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!fieldMetadata) {
            throw new Error(`Field metadata for field "${key}" is missing in object metadata ${flatObjectMetadata.nameSingular}`);
        }
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
            const formattedCompositeField = formatCompositeField(value, fieldMetadata);
            Object.assign(newData, formattedCompositeField);
        } else {
            newData[key] = formatFieldMetadataValue(value, fieldMetadata);
        }
    }
    return newData;
}
function formatCompositeField(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
value, fieldMetadata) {
    const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
    if (!compositeType) {
        throw new Error(`Composite type definition not found for type: ${fieldMetadata.type}`);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    const formattedCompositeField = {};
    for (const property of compositeType.properties){
        const subFieldKey = property.name;
        const fullFieldName = `${fieldMetadata.name}${(0, _utils.capitalize)(subFieldKey)}`;
        if (value && value[subFieldKey] !== undefined) {
            formattedCompositeField[fullFieldName] = formatFieldMetadataValue(value[subFieldKey], property);
        }
    }
    return formattedCompositeField;
}
function formatFieldMetadataValue(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
value, fieldMetadata) {
    if (fieldMetadata.type === _types.FieldMetadataType.RAW_JSON && typeof value === 'string') {
        return JSON.parse(value);
    }
    return value;
}

//# sourceMappingURL=format-data.util.js.map