"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyWorkspaceSentryFields", {
    enumerable: true,
    get: function() {
        return applyWorkspaceSentryFields;
    }
});
const _node = /*#__PURE__*/ _interop_require_wildcard(require("@sentry/node"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const applyWorkspaceSentryFields = (fields)=>{
    _node.setUser({
        id: fields.userWorkspaceId ?? fields.workspaceId
    });
    _node.setTag('twenty.workspace.id', fields.workspaceId);
    if (fields.userWorkspaceId) {
        _node.setTag('twenty.user_workspace.id', fields.userWorkspaceId);
    }
    _node.setContext('twenty', {
        workspace_id: fields.workspaceId,
        ...fields.userWorkspaceId && {
            user_workspace_id: fields.userWorkspaceId
        }
    });
};

//# sourceMappingURL=apply-workspace-sentry-fields.util.js.map