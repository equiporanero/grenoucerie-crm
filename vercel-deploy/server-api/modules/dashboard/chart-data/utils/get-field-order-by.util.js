"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFieldOrderBy", {
    enumerable: true,
    get: function() {
        return getFieldOrderBy;
    }
});
const _utils = require("twenty-shared/utils");
const _iscompositefieldmetadatatypeutil = require("../../../../engine/metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _graphdefaultdategranularityconstant = require("../constants/graph-default-date-granularity.constant");
const _getrelationfieldorderbyutil = require("./get-relation-field-order-by.util");
const getFieldOrderBy = (groupByFieldMetadata, groupBySubFieldName, dateGranularity, direction)=>{
    if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(groupByFieldMetadata.type)) {
        if (!(0, _utils.isDefined)(groupBySubFieldName)) {
            throw new Error(`Group by subFieldName is required for composite fields (field: ${groupByFieldMetadata.name})`);
        }
        return {
            [groupByFieldMetadata.name]: {
                [groupBySubFieldName]: direction
            }
        };
    }
    if ((0, _utils.isFieldMetadataDateKind)(groupByFieldMetadata.type)) {
        return {
            [groupByFieldMetadata.name]: {
                orderBy: direction,
                granularity: dateGranularity ?? _graphdefaultdategranularityconstant.GRAPH_DEFAULT_DATE_GRANULARITY
            }
        };
    }
    if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(groupByFieldMetadata)) {
        return (0, _getrelationfieldorderbyutil.getRelationFieldOrderBy)(groupByFieldMetadata, groupBySubFieldName, direction, dateGranularity);
    }
    return {
        [groupByFieldMetadata.name]: direction
    };
};

//# sourceMappingURL=get-field-order-by.util.js.map