"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mergeUserVars", {
    enumerable: true,
    get: function() {
        return mergeUserVars;
    }
});
const mergeUserVars = (userVars)=>{
    const workspaceUserVarMap = new Map();
    const userUserVarMap = new Map();
    const userWorkspaceUserVarMap = new Map();
    for (const { key, value, userId, workspaceId } of userVars){
        if (!userId && workspaceId) {
            workspaceUserVarMap.set(key, value);
        }
        if (userId && !workspaceId) {
            userUserVarMap.set(key, value);
        }
        if (userId && workspaceId) {
            userWorkspaceUserVarMap.set(key, value);
        }
    }
    const mergedUserVars = new Map([
        ...workspaceUserVarMap,
        ...userUserVarMap,
        ...userWorkspaceUserVarMap
    ]);
    return mergedUserVars;
};

//# sourceMappingURL=merge-user-vars.util.js.map