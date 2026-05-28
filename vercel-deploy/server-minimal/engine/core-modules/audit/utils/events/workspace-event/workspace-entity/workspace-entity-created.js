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
    get WORKSPACE_ENTITY_CREATED_EVENT () {
        return WORKSPACE_ENTITY_CREATED_EVENT;
    },
    get workspaceEntityCreatedSchema () {
        return workspaceEntityCreatedSchema;
    }
});
const _zod = require("zod");
const _track = require("../track");
const WORKSPACE_ENTITY_CREATED_EVENT = 'Workspace Entity Created';
const workspaceEntityCreatedSchema = _zod.z.strictObject({
    event: _zod.z.literal(WORKSPACE_ENTITY_CREATED_EVENT),
    properties: _zod.z.strictObject({
        name: _zod.z.string()
    })
});
(0, _track.registerEvent)(WORKSPACE_ENTITY_CREATED_EVENT, workspaceEntityCreatedSchema);

//# sourceMappingURL=workspace-entity-created.js.map