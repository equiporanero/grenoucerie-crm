"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getQueueToken", {
    enumerable: true,
    get: function() {
        return getQueueToken;
    }
});
const getQueueToken = (queueName)=>`MESSAGE_QUEUE_${queueName}`;

//# sourceMappingURL=get-queue-token.util.js.map