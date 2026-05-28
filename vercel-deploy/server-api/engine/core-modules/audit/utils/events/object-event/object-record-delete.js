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
    get OBJECT_RECORD_DELETED_EVENT () {
        return OBJECT_RECORD_DELETED_EVENT;
    },
    get objectRecordDeletedSchema () {
        return objectRecordDeletedSchema;
    }
});
const _zod = require("zod");
const _track = require("../workspace-event/track");
const OBJECT_RECORD_DELETED_EVENT = 'Object Record Deleted';
const objectRecordDeletedSchema = _zod.z.object({
    event: _zod.z.literal(OBJECT_RECORD_DELETED_EVENT),
    properties: _zod.z.looseObject({})
});
(0, _track.registerEvent)(OBJECT_RECORD_DELETED_EVENT, objectRecordDeletedSchema);

//# sourceMappingURL=object-record-delete.js.map