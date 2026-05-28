"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isChartReferencingFieldInConfiguration", {
    enumerable: true,
    get: function() {
        return isChartReferencingFieldInConfiguration;
    }
});
const _graphconfigurationtypesconstant = require("../constants/graph-configuration-types.constant");
const isChartReferencingFieldInConfiguration = (configuration)=>_graphconfigurationtypesconstant.GRAPH_CONFIGURATION_TYPES.has(configuration.configurationType);

//# sourceMappingURL=is-chart-referencing-field-in-configuration.util.js.map