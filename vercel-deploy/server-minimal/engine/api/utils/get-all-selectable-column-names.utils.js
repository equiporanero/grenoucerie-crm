"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllSelectableColumnNames", {
    enumerable: true,
    get: function() {
        return getAllSelectableColumnNames;
    }
});
const _utils = require("twenty-shared/utils");
const _getfieldmetadataidtocolumnnamesmaputil = require("../../twenty-orm/utils/get-field-metadata-id-to-column-names-map.util");
const getAllSelectableColumnNames = ({ restrictedFields, objectMetadata })=>{
    const restrictedFieldsIds = Object.entries(restrictedFields).filter(([_, value])=>value.canRead === false).map(([key])=>key);
    const fieldMetadataIdToColumnNamesMap = (0, _getfieldmetadataidtocolumnnamesmaputil.getFieldMetadataIdToColumnNamesMap)(objectMetadata.objectMetadataMapItem, objectMetadata.flatFieldMetadataMaps);
    const restrictedFieldsColumnNames = restrictedFieldsIds.map((fieldId)=>fieldMetadataIdToColumnNamesMap.get(fieldId)).filter(_utils.isDefined).flat();
    const allColumnNames = [
        ...fieldMetadataIdToColumnNamesMap.values()
    ].flat();
    const restrictedFieldsColumnNamesSet = new Set(restrictedFieldsColumnNames);
    return Object.fromEntries(allColumnNames.map((columnName)=>[
            columnName,
            !restrictedFieldsColumnNamesSet.has(columnName)
        ]));
};

//# sourceMappingURL=get-all-selectable-column-names.utils.js.map