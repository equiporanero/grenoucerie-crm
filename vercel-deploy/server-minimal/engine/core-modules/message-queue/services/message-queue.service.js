"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageQueueService", {
    enumerable: true,
    get: function() {
        return MessageQueueService;
    }
});
const _common = require("@nestjs/common");
const _messagequeuedriverinterface = require("../drivers/interfaces/message-queue-driver.interface");
const _messagequeueconstants = require("../message-queue.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let MessageQueueService = class MessageQueueService {
    add(jobName, data, options) {
        return this.driver.add(this.queueName, jobName, data, options);
    }
    addCron({ jobName, data, options, jobId }) {
        return this.driver.addCron({
            queueName: this.queueName,
            jobName,
            data,
            options,
            jobId
        });
    }
    removeCron({ jobName, jobId }) {
        return this.driver.removeCron({
            queueName: this.queueName,
            jobName,
            jobId
        });
    }
    work(handler, options) {
        this.driver.work(this.queueName, handler, options);
    }
    constructor(driver, queueName){
        this.driver = driver;
        this.queueName = queueName;
        if (typeof this.driver.register === 'function') {
            this.driver.register(queueName);
        }
    }
};
MessageQueueService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_messagequeueconstants.QUEUE_DRIVER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeuedriverinterface.MessageQueueDriver === "undefined" ? Object : _messagequeuedriverinterface.MessageQueueDriver,
        typeof _messagequeueconstants.MessageQueue === "undefined" ? Object : _messagequeueconstants.MessageQueue
    ])
], MessageQueueService);

//# sourceMappingURL=message-queue.service.js.map