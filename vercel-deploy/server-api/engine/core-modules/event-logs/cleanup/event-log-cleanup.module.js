/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventLogCleanupModule", {
    enumerable: true,
    get: function() {
        return EventLogCleanupModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _clickHousemodule = require("../../../../database/clickHouse/clickHouse.module");
const _workspaceentity = require("../../workspace/workspace.entity");
const _eventlogcleanupcroncommand = require("./commands/event-log-cleanup.cron.command");
const _eventlogcleanupcronjob = require("./crons/event-log-cleanup.cron.job");
const _eventlogcleanupjob = require("./jobs/event-log-cleanup.job");
const _eventlogcleanupservice = require("./services/event-log-cleanup.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EventLogCleanupModule = class EventLogCleanupModule {
};
EventLogCleanupModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _clickHousemodule.ClickHouseModule
        ],
        providers: [
            _eventlogcleanupservice.EventLogCleanupService,
            _eventlogcleanupjob.EventLogCleanupJob,
            _eventlogcleanupcronjob.EventLogCleanupCronJob,
            _eventlogcleanupcroncommand.EventLogCleanupCronCommand
        ],
        exports: [
            _eventlogcleanupcroncommand.EventLogCleanupCronCommand
        ]
    })
], EventLogCleanupModule);

//# sourceMappingURL=event-log-cleanup.module.js.map