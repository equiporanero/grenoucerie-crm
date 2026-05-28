"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mapOrderByToDirection", {
    enumerable: true,
    get: function() {
        return mapOrderByToDirection;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _graphorderbyenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const mapOrderByToDirection = (orderByEnum)=>{
    switch(orderByEnum){
        case _graphorderbyenum.GraphOrderBy.FIELD_ASC:
            return _types.OrderByDirection.AscNullsLast;
        case _graphorderbyenum.GraphOrderBy.FIELD_DESC:
            return _types.OrderByDirection.DescNullsLast;
        case _graphorderbyenum.GraphOrderBy.VALUE_ASC:
            return _types.OrderByDirection.AscNullsLast;
        case _graphorderbyenum.GraphOrderBy.VALUE_DESC:
            return _types.OrderByDirection.DescNullsLast;
        default:
            (0, _utils.assertUnreachable)(orderByEnum);
    }
};

//# sourceMappingURL=map-order-by-to-direction.util.js.map