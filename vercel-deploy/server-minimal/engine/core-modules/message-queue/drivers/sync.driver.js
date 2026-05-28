"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SyncDriver", {
    enumerable: true,
    get: function() {
        return SyncDriver;
    }
});
const _common = require("@nestjs/common");
let SyncDriver = class SyncDriver {
    async add(queueName, jobName, data) {
        await this.processJob(queueName, {
            id: '',
            name: jobName,
            data
        });
    }
    async addCron({ queueName, jobName, data }) {
        this.logger.log(`Running cron job with SyncDriver`);
        await this.processJob(queueName, {
            id: '',
            name: jobName,
            // TODO: Fix this type issue
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            data: data
        });
    }
    async removeCron({ queueName }) {
        this.logger.log(`Removing '${queueName}' cron job with SyncDriver`);
    }
    work(queueName, handler) {
        this.logger.log(`Registering handler for queue: ${queueName}`);
        this.workersMap[queueName] = handler;
    }
    async processJob(queueName, job) {
        const worker = this.workersMap[queueName];
        if (worker) {
            await worker(job);
        } else {
            if (process.env.NODE_ENV !== 'test') {
                this.logger.error(`No handler found for job: ${queueName}`);
            }
        }
    }
    constructor(){
        this.logger = new _common.Logger(SyncDriver.name);
        this.workersMap = {};
    }
};

//# sourceMappingURL=sync.driver.js.map