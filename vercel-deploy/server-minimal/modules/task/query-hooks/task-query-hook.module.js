"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TaskQueryHookModule", {
    enumerable: true,
    get: function() {
        return TaskQueryHookModule;
    }
});
const _common = require("@nestjs/common");
const _taskdeletemanypostqueryhook = require("./task-delete-many.post-query.hook");
const _taskdeleteonepostqueryhook = require("./task-delete-one.post-query.hook");
const _taskpostqueryhookservice = require("./task-post-query-hook.service");
const _taskrestoremanypostqueryhook = require("./task-restore-many.post-query.hook");
const _taskrestoreonepostqueryhook = require("./task-restore-one.post-query.hook");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TaskQueryHookModule = class TaskQueryHookModule {
};
TaskQueryHookModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _taskpostqueryhookservice.TaskPostQueryHookService,
            _taskdeletemanypostqueryhook.TaskDeleteManyPostQueryHook,
            _taskdeleteonepostqueryhook.TaskDeleteOnePostQueryHook,
            _taskrestoremanypostqueryhook.TaskRestoreManyPostQueryHook,
            _taskrestoreonepostqueryhook.TaskRestoreOnePostQueryHook
        ]
    })
], TaskQueryHookModule);

//# sourceMappingURL=task-query-hook.module.js.map