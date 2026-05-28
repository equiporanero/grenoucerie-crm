"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkerQueueHealth", {
    enumerable: true,
    get: function() {
        return WorkerQueueHealth;
    }
});
const _graphql = require("@nestjs/graphql");
const _workerqueuemetricstype = require("./worker-queue-metrics.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkerQueueHealth = class WorkerQueueHealth {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], WorkerQueueHealth.prototype, "queueName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], WorkerQueueHealth.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], WorkerQueueHealth.prototype, "workers", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workerqueuemetricstype.WorkerQueueMetrics),
    _ts_metadata("design:type", typeof _workerqueuemetricstype.WorkerQueueMetrics === "undefined" ? Object : _workerqueuemetricstype.WorkerQueueMetrics)
], WorkerQueueHealth.prototype, "metrics", void 0);
WorkerQueueHealth = _ts_decorate([
    (0, _graphql.ObjectType)()
], WorkerQueueHealth);

//# sourceMappingURL=worker-queue-health.type.js.map