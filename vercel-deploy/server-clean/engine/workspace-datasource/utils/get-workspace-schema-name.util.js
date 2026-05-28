"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getWorkspaceSchemaName", {
    enumerable: true,
    get: function() {
        return getWorkspaceSchemaName;
    }
});
const _utils = require("twenty-shared/utils");
const getWorkspaceSchemaName = (workspaceId)=>{
    return `workspace_${(0, _utils.uuidToBase36)(workspaceId)}`;
};

//# sourceMappingURL=get-workspace-schema-name.util.js.map