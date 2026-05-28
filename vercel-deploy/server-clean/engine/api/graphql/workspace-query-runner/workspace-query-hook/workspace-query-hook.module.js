"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceQueryHookModule", {
    enumerable: true,
    get: function() {
        return WorkspaceQueryHookModule;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _workspacequeryhookstorage = require("./storage/workspace-query-hook.storage");
const _workspacequeryhookmetadataaccessor = require("./workspace-query-hook-metadata.accessor");
const _workspacequeryhookexplorer = require("./workspace-query-hook.explorer");
const _workspacequeryhookservice = require("./workspace-query-hook.service");
const _blocklistqueryhookmodule = require("../../../../../modules/blocklist/query-hooks/blocklist-query-hook.module");
const _calendarqueryhookmodule = require("../../../../../modules/calendar/common/query-hooks/calendar-query-hook.module");
const _dashboardqueryhookmodule = require("../../../../../modules/dashboard/query-hooks/dashboard-query-hook.module");
const _messagingqueryhookmodule = require("../../../../../modules/messaging/common/query-hooks/messaging-query-hook.module");
const _notequeryhookmodule = require("../../../../../modules/note/query-hooks/note-query-hook.module");
const _taskqueryhookmodule = require("../../../../../modules/task/query-hooks/task-query-hook.module");
const _workspacememberqueryhookmodule = require("../../../../../modules/workspace-member/query-hooks/workspace-member-query-hook.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceQueryHookModule = class WorkspaceQueryHookModule {
};
WorkspaceQueryHookModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _messagingqueryhookmodule.MessagingQueryHookModule,
            _calendarqueryhookmodule.CalendarQueryHookModule,
            _dashboardqueryhookmodule.DashboardQueryHookModule,
            _blocklistqueryhookmodule.BlocklistQueryHookModule,
            _workspacememberqueryhookmodule.WorkspaceMemberQueryHookModule,
            _notequeryhookmodule.NoteQueryHookModule,
            _taskqueryhookmodule.TaskQueryHookModule,
            _core.DiscoveryModule
        ],
        providers: [
            _workspacequeryhookservice.WorkspaceQueryHookService,
            _workspacequeryhookexplorer.WorkspaceQueryHookExplorer,
            _workspacequeryhookmetadataaccessor.WorkspaceQueryHookMetadataAccessor,
            _workspacequeryhookstorage.WorkspaceQueryHookStorage
        ],
        exports: [
            _workspacequeryhookservice.WorkspaceQueryHookService
        ]
    })
], WorkspaceQueryHookModule);

//# sourceMappingURL=workspace-query-hook.module.js.map