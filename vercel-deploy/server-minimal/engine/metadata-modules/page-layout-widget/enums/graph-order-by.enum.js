"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphOrderBy", {
    enumerable: true,
    get: function() {
        return GraphOrderBy;
    }
});
const _graphql = require("@nestjs/graphql");
var GraphOrderBy = /*#__PURE__*/ function(GraphOrderBy) {
    GraphOrderBy["FIELD_ASC"] = "FIELD_ASC";
    GraphOrderBy["FIELD_DESC"] = "FIELD_DESC";
    GraphOrderBy["FIELD_POSITION_ASC"] = "FIELD_POSITION_ASC";
    GraphOrderBy["FIELD_POSITION_DESC"] = "FIELD_POSITION_DESC";
    GraphOrderBy["VALUE_ASC"] = "VALUE_ASC";
    GraphOrderBy["VALUE_DESC"] = "VALUE_DESC";
    GraphOrderBy["MANUAL"] = "MANUAL";
    return GraphOrderBy;
}({});
(0, _graphql.registerEnumType)(GraphOrderBy, {
    name: 'GraphOrderBy',
    description: 'Order by options for graph widgets'
});

//# sourceMappingURL=graph-order-by.enum.js.map