"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueWorkerModule", {
    enumerable: true,
    get: function() {
        return QueueWorkerModule;
    }
});
const _common = require("@nestjs/common");
const _coreenginemodule = require("../engine/core-modules/core-engine.module");
const _jobsmodule = require("../engine/core-modules/message-queue/jobs.module");
const _messagequeuemodule = require("../engine/core-modules/message-queue/message-queue.module");
const _globalworkspacedatasourcemodule = require("../engine/twenty-orm/global-workspace-datasource/global-workspace-datasource.module");
const _twentyormmodule = require("../engine/twenty-orm/twenty-orm.module");
const _workspaceeventemittermodule = require("../engine/workspace-event-emitter/workspace-event-emitter.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let QueueWorkerModule = class QueueWorkerModule {
};
QueueWorkerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _coreenginemodule.CoreEngineModule,
            _messagequeuemodule.MessageQueueModule.registerExplorer(),
            _workspaceeventemittermodule.WorkspaceEventEmitterModule,
            _jobsmodule.JobsModule,
            _twentyormmodule.TwentyORMModule,
            _globalworkspacedatasourcemodule.GlobalWorkspaceDataSourceModule
        ]
    })
], QueueWorkerModule);

//# sourceMappingURL=queue-worker.module.js.map