"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueMetricsTimeRange", {
    enumerable: true,
    get: function() {
        return QueueMetricsTimeRange;
    }
});
const _graphql = require("@nestjs/graphql");
var QueueMetricsTimeRange = /*#__PURE__*/ function(QueueMetricsTimeRange) {
    QueueMetricsTimeRange["SevenDays"] = "7D";
    QueueMetricsTimeRange["OneDay"] = "1D";
    QueueMetricsTimeRange["TwelveHours"] = "12H";
    QueueMetricsTimeRange["FourHours"] = "4H";
    QueueMetricsTimeRange["OneHour"] = "1H";
    return QueueMetricsTimeRange;
}({});
(0, _graphql.registerEnumType)(QueueMetricsTimeRange, {
    name: 'QueueMetricsTimeRange'
});

//# sourceMappingURL=queue-metrics-time-range.enum.js.map