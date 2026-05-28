"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformEventToWebhookEvent", {
    enumerable: true,
    get: function() {
        return transformEventToWebhookEvent;
    }
});
const _utils = require("twenty-shared/utils");
const _removesecretfromwebhookrecord = require("../../../../utils/remove-secret-from-webhook-record");
const transformEventToWebhookEvent = ({ eventName, event })=>{
    const [nameSingular, _] = eventName.split('.');
    const record = 'after' in event.properties && (0, _utils.isDefined)(event.properties.after) ? event.properties.after : 'before' in event.properties && (0, _utils.isDefined)(event.properties.before) ? event.properties.before : {};
    const updatedFields = 'updatedFields' in event.properties ? event.properties.updatedFields : undefined;
    const isWebhookEvent = nameSingular === 'webhook';
    const sanitizedRecord = (0, _removesecretfromwebhookrecord.removeSecretFromWebhookRecord)(record, isWebhookEvent);
    return {
        record: sanitizedRecord,
        ...updatedFields && {
            updatedFields
        }
    };
};

//# sourceMappingURL=transform-event-to-webhook-event.js.map