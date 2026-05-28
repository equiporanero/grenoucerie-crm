"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "objectRecordChangedValues", {
    enumerable: true,
    get: function() {
        return objectRecordChangedValues;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const objectRecordChangedValues = (oldRecord, newRecord, objectMetadataItem, flatFieldMetadataMaps)=>{
    const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, objectMetadataItem);
    return Object.keys(newRecord).reduce((acc, key)=>{
        const fieldId = fieldIdByName[key];
        const field = fieldId ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldId,
            flatEntityMaps: flatFieldMetadataMaps
        }) : undefined;
        const oldRecordValue = oldRecord[key];
        const newRecordValue = newRecord[key];
        if (key === 'updatedAt' || key === 'searchVector' || field?.type === _types.FieldMetadataType.RELATION || field?.type === _types.FieldMetadataType.POSITION) {
            return acc;
        }
        if ((0, _utils.fastDeepEqual)(oldRecordValue, newRecordValue)) {
            return acc;
        }
        acc[key] = {
            before: oldRecordValue,
            after: newRecordValue
        };
        return acc;
    }, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    {});
};

//# sourceMappingURL=object-record-changed-values.js.map