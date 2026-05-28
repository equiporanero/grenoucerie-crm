"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCreateWebhookTool", {
    enumerable: true,
    get: function() {
        return createCreateWebhookTool;
    }
});
const _zod = require("zod");
const _webhookoperationschema = require("./schemas/webhook-operation.schema");
const _compilewebhookoperationsutil = require("./utils/compile-webhook-operations.util");
const createWebhookSchema = _zod.z.object({
    targetUrl: _zod.z.string().url().describe('Absolute URL the webhook payload should be POSTed to'),
    operations: _webhookoperationschema.webhookOperationSchema,
    description: _zod.z.string().optional().describe('Optional human description for the webhook'),
    secret: _zod.z.string().optional().describe('Optional shared secret used to sign payloads. A secret is generated if omitted.')
});
const createCreateWebhookTool = (deps, context)=>({
        name: 'create_webhook',
        description: `Register a new outgoing webhook for this workspace.

Operations are structured entries discriminated by 'kind':
- {kind:'record', object:'person', event:'created'} → fires when a person is created (compiles to 'person.created').
- {kind:'record', object:'*', event:'*'} → fires on every record event.
- {kind:'metadata', metadataName:'workflow', operation:'updated'} → fires when a workflow definition is updated (compiles to 'metadata.workflow.updated').
- {kind:'metadata', metadataName:'*', operation:'*'} → fires on every metadata change.

Mix as needed: pass one array containing both record and metadata operations.`,
        inputSchema: createWebhookSchema,
        execute: async (parameters)=>{
            try {
                const webhook = await deps.webhookService.create({
                    targetUrl: parameters.targetUrl,
                    operations: (0, _compilewebhookoperationsutil.compileWebhookOperations)(parameters.operations),
                    description: parameters.description,
                    secret: parameters.secret
                }, context.workspaceId);
                return {
                    success: true,
                    message: `Webhook created for ${webhook.targetUrl}`,
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
                    message: `Failed to create webhook: ${message}`,
                    error: message
                };
            }
        }
    });

//# sourceMappingURL=create-webhook.tool.js.map