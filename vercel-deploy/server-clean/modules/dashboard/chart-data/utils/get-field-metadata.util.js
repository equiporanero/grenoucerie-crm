"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFieldMetadata", {
    enumerable: true,
    get: function() {
        return getFieldMetadata;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _chartdataexception = require("../exceptions/chart-data.exception");
const getFieldMetadata = (fieldMetadataId, flatFieldMetadataMaps)=>{
    const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: fieldMetadataId,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(fieldMetadata)) {
        throw new _chartdataexception.ChartDataException((0, _chartdataexception.generateChartDataExceptionMessage)(_chartdataexception.ChartDataExceptionCode.FIELD_METADATA_NOT_FOUND, fieldMetadataId), _chartdataexception.ChartDataExceptionCode.FIELD_METADATA_NOT_FOUND);
    }
    return fieldMetadata;
};

//# sourceMappingURL=get-field-metadata.util.js.map