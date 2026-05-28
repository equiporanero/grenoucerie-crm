"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HealthIndicatorId", {
    enumerable: true,
    get: function() {
        return HealthIndicatorId;
    }
});
const _graphql = require("@nestjs/graphql");
var HealthIndicatorId = /*#__PURE__*/ function(HealthIndicatorId) {
    HealthIndicatorId["database"] = "database";
    HealthIndicatorId["redis"] = "redis";
    HealthIndicatorId["worker"] = "worker";
    HealthIndicatorId["connectedAccount"] = "connectedAccount";
    HealthIndicatorId["app"] = "app";
    return HealthIndicatorId;
}({});
(0, _graphql.registerEnumType)(HealthIndicatorId, {
    name: 'HealthIndicatorId'
});

//# sourceMappingURL=health-indicator-id.enum.js.map