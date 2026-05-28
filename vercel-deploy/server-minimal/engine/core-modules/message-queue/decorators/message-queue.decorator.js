"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InjectMessageQueue", {
    enumerable: true,
    get: function() {
        return InjectMessageQueue;
    }
});
const _common = require("@nestjs/common");
const _getqueuetokenutil = require("../utils/get-queue-token.util");
const InjectMessageQueue = (queueName)=>{
    return (0, _common.Inject)((0, _getqueuetokenutil.getQueueToken)(queueName));
};

//# sourceMappingURL=message-queue.decorator.js.map