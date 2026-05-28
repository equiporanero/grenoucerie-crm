"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateWebhookInputToFlatWebhookToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateWebhookInputToFlatWebhookToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _generatewebhooksecretutil = require("../../webhook/utils/generate-webhook-secret.util");
const fromCreateWebhookInputToFlatWebhookToCreate = ({ createWebhookInput, workspaceId, flatApplication })=>{
    const now = new Date().toISOString();
    const { targetUrl, description } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(createWebhookInput, [
        'targetUrl',
        'description'
    ]);
    const id = createWebhookInput.id ?? (0, _uuid.v4)();
    const secret = createWebhookInput.secret ?? (0, _generatewebhooksecretutil.generateWebhookSecret)();
    return {
        id,
        targetUrl,
        operations: createWebhookInput.operations,
        description: description ?? null,
        secret,
        workspaceId,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        universalIdentifier: id,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-webhook-input-to-flat-webhook-to-create.util.js.map