"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceQueryHook", {
    enumerable: true,
    get: function() {
        return WorkspaceQueryHook;
    }
});
const _common = require("@nestjs/common");
const _constants = require("@nestjs/common/constants");
const _workspacequeryhooktype = require("../types/workspace-query-hook.type");
const _workspacequeryhookconstants = require("../workspace-query-hook.constants");
function WorkspaceQueryHook(keyOrOptions) {
    const options = keyOrOptions && typeof keyOrOptions === 'object' ? keyOrOptions : {
        key: keyOrOptions
    };
    // Default to PreHook
    if (!options.type) {
        options.type = _workspacequeryhooktype.WorkspaceQueryHookType.PRE_HOOK;
    }
    return (target)=>{
        (0, _common.SetMetadata)(_constants.SCOPE_OPTIONS_METADATA, options)(target);
        (0, _common.SetMetadata)(_workspacequeryhookconstants.WORKSPACE_QUERY_HOOK_METADATA, options)(target);
    };
}

//# sourceMappingURL=workspace-query-hook.decorator.js.map