"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionTriggerModule", {
    enumerable: true,
    get: function() {
        return LogicFunctionTriggerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _tokenmodule = require("../../auth/token/token.module");
const _workspacedomainsmodule = require("../../domain/workspace-domains/workspace-domains.module");
const _logicfunctiontriggerjob = require("./jobs/logic-function-trigger.job");
const _crontriggercroncommand = require("./triggers/cron/cron-trigger.cron.command");
const _crontriggercronjob = require("./triggers/cron/cron-trigger.cron.job");
const _calldatabaseeventtriggerjobsjob = require("./triggers/database-event/call-database-event-trigger-jobs.job");
const _routetriggerservice = require("./triggers/route/route-trigger.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _logicfunctionentity = require("../../../metadata-modules/logic-function/logic-function.entity");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LogicFunctionTriggerModule = class LogicFunctionTriggerModule {
};
LogicFunctionTriggerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _logicfunctionentity.LogicFunctionEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _tokenmodule.TokenModule,
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _logicfunctiontriggerjob.LogicFunctionTriggerJob,
            _crontriggercronjob.CronTriggerCronJob,
            _crontriggercroncommand.CronTriggerCronCommand,
            _calldatabaseeventtriggerjobsjob.CallDatabaseEventTriggerJobsJob,
            _routetriggerservice.RouteTriggerService
        ],
        exports: [
            _crontriggercroncommand.CronTriggerCronCommand,
            _routetriggerservice.RouteTriggerService
        ]
    })
], LogicFunctionTriggerModule);

//# sourceMappingURL=logic-function-trigger.module.js.map