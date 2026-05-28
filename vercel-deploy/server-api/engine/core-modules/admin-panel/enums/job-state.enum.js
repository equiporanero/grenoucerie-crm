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
    get JobStateEnum () {
        return JobStateEnum;
    },
    get bullMQToJobStateEnum () {
        return bullMQToJobStateEnum;
    },
    get jobStateEnumToBullMQ () {
        return jobStateEnumToBullMQ;
    }
});
const _graphql = require("@nestjs/graphql");
var JobStateEnum = /*#__PURE__*/ function(JobStateEnum) {
    JobStateEnum["COMPLETED"] = "COMPLETED";
    JobStateEnum["FAILED"] = "FAILED";
    JobStateEnum["ACTIVE"] = "ACTIVE";
    JobStateEnum["WAITING"] = "WAITING";
    JobStateEnum["DELAYED"] = "DELAYED";
    JobStateEnum["PRIORITIZED"] = "PRIORITIZED";
    JobStateEnum["WAITING_CHILDREN"] = "WAITING_CHILDREN";
    return JobStateEnum;
}({});
(0, _graphql.registerEnumType)(JobStateEnum, {
    name: 'JobState',
    description: 'Job state in the queue'
});
const jobStateEnumToBullMQ = {
    ["COMPLETED"]: 'completed',
    ["FAILED"]: 'failed',
    ["ACTIVE"]: 'active',
    ["WAITING"]: 'waiting',
    ["DELAYED"]: 'delayed',
    ["PRIORITIZED"]: 'prioritized',
    ["WAITING_CHILDREN"]: 'waiting-children'
};
const bullMQToJobStateEnum = {
    completed: "COMPLETED",
    failed: "FAILED",
    active: "ACTIVE",
    waiting: "WAITING",
    delayed: "DELAYED",
    prioritized: "PRIORITIZED",
    'waiting-children': "WAITING_CHILDREN"
};

//# sourceMappingURL=job-state.enum.js.map