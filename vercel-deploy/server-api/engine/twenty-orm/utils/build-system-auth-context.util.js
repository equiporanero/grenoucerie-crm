"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildSystemAuthContext", {
    enumerable: true,
    get: function() {
        return buildSystemAuthContext;
    }
});
const _buildsystemauthcontextutil = require("../../core-modules/auth/utils/build-system-auth-context.util");
const buildSystemAuthContext = (workspaceId)=>{
    return (0, _buildsystemauthcontextutil.buildSystemAuthContext)({
        workspace: {
            id: workspaceId
        }
    });
};

//# sourceMappingURL=build-system-auth-context.util.js.map