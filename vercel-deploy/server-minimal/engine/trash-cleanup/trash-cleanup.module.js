"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TrashCleanupModule", {
    enumerable: true,
    get: function() {
        return TrashCleanupModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspaceentity = require("../core-modules/workspace/workspace.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _trashcleanupcroncommand = require("./commands/trash-cleanup.cron.command");
const _trashcleanupcronjob = require("./crons/trash-cleanup.cron.job");
const _trashcleanupjob = require("./jobs/trash-cleanup.job");
const _trashcleanupservice = require("./services/trash-cleanup.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TrashCleanupModule = class TrashCleanupModule {
};
TrashCleanupModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _trashcleanupservice.TrashCleanupService,
            _trashcleanupjob.TrashCleanupJob,
            _trashcleanupcronjob.TrashCleanupCronJob,
            _trashcleanupcroncommand.TrashCleanupCronCommand
        ],
        exports: [
            _trashcleanupcroncommand.TrashCleanupCronCommand
        ]
    })
], TrashCleanupModule);

//# sourceMappingURL=trash-cleanup.module.js.map