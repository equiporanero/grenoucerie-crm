"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CALENDAR_SYNC_METRICS_BY_STATUS () {
        return CALENDAR_SYNC_METRICS_BY_STATUS;
    },
    get MESSAGE_SYNC_METRICS_BY_STATUS () {
        return MESSAGE_SYNC_METRICS_BY_STATUS;
    }
});
const _metricskeystype = require("../types/metrics-keys.type");
const MESSAGE_SYNC_METRICS_BY_STATUS = [
    {
        name: 'ACTIVE',
        cacheKey: _metricskeystype.MetricsKeys.MessageChannelSyncJobActive
    },
    {
        name: 'FAILED_UNKNOWN',
        cacheKey: _metricskeystype.MetricsKeys.MessageChannelSyncJobFailedUnknown
    },
    {
        name: 'FAILED_INSUFFICIENT_PERMISSIONS',
        cacheKey: _metricskeystype.MetricsKeys.MessageChannelSyncJobFailedInsufficientPermissions
    }
];
const CALENDAR_SYNC_METRICS_BY_STATUS = [
    {
        name: 'ACTIVE',
        cacheKey: _metricskeystype.MetricsKeys.CalendarEventSyncJobActive
    },
    {
        name: 'FAILED_UNKNOWN',
        cacheKey: _metricskeystype.MetricsKeys.CalendarEventSyncJobFailedUnknown
    },
    {
        name: 'FAILED_INSUFFICIENT_PERMISSIONS',
        cacheKey: _metricskeystype.MetricsKeys.CalendarEventSyncJobFailedInsufficientPermissions
    }
];

//# sourceMappingURL=account-sync-metrics-by-status.constant.js.map