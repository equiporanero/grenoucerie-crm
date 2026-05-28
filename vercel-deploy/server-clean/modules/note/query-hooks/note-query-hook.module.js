"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NoteQueryHookModule", {
    enumerable: true,
    get: function() {
        return NoteQueryHookModule;
    }
});
const _common = require("@nestjs/common");
const _notedeletemanypostqueryhook = require("./note-delete-many.post-query.hook");
const _notedeleteonepostqueryhook = require("./note-delete-one.post-query.hook");
const _notepostqueryhookservice = require("./note-post-query-hook.service");
const _noterestoremanypostqueryhook = require("./note-restore-many.post-query.hook");
const _noterestoreonepostqueryhook = require("./note-restore-one.post-query.hook");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let NoteQueryHookModule = class NoteQueryHookModule {
};
NoteQueryHookModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _notepostqueryhookservice.NotePostQueryHookService,
            _notedeletemanypostqueryhook.NoteDeleteManyPostQueryHook,
            _notedeleteonepostqueryhook.NoteDeleteOnePostQueryHook,
            _noterestoremanypostqueryhook.NoteRestoreManyPostQueryHook,
            _noterestoreonepostqueryhook.NoteRestoreOnePostQueryHook
        ]
    })
], NoteQueryHookModule);

//# sourceMappingURL=note-query-hook.module.js.map