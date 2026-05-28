"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BarChartGroupMode", {
    enumerable: true,
    get: function() {
        return BarChartGroupMode;
    }
});
const _graphql = require("@nestjs/graphql");
var BarChartGroupMode = /*#__PURE__*/ function(BarChartGroupMode) {
    BarChartGroupMode["STACKED"] = "STACKED";
    BarChartGroupMode["GROUPED"] = "GROUPED";
    return BarChartGroupMode;
}({});
(0, _graphql.registerEnumType)(BarChartGroupMode, {
    name: 'BarChartGroupMode',
    description: 'Display mode for bar charts with secondary grouping'
});

//# sourceMappingURL=bar-chart-group-mode.enum.js.map