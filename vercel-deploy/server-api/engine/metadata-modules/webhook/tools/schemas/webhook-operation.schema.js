"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "webhookOperationSchema", {
    enumerable: true,
    get: function() {
        return webhookOperationSchema;
    }
});
const _zod = require("zod");
const recordOperationSchema = _zod.z.object({
    kind: _zod.z.literal('record').describe("Record event ('<objectNameSingular>.<event>')"),
    object: _zod.z.string().min(1).describe("Object name singular (e.g. 'person', 'company', 'task'), or '*' for all objects."),
    event: _zod.z.enum([
        'created',
        'updated',
        'deleted',
        '*'
    ]).describe("Event kind. Use '*' to match every event for the given object.")
});
const metadataOperationSchema = _zod.z.object({
    kind: _zod.z.literal('metadata').describe("Metadata event ('metadata.<metadataName>.<operation>') — fires on changes to objects, fields, views, workflows, etc."),
    metadataName: _zod.z.string().min(1).describe("Metadata name (e.g. 'object', 'field', 'view', 'workflow'), or '*' for all."),
    operation: _zod.z.enum([
        'created',
        'updated',
        'deleted',
        '*'
    ]).describe("Operation kind. Use '*' to match every operation.")
});
const webhookOperationSchema = _zod.z.array(_zod.z.discriminatedUnion('kind', [
    recordOperationSchema,
    metadataOperationSchema
])).min(1).describe("Events that trigger the webhook. Record events compile to '<object>.<event>' (e.g. 'person.created'). Metadata events compile to 'metadata.<metadataName>.<operation>' (e.g. 'metadata.workflow.updated'). Use [{kind:'record',object:'*',event:'*'}] to subscribe to all record events.");

//# sourceMappingURL=webhook-operation.schema.js.map