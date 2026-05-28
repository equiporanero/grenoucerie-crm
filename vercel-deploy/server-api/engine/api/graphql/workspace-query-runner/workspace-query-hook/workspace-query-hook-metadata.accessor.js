"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceQueryHookMetadataAccessor", {
    enumerable: true,
    get: function() {
        return WorkspaceQueryHookMetadataAccessor;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _workspacequeryhookconstants = require("./workspace-query-hook.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceQueryHookMetadataAccessor = class WorkspaceQueryHookMetadataAccessor {
    isWorkspaceQueryHook(target) {
        if (!target) {
            return false;
        }
        return !!this.reflector.get(_workspacequeryhookconstants.WORKSPACE_QUERY_HOOK_METADATA, target);
    }
    getWorkspaceQueryHookMetadata(target) {
        return this.reflector.get(_workspacequeryhookconstants.WORKSPACE_QUERY_HOOK_METADATA, target);
    }
    constructor(reflector){
        this.reflector = reflector;
    }
};
WorkspaceQueryHookMetadataAccessor = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _core.Reflector === "undefined" ? Object : _core.Reflector
    ])
], WorkspaceQueryHookMetadataAccessor);

//# sourceMappingURL=workspace-query-hook-metadata.accessor.js.map