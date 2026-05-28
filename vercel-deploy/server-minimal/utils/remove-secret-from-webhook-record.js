"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeSecretFromWebhookRecord", {
    enumerable: true,
    get: function() {
        return removeSecretFromWebhookRecord;
    }
});
const removeSecretFromWebhookRecord = (// oxlint-disable-next-line @typescripttypescript/no-explicit-any
record, isWebhookEvent)=>{
    if (!isWebhookEvent || !record) return record;
    const { secret: _secret, ...sanitizedRecord } = record;
    return sanitizedRecord;
};

//# sourceMappingURL=remove-secret-from-webhook-record.js.map