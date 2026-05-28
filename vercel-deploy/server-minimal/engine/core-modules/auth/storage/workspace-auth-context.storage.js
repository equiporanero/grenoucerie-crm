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
    get getWorkspaceAuthContext () {
        return getWorkspaceAuthContext;
    },
    get withWorkspaceAuthContext () {
        return withWorkspaceAuthContext;
    },
    get workspaceAuthContextStorage () {
        return workspaceAuthContextStorage;
    }
});
const _async_hooks = require("async_hooks");
const workspaceAuthContextStorage = new _async_hooks.AsyncLocalStorage();
const getWorkspaceAuthContext = ()=>{
    const context = workspaceAuthContextStorage.getStore();
    if (!context) {
        throw new Error('Workspace auth context not set. Operations must be wrapped with withWorkspaceAuthContext()');
    }
    return context;
};
const withWorkspaceAuthContext = (context, fn)=>{
    return workspaceAuthContextStorage.run(context, fn);
};

//# sourceMappingURL=workspace-auth-context.storage.js.map