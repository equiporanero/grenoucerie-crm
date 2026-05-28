"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HEALTH_INDICATORS", {
    enumerable: true,
    get: function() {
        return HEALTH_INDICATORS;
    }
});
const _healthindicatoridenum = require("../enums/health-indicator-id.enum");
const HEALTH_INDICATORS = {
    [_healthindicatoridenum.HealthIndicatorId.database]: {
        id: _healthindicatoridenum.HealthIndicatorId.database,
        label: 'Database',
        description: 'PostgreSQL database connection status'
    },
    [_healthindicatoridenum.HealthIndicatorId.redis]: {
        id: _healthindicatoridenum.HealthIndicatorId.redis,
        label: 'Redis',
        description: 'Redis connection status'
    },
    [_healthindicatoridenum.HealthIndicatorId.worker]: {
        id: _healthindicatoridenum.HealthIndicatorId.worker,
        label: 'Worker',
        description: 'Background job worker health status'
    },
    [_healthindicatoridenum.HealthIndicatorId.connectedAccount]: {
        id: _healthindicatoridenum.HealthIndicatorId.connectedAccount,
        label: 'Connected Accounts',
        description: 'Connected accounts health status'
    },
    [_healthindicatoridenum.HealthIndicatorId.app]: {
        id: _healthindicatoridenum.HealthIndicatorId.app,
        label: 'App',
        description: 'Workspace metadata migration status check'
    }
};

//# sourceMappingURL=health-indicators.constants.js.map