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
    get OBJECT_RECORD_UPDATED_EVENT () {
        return OBJECT_RECORD_UPDATED_EVENT;
    },
    get objectRecordUpdatedSchema () {
        return objectRecordUpdatedSchema;
    }
});
const _zod = require("zod");
const _track = require("../workspace-event/track");
const OBJECT_RECORD_UPDATED_EVENT = 'Object Record Updated';
const objectRecordUpdatedSchema = _zod.z.object({
    event: _zod.z.literal(OBJECT_RECORD_UPDATED_EVENT),
    properties: _zod.z.looseObject({})
});
(0, _track.registerEvent)(OBJECT_RECORD_UPDATED_EVENT, objectRecordUpdatedSchema);

//# sourceMappingURL=object-record-updated.js.map