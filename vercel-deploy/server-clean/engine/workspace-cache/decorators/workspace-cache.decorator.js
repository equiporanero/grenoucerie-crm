"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get WORKSPACE_CACHE_KEY () {
        return WORKSPACE_CACHE_KEY;
    },
    get WORKSPACE_CACHE_OPTIONS () {
        return WORKSPACE_CACHE_OPTIONS;
    },
    get WorkspaceCache () {
        return WorkspaceCache;
    }
});
const _common = require("@nestjs/common");
const WORKSPACE_CACHE_KEY = 'WORKSPACE_CACHE_KEY';
const WORKSPACE_CACHE_OPTIONS = 'WORKSPACE_CACHE_OPTIONS';
const WorkspaceCache = (workspaceCacheKeyName, options)=>{
    return (target)=>{
        (0, _common.SetMetadata)(WORKSPACE_CACHE_KEY, workspaceCacheKeyName)(target);
        (0, _common.SetMetadata)(WORKSPACE_CACHE_OPTIONS, options ?? {})(target);
    };
};

//# sourceMappingURL=workspace-cache.decorator.js.map