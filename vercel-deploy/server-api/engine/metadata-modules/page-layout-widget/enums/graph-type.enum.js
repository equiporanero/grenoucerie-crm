"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphType", {
    enumerable: true,
    get: function() {
        return GraphType;
    }
});
const _graphql = require("@nestjs/graphql");
var GraphType = /*#__PURE__*/ function(GraphType) {
    GraphType["AGGREGATE_CHART"] = "AGGREGATE_CHART";
    GraphType["GAUGE_CHART"] = "GAUGE_CHART";
    GraphType["PIE_CHART"] = "PIE_CHART";
    GraphType["BAR_CHART"] = "BAR_CHART";
    GraphType["LINE_CHART"] = "LINE_CHART";
    return GraphType;
}({});
(0, _graphql.registerEnumType)(GraphType, {
    name: 'GraphType',
    description: 'Type of graph widget'
});

//# sourceMappingURL=graph-type.enum.js.map