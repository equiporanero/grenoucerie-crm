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
    get getWorkspaceContext () {
        return getWorkspaceContext;
    },
    get setWorkspaceContext () {
        return setWorkspaceContext;
    },
    get withWorkspaceContext () {
        return withWorkspaceContext;
    },
    get workspaceContextStorage () {
        return workspaceContextStorage;
    }
});
const _async_hooks = require("async_hooks");
const workspaceContextStorage = new _async_hooks.AsyncLocalStorage();
const getWorkspaceContext = ()=>{
    const context = workspaceContextStorage.getStore();
    if (!context) {
        throw new Error('Workspace context not set. Operations must be wrapped with withWorkspaceContext()');
    }
    return context;
};
const withWorkspaceContext = (context, fn)=>{
    return workspaceContextStorage.run(context, fn);
};
const setWorkspaceContext = (context)=>{
    workspaceContextStorage.enterWith(context);
};

//# sourceMappingURL=orm-workspace-context.storage.js.map