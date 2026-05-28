"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getGroupByOrderBy", {
    enumerable: true,
    get: function() {
        return getGroupByOrderBy;
    }
});
const _utils = require("twenty-shared/utils");
const _graphorderbyenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _buildaggregatefieldkeyutil = require("./build-aggregate-field-key.util");
const _getfieldorderbyutil = require("./get-field-order-by.util");
const _maporderbytodirectionutil = require("./map-order-by-to-direction.util");
const getGroupByOrderBy = ({ graphOrderBy, groupByFieldMetadata, groupBySubFieldName, aggregateOperation, aggregateFieldMetadata, dateGranularity })=>{
    switch(graphOrderBy){
        case _graphorderbyenum.GraphOrderBy.FIELD_ASC:
        case _graphorderbyenum.GraphOrderBy.FIELD_DESC:
            return (0, _getfieldorderbyutil.getFieldOrderBy)(groupByFieldMetadata, groupBySubFieldName, dateGranularity, (0, _maporderbytodirectionutil.mapOrderByToDirection)(graphOrderBy));
        case _graphorderbyenum.GraphOrderBy.VALUE_ASC:
        case _graphorderbyenum.GraphOrderBy.VALUE_DESC:
            {
                if (!(0, _utils.isDefined)(aggregateOperation) || !(0, _utils.isDefined)(aggregateFieldMetadata)) {
                    throw new Error(`Aggregate operation or field metadata not found (field: ${groupByFieldMetadata.name})`);
                }
                const aggregateFieldKey = (0, _buildaggregatefieldkeyutil.buildAggregateFieldKey)({
                    aggregateOperation,
                    aggregateFieldMetadata
                });
                return {
                    aggregate: {
                        [aggregateFieldKey]: (0, _maporderbytodirectionutil.mapOrderByToDirection)(graphOrderBy)
                    }
                };
            }
        case _graphorderbyenum.GraphOrderBy.FIELD_POSITION_ASC:
        case _graphorderbyenum.GraphOrderBy.FIELD_POSITION_DESC:
        case _graphorderbyenum.GraphOrderBy.MANUAL:
            return undefined;
        default:
            (0, _utils.assertUnreachable)(graphOrderBy);
    }
};

//# sourceMappingURL=get-group-by-order-by.util.js.map