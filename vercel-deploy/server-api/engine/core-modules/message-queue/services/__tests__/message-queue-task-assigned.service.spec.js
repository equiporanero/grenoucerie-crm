"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _messagequeueconstants = require("../../message-queue.constants");
const _messagequeueservice = require("../message-queue.service");
describe('MessageQueueTaskAssigned queue', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                {
                    provide: _messagequeueconstants.MessageQueue.taskAssignedQueue,
                    useFactory: (driver)=>{
                        return new _messagequeueservice.MessageQueueService(driver, _messagequeueconstants.MessageQueue.taskAssignedQueue);
                    },
                    inject: [
                        _messagequeueconstants.QUEUE_DRIVER
                    ]
                },
                {
                    provide: _messagequeueconstants.QUEUE_DRIVER,
                    useValue: {}
                }
            ]
        }).compile();
        service = module.get(_messagequeueconstants.MessageQueue.taskAssignedQueue);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    it('should contain the topic and driver', ()=>{
        expect(service).toEqual({
            driver: {},
            queueName: _messagequeueconstants.MessageQueue.taskAssignedQueue
        });
    });
});

//# sourceMappingURL=message-queue-task-assigned.service.spec.js.map