"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createListWebhooksTool", {
    enumerable: true,
    get: function() {
        return createListWebhooksTool;
    }
});
const _zod = require("zod");
const listWebhooksSchema = _zod.z.object({});
const createListWebhooksTool = (deps, context)=>({
        name: 'list_webhooks',
        description: `List every webhook registered in the workspace. Returns id, targetUrl, operations (e.g. ['person.created','company.updated']), description and timestamps.`,
        inputSchema: listWebhooksSchema,
        execute: async ()=>{
            try {
                const webhooks = await deps.webhookService.findAll(context.workspaceId);
                return {
                    success: true,
                    message: `Found ${webhooks.length} webhook(s)`,
                    result: {
                        webhooks: webhooks.map((webhook)=>({
                                id: webhook.id,
                                targetUrl: webhook.targetUrl,
                                operations: webhook.operations,
                                description: webhook.description,
                                createdAt: webhook.createdAt,
                                updatedAt: webhook.updatedAt
                            })),
                        count: webhooks.length
                    }
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    message: `Failed to list webhooks: ${message}`,
                    error: message
                };
            }
        }
    });

//# sourceMappingURL=list-webhooks.tool.js.map