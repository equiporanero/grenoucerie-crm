"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterValidFieldsInRecord", {
    enumerable: true,
    get: function() {
        return filterValidFieldsInRecord;
    }
});
const _utils = require("twenty-shared/utils");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const filterValidFieldsInRecord = (record, flatObjectMetadata, flatFieldMetadataMaps)=>{
    const { fieldIdByName, fieldIdByJoinColumnName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
    const filteredRecord = {};
    for (const [key, value] of Object.entries(record)){
        const fieldMetadataId = fieldIdByName[key] || fieldIdByJoinColumnName[key];
        if ((0, _utils.isDefined)(fieldMetadataId)) {
            filteredRecord[key] = value;
        }
    }
    return filteredRecord;
};

//# sourceMappingURL=filter-valid-fields-in-record.util.js.map