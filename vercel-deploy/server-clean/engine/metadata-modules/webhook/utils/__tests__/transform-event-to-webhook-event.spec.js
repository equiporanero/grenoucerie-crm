"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformeventtowebhookevent = require("../transform-event-to-webhook-event");
describe('transformEventToWebhookEvent', ()=>{
    it('should transform event to webhook event', ()=>{
        const record = {
            recordId: 'recordId',
            properties: {
                after: {
                    id: 'id',
                    nameSingular: 'nameSingular',
                    secret: 'secret'
                },
                updatedFields: [
                    'nameSingular'
                ]
            }
        };
        const expectedResult = {
            record: {
                id: 'id',
                nameSingular: 'nameSingular',
                secret: 'secret'
            },
            updatedFields: [
                'nameSingular'
            ]
        };
        expect((0, _transformeventtowebhookevent.transformEventToWebhookEvent)({
            eventName: 'nameSingular.created',
            event: record
        })).toEqual(expectedResult);
    });
});

//# sourceMappingURL=transform-event-to-webhook-event.spec.js.map