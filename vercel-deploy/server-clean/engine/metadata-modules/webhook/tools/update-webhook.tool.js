"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpdateWebhookTool", {
    enumerable: true,
    get: function() {
        return createUpdateWebhookTool;
    }
});
const _zod = require("zod");
const _webhookoperationschema = require("./schemas/webhook-operation.schema");
const _compilewebhookoperationsutil = require("./utils/compile-webhook-operations.util");
const updateWebhookSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('The id of the webhook to update'),
    targetUrl: _zod.z.string().url().optional().describe('New target URL. Leave unset to keep the current value.'),
    operations: _webhookoperationschema.webhookOperationSchema.optional().describe('Replaces the operations list. Leave unset to keep current.'),
    description: _zod.z.string().optional(),
    secret: _zod.z.string().optional()
});
const createUpdateWebhookTool = (deps, context)=>({
        name: 'update_webhook',
        description: `Update an existing webhook. Only the fields you pass are modified; everything else is preserved.`,
        inputSchema: updateWebhookSchema,
        execute: async (parameters)=>{
            try {
                const update = {};
                if (parameters.targetUrl !== undefined) {
                    update.targetUrl = parameters.targetUrl;
                }
                if (parameters.operations !== undefined) {
                    update.operations = (0, _compilewebhookoperationsutil.compileWebhookOperations)(parameters.operations);
                }
                if (parameters.description !== undefined) {
                    update.description = parameters.description;
                }
                if (parameters.secret !== undefined) {
                    update.secret = parameters.secret;
                }
                const webhook = await deps.webhookService.update({
                    id: parameters.id,
                    update
                }, context.workspaceId);
                return {
                    success: true,
                    message: `Webhook ${webhook.id} updated`,
                    result: {
                        id: webhook.id,
                        targetUrl: webhook.targetUrl,
                        operations: webhook.operations,
                        description: webhook.description
                    }
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    message: `Failed to update webhook: ${message}`,
                    error: message
                };
            }
        }
    });

//# sourceMappingURL=update-webhook.tool.js.map