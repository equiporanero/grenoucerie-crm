"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getColumnNameToFieldMetadataIdMap", {
    enumerable: true,
    get: function() {
        return getColumnNameToFieldMetadataIdMap;
    }
});
const _utils = require("twenty-shared/utils");
const _computecolumnnameutil = require("../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _processfieldmetadataforcolumnnamemappingutil = require("./process-field-metadata-for-column-name-mapping.util");
function getColumnNameToFieldMetadataIdMap(flatObjectMetadata, flatFieldMetadataMaps) {
    const columnNameToFieldMetadataIdMap = {};
    const processor = {
        processCompositeField: ({ fieldMetadataId, fieldMetadata, compositeType })=>{
            compositeType.properties.forEach((compositeProperty)=>{
                const columnName = (0, _computecolumnnameutil.computeCompositeColumnName)(fieldMetadata.name, compositeProperty);
                columnNameToFieldMetadataIdMap[columnName] = fieldMetadataId;
            });
        },
        processRelationField: ({ fieldMetadataId, joinColumnName, connectFieldName })=>{
            columnNameToFieldMetadataIdMap[joinColumnName] = fieldMetadataId;
            if ((0, _utils.isDefined)(connectFieldName)) {
                columnNameToFieldMetadataIdMap[connectFieldName] = fieldMetadataId;
            }
        },
        processSimpleField: ({ fieldMetadataId, columnName })=>{
            columnNameToFieldMetadataIdMap[columnName] = fieldMetadataId;
        }
    };
    (0, _processfieldmetadataforcolumnnamemappingutil.processFieldMetadataForColumnNameMapping)(flatObjectMetadata, flatFieldMetadataMaps, processor);
    return columnNameToFieldMetadataIdMap;
}

//# sourceMappingURL=get-column-name-to-field-metadata-id.util.js.map