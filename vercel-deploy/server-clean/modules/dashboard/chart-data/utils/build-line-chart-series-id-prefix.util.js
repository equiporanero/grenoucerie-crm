"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildLineChartSeriesIdPrefix", {
    enumerable: true,
    get: function() {
        return buildLineChartSeriesIdPrefix;
    }
});
const _crypto = require("crypto");
const buildLineChartSeriesIdPrefix = (objectMetadataId, configuration)=>{
    const hash = (0, _crypto.createHash)('sha256').update(objectMetadataId).update(':').update(JSON.stringify(configuration)).digest('hex').slice(0, 16);
    return `lc_${hash}:`;
};

//# sourceMappingURL=build-line-chart-series-id-prefix.util.js.map