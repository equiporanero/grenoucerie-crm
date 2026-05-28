"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatWebhookToWebhookDto", {
    enumerable: true,
    get: function() {
        return fromFlatWebhookToWebhookDto;
    }
});
const fromFlatWebhookToWebhookDto = (flatWebhook)=>({
        id: flatWebhook.id,
        targetUrl: flatWebhook.targetUrl,
        operations: flatWebhook.operations,
        description: flatWebhook.description,
        secret: flatWebhook.secret,
        workspaceId: flatWebhook.workspaceId,
        applicationId: flatWebhook.applicationId,
        createdAt: new Date(flatWebhook.createdAt),
        updatedAt: new Date(flatWebhook.updatedAt),
        deletedAt: flatWebhook.deletedAt ? new Date(flatWebhook.deletedAt) : null
    });

//# sourceMappingURL=from-flat-webhook-to-webhook-dto.util.js.map