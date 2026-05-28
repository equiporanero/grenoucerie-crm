"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BarChartLayout", {
    enumerable: true,
    get: function() {
        return BarChartLayout;
    }
});
const _graphql = require("@nestjs/graphql");
var BarChartLayout = /*#__PURE__*/ function(BarChartLayout) {
    BarChartLayout["VERTICAL"] = "VERTICAL";
    BarChartLayout["HORIZONTAL"] = "HORIZONTAL";
    return BarChartLayout;
}({});
(0, _graphql.registerEnumType)(BarChartLayout, {
    name: 'BarChartLayout',
    description: 'Layout orientation for bar charts'
});

//# sourceMappingURL=bar-chart-layout.enum.js.map