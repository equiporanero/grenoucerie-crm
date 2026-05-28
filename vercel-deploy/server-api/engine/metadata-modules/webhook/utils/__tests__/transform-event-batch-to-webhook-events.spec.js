"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformeventbatchtowebhookevents = require("../transform-event-batch-to-webhook-events");
const mockObjectMetadata = {
    id: 'id',
    nameSingular: 'nameSingular',
    namePlural: 'namePlural',
    workspaceId: 'workspaceId',
    labelSingular: 'Label Singular',
    labelPlural: 'Label Plural',
    isCustom: false,
    isRemote: false,
    isActive: true,
    isSystem: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    universalIdentifier: 'id',
    fieldIds: [],
    indexMetadataIds: [],
    viewIds: [],
    applicationId: null
};
describe('transformEventBatchToWebhookEvents', ()=>{
    it('should transform properly', ()=>{
        const workspaceEventBatch = {
            workspaceId: 'workspaceId',
            objectMetadata: mockObjectMetadata,
            name: 'objectNameSingular.created',
            events: [
                {
                    recordId: 'recordId-1',
                    properties: {
                        after: {
                            id: 'id-1',
                            nameSingular: 'nameSingular-1'
                        }
                    }
                },
                {
                    recordId: 'recordId-2',
                    properties: {
                        before: {
                            id: 'id-2',
                            nameSingular: 'nameSingular-2'
                        }
                    }
                },
                {
                    recordId: 'recordId-3',
                    properties: {
                        after: {
                            id: 'id-3',
                            nameSingular: 'nameSingular-3',
                            secret: 'secret-3'
                        },
                        updatedFields: [
                            'nameSingular'
                        ]
                    }
                }
            ]
        };
        const webhooks = [
            {
                id: 'webhook-id',
                targetUrl: 'targetUrl',
                secret: 'secret'
            },
            {
                id: 'webhook-id-2',
                targetUrl: 'targetUrl-2',
                secret: 'secret-2'
            }
        ];
        const result = (0, _transformeventbatchtowebhookevents.transformEventBatchToWebhookEvents)({
            workspaceEventBatch,
            webhooks
        });
        const expectedResultWithoutEventDate = [
            {
                targetUrl: 'targetUrl',
                eventName: 'objectNameSingular.created',
                objectMetadata: {
                    id: mockObjectMetadata.id,
                    nameSingular: mockObjectMetadata.nameSingular
                },
                workspaceId: 'workspaceId',
                webhookId: 'webhook-id',
                record: {
                    id: 'id-1',
                    nameSingular: 'nameSingular-1'
                },
                secret: 'secret'
            },
            {
                targetUrl: 'targetUrl',
                eventName: 'objectNameSingular.created',
                objectMetadata: {
                    id: mockObjectMetadata.id,
                    nameSingular: mockObjectMetadata.nameSingular
                },
                workspaceId: 'workspaceId',
                webhookId: 'webhook-id',
                record: {
                    id: 'id-2',
                    nameSingular: 'nameSingular-2'
                },
                secret: 'secret'
            },
            {
                targetUrl: 'targetUrl',
                eventName: 'objectNameSingular.created',
                objectMetadata: {
                    id: mockObjectMetadata.id,
                    nameSingular: mockObjectMetadata.nameSingular
                },
                workspaceId: 'workspaceId',
                webhookId: 'webhook-id',
                record: {
                    id: 'id-3',
                    nameSingular: 'nameSingular-3',
                    secret: 'secret-3'
                },
                updatedFields: [
                    'nameSingular'
                ],
                secret: 'secret'
            },
            {
                targetUrl: 'targetUrl-2',
                eventName: 'objectNameSingular.created',
                objectMetadata: {
                    id: mockObjectMetadata.id,
                    nameSingular: mockObjectMetadata.nameSingular
                },
                workspaceId: 'workspaceId',
                webhookId: 'webhook-id-2',
                record: {
                    id: 'id-1',
                    nameSingular: 'nameSingular-1'
                },
                secret: 'secret-2'
            },
            {
                targetUrl: 'targetUrl-2',
                eventName: 'objectNameSingular.created',
                objectMetadata: {
                    id: mockObjectMetadata.id,
                    nameSingular: mockObjectMetadata.nameSingular
                },
                workspaceId: 'workspaceId',
                webhookId: 'webhook-id-2',
                record: {
                    id: 'id-2',
                    nameSingular: 'nameSingular-2'
                },
                secret: 'secret-2'
            },
            {
                targetUrl: 'targetUrl-2',
                eventName: 'objectNameSingular.created',
                objectMetadata: {
                    id: mockObjectMetadata.id,
                    nameSingular: mockObjectMetadata.nameSingular
                },
                workspaceId: 'workspaceId',
                webhookId: 'webhook-id-2',
                record: {
                    id: 'id-3',
                    nameSingular: 'nameSingular-3',
                    secret: 'secret-3'
                },
                updatedFields: [
                    'nameSingular'
                ],
                secret: 'secret-2'
            }
        ];
        const resultWithoutEventDate = result.map((event)=>{
            const { eventDate: _, ...eventWithoutEventDate } = event;
            return eventWithoutEventDate;
        });
        expect(resultWithoutEventDate).toEqual(expectedResultWithoutEventDate);
    });
    it('should sanitize records properly', ()=>{
        const workspaceEventBatch = {
            workspaceId: 'workspaceId',
            objectMetadata: mockObjectMetadata,
            name: 'webhook.created',
            events: [
                {
                    recordId: 'recordId-1',
                    properties: {
                        after: {
                            id: 'id-1',
                            targetUrl: 'targetUrl-1',
                            secret: 'secret-1'
                        }
                    }
                }
            ]
        };
        const webhooks = [
            {
                id: 'webhook-id',
                targetUrl: 'targetUrl',
                secret: 'secret'
            }
        ];
        const result = (0, _transformeventbatchtowebhookevents.transformEventBatchToWebhookEvents)({
            workspaceEventBatch,
            webhooks
        });
        const expectedResultWithoutEventDate = [
            {
                targetUrl: 'targetUrl',
                eventName: 'webhook.created',
                objectMetadata: {
                    id: mockObjectMetadata.id,
                    nameSingular: mockObjectMetadata.nameSingular
                },
                workspaceId: 'workspaceId',
                webhookId: 'webhook-id',
                record: {
                    id: 'id-1',
                    targetUrl: 'targetUrl-1'
                },
                secret: 'secret'
            }
        ];
        const resultWithoutEventDate = result.map((event)=>{
            const { eventDate: _, ...eventWithoutEventDate } = event;
            return eventWithoutEventDate;
        });
        expect(resultWithoutEventDate).toEqual(expectedResultWithoutEventDate);
    });
});

//# sourceMappingURL=transform-event-batch-to-webhook-events.spec.js.map