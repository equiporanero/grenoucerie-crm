"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NoteRestoreManyPostQueryHook", {
    enumerable: true,
    get: function() {
        return NoteRestoreManyPostQueryHook;
    }
});
const _common = require("@nestjs/common");
const _workspacequeryhookdecorator = require("../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
const _workspacequeryhooktype = require("../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/types/workspace-query-hook.type");
const _notepostqueryhookservice = require("./note-post-query-hook.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NoteRestoreManyPostQueryHook = class NoteRestoreManyPostQueryHook {
    async execute(authContext, _objectName, payload) {
        await this.notePostQueryHookService.handleNoteTargetsRestore(authContext, payload);
    }
    constructor(notePostQueryHookService){
        this.notePostQueryHookService = notePostQueryHookService;
    }
};
NoteRestoreManyPostQueryHook = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)({
        key: `note.restoreMany`,
        type: _workspacequeryhooktype.WorkspaceQueryHookType.POST_HOOK
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _notepostqueryhookservice.NotePostQueryHookService === "undefined" ? Object : _notepostqueryhookservice.NotePostQueryHookService
    ])
], NoteRestoreManyPostQueryHook);

//# sourceMappingURL=note-restore-many.post-query.hook.js.map