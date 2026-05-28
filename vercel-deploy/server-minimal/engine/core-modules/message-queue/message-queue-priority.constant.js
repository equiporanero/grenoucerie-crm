"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MESSAGE_QUEUE_PRIORITY", {
    enumerable: true,
    get: function() {
        return MESSAGE_QUEUE_PRIORITY;
    }
});
const _messagequeueconstants = require("./message-queue.constants");
const MESSAGE_QUEUE_PRIORITY = {
    [_messagequeueconstants.MessageQueue.billingQueue]: 1,
    [_messagequeueconstants.MessageQueue.entityEventsToDbQueue]: 1,
    [_messagequeueconstants.MessageQueue.emailQueue]: 1,
    [_messagequeueconstants.MessageQueue.workflowQueue]: 2,
    [_messagequeueconstants.MessageQueue.webhookQueue]: 2,
    [_messagequeueconstants.MessageQueue.messagingQueue]: 2,
    [_messagequeueconstants.MessageQueue.delayedJobsQueue]: 3,
    [_messagequeueconstants.MessageQueue.calendarQueue]: 4,
    [_messagequeueconstants.MessageQueue.contactCreationQueue]: 4,
    [_messagequeueconstants.MessageQueue.taskAssignedQueue]: 4,
    [_messagequeueconstants.MessageQueue.logicFunctionQueue]: 4,
    [_messagequeueconstants.MessageQueue.workspaceQueue]: 5,
    [_messagequeueconstants.MessageQueue.triggerQueue]: 5,
    [_messagequeueconstants.MessageQueue.deleteCascadeQueue]: 6,
    [_messagequeueconstants.MessageQueue.cronQueue]: 7,
    [_messagequeueconstants.MessageQueue.aiQueue]: 5,
    [_messagequeueconstants.MessageQueue.aiStreamQueue]: 2
};

//# sourceMappingURL=message-queue-priority.constant.js.map