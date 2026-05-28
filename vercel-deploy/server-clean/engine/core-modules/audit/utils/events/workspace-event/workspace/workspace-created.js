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
    get WORKSPACE_CREATED_EVENT () {
        return WORKSPACE_CREATED_EVENT;
    },
    get workspaceCreatedSchema () {
        return workspaceCreatedSchema;
    }
});
const _zod = require("zod");
const _track = require("../track");
const WORKSPACE_CREATED_EVENT = 'Workspace Created';
const workspaceCreatedSchema = _zod.z.strictObject({
    event: _zod.z.literal(WORKSPACE_CREATED_EVENT),
    properties: _zod.z.strictObject({})
});
(0, _track.registerEvent)(WORKSPACE_CREATED_EVENT, workspaceCreatedSchema);

//# sourceMappingURL=workspace-created.js.map