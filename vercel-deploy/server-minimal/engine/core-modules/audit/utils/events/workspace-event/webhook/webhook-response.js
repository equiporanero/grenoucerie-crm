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
    get WEBHOOK_RESPONSE_EVENT () {
        return WEBHOOK_RESPONSE_EVENT;
    },
    get webhookResponseSchema () {
        return webhookResponseSchema;
    }
});
const _zod = require("zod");
const _track = require("../track");
const WEBHOOK_RESPONSE_EVENT = 'Webhook Response';
const webhookResponseSchema = _zod.z.strictObject({
    event: _zod.z.literal(WEBHOOK_RESPONSE_EVENT),
    properties: _zod.z.strictObject({
        status: _zod.z.number().optional(),
        success: _zod.z.boolean(),
        url: _zod.z.string(),
        webhookId: _zod.z.string(),
        eventName: _zod.z.string(),
        error: _zod.z.string().optional()
    })
});
(0, _track.registerEvent)(WEBHOOK_RESPONSE_EVENT, webhookResponseSchema);

//# sourceMappingURL=webhook-response.js.map