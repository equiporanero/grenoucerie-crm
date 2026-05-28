"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFieldMetadataIdToColumnNamesMap", {
    enumerable: true,
    get: function() {
        return getFieldMetadataIdToColumnNamesMap;
    }
});
const _computecolumnnameutil = require("../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _processfieldmetadataforcolumnnamemappingutil = require("./process-field-metadata-for-column-name-mapping.util");
function getFieldMetadataIdToColumnNamesMap(flatObjectMetadata, flatFieldMetadataMaps) {
    const fieldMetadataToColumnNamesMap = new Map();
    const processor = {
        processCompositeField: ({ fieldMetadataId, fieldMetadata, compositeType })=>{
            compositeType.properties.forEach((compositeProperty)=>{
                const columnName = (0, _computecolumnnameutil.computeCompositeColumnName)(fieldMetadata.name, compositeProperty);
                const existingColumns = fieldMetadataToColumnNamesMap.get(fieldMetadataId) ?? [];
                fieldMetadataToColumnNamesMap.set(fieldMetadataId, [
                    ...existingColumns,
                    columnName
                ]);
            });
        },
        processRelationField: ({ fieldMetadataId, joinColumnName })=>{
            fieldMetadataToColumnNamesMap.set(fieldMetadataId, [
                joinColumnName
            ]);
        },
        processSimpleField: ({ fieldMetadataId, columnName })=>{
            fieldMetadataToColumnNamesMap.set(fieldMetadataId, [
                columnName
            ]);
        }
    };
    (0, _processfieldmetadataforcolumnnamemappingutil.processFieldMetadataForColumnNameMapping)(flatObjectMetadata, flatFieldMetadataMaps, processor);
    return fieldMetadataToColumnNamesMap;
}

//# sourceMappingURL=get-field-metadata-id-to-column-names-map.util.js.map