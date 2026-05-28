"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QUEUE_WORKER_OPTIONS", {
    enumerable: true,
    get: function() {
        return QUEUE_WORKER_OPTIONS;
    }
});
const _messagequeueconstants = require("./message-queue.constants");
const QUEUE_WORKER_OPTIONS = {
    [_messagequeueconstants.MessageQueue.aiStreamQueue]: {
        concurrency: 20
    }
};

//# sourceMappingURL=message-queue-worker-options.constant.js.map