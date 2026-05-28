"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get MessageQueue () {
        return MessageQueue;
    },
    get PROCESSOR_METADATA () {
        return PROCESSOR_METADATA;
    },
    get PROCESS_METADATA () {
        return PROCESS_METADATA;
    },
    get QUEUE_DRIVER () {
        return QUEUE_DRIVER;
    }
});
const PROCESSOR_METADATA = Symbol('message-queue:processor_metadata');
const PROCESS_METADATA = Symbol('message-queue:process_metadata');
const QUEUE_DRIVER = Symbol('message-queue:queue_driver');
var MessageQueue = /*#__PURE__*/ function(MessageQueue) {
    MessageQueue["taskAssignedQueue"] = "task-assigned-queue";
    MessageQueue["messagingQueue"] = "messaging-queue";
    MessageQueue["webhookQueue"] = "webhook-queue";
    MessageQueue["cronQueue"] = "cron-queue";
    MessageQueue["emailQueue"] = "email-queue";
    MessageQueue["calendarQueue"] = "calendar-queue";
    MessageQueue["contactCreationQueue"] = "contact-creation-queue";
    MessageQueue["billingQueue"] = "billing-queue";
    MessageQueue["workspaceQueue"] = "workspace-queue";
    MessageQueue["entityEventsToDbQueue"] = "entity-events-to-db-queue";
    MessageQueue["workflowQueue"] = "workflow-queue";
    MessageQueue["delayedJobsQueue"] = "delayed-jobs-queue";
    MessageQueue["deleteCascadeQueue"] = "delete-cascade-queue";
    MessageQueue["logicFunctionQueue"] = "logic-function-queue";
    MessageQueue["triggerQueue"] = "trigger-queue";
    MessageQueue["aiQueue"] = "ai-queue";
    MessageQueue["aiStreamQueue"] = "ai-stream-queue";
    return MessageQueue;
}({});

//# sourceMappingURL=message-queue.constants.js.map