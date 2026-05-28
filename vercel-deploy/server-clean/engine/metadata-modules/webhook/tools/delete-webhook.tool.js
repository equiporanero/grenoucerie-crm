"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDeleteWebhookTool", {
    enumerable: true,
    get: function() {
        return createDeleteWebhookTool;
    }
});
const _zod = require("zod");
const deleteWebhookSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('The id of the webhook to delete')
});
const createDeleteWebhookTool = (deps, context)=>({
        name: 'delete_webhook',
        description: `Delete a webhook by id. Use list_webhooks first if you don't know the id.`,
        inputSchema: deleteWebhookSchema,
        execute: async (parameters)=>{
            try {
                const webhook = await deps.webhookService.delete(parameters.id, context.workspaceId);
                return {
                    success: true,
                    message: `Webhook ${webhook.id} deleted`,
                    result: {
                        deletedWebhookId: webhook.id,
                        targetUrl: webhook.targetUrl
                    }
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    message: `Failed to delete webhook: ${message}`,
                    error: message
                };
            }
        }
    });

//# sourceMappingURL=delete-webhook.tool.js.map