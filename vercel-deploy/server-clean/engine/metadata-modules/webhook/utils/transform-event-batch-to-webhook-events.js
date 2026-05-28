"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformEventBatchToWebhookEvents", {
    enumerable: true,
    get: function() {
        return transformEventBatchToWebhookEvents;
    }
});
const _transformeventtowebhookevent = require("./transform-event-to-webhook-event");
const transformEventBatchToWebhookEvents = ({ workspaceEventBatch, webhooks })=>{
    const result = [];
    for (const webhook of webhooks){
        const targetUrl = webhook.targetUrl;
        const eventName = workspaceEventBatch.name;
        const objectMetadataForWebhook = {
            id: workspaceEventBatch.objectMetadata.id,
            nameSingular: workspaceEventBatch.objectMetadata.nameSingular
        };
        const workspaceId = workspaceEventBatch.workspaceId;
        const webhookId = webhook.id;
        const eventDate = new Date();
        const secret = webhook.secret;
        for (const eventData of workspaceEventBatch.events){
            const { record, updatedFields } = (0, _transformeventtowebhookevent.transformEventToWebhookEvent)({
                eventName: workspaceEventBatch.name,
                event: eventData
            });
            result.push({
                targetUrl,
                eventName,
                objectMetadata: objectMetadataForWebhook,
                workspaceId,
                webhookId,
                eventDate,
                userId: eventData.userId,
                workspaceMemberId: eventData.workspaceMemberId,
                record,
                ...updatedFields && {
                    updatedFields
                },
                secret
            });
        }
    }
    return result;
};

//# sourceMappingURL=transform-event-batch-to-webhook-events.js.map