"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HEALTH_ERROR_MESSAGES", {
    enumerable: true,
    get: function() {
        return HEALTH_ERROR_MESSAGES;
    }
});
const HEALTH_ERROR_MESSAGES = {
    NO_ACTIVE_WORKERS: 'No active workers found',
    WORKER_TIMEOUT: 'Worker check timeout',
    DATABASE_TIMEOUT: 'Database timeout',
    REDIS_TIMEOUT: 'Redis timeout',
    DATABASE_CONNECTION_FAILED: 'Database connection failed',
    REDIS_CONNECTION_FAILED: 'Unknown Redis error',
    WORKER_CHECK_FAILED: 'Worker check failed',
    MESSAGE_SYNC_TIMEOUT: 'Message sync check timeout',
    MESSAGE_SYNC_CHECK_FAILED: 'Message sync check failed',
    MESSAGE_SYNC_HIGH_FAILURE_RATE: 'High failure rate in message sync jobs',
    CALENDAR_SYNC_TIMEOUT: 'Calendar sync check timeout',
    CALENDAR_SYNC_CHECK_FAILED: 'Calendar sync check failed',
    CALENDAR_SYNC_HIGH_FAILURE_RATE: 'High failure rate in calendar sync jobs',
    APP_HEALTH_CHECK_FAILED: 'App health check failed'
};

//# sourceMappingURL=health-error-messages.constants.js.map