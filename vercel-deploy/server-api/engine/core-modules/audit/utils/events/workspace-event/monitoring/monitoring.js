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
    get MONITORING_EVENT () {
        return MONITORING_EVENT;
    },
    get monitoringSchema () {
        return monitoringSchema;
    }
});
const _zod = require("zod");
const _track = require("../track");
const MONITORING_EVENT = 'Monitoring';
const monitoringSchema = _zod.z.strictObject({
    event: _zod.z.literal(MONITORING_EVENT),
    properties: _zod.z.strictObject({
        eventName: _zod.z.string(),
        connectedAccountId: _zod.z.string().optional(),
        messageChannelId: _zod.z.string().optional(),
        message: _zod.z.string().optional()
    })
});
(0, _track.registerEvent)(MONITORING_EVENT, monitoringSchema);

//# sourceMappingURL=monitoring.js.map