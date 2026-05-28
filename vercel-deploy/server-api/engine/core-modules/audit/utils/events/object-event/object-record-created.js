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
    get OBJECT_RECORD_CREATED_EVENT () {
        return OBJECT_RECORD_CREATED_EVENT;
    },
    get objectRecordCreatedSchema () {
        return objectRecordCreatedSchema;
    }
});
const _zod = require("zod");
const _track = require("../workspace-event/track");
const OBJECT_RECORD_CREATED_EVENT = 'Object Record Created';
const objectRecordCreatedSchema = _zod.z.object({
    event: _zod.z.literal(OBJECT_RECORD_CREATED_EVENT),
    properties: _zod.z.looseObject({})
});
(0, _track.registerEvent)(OBJECT_RECORD_CREATED_EVENT, objectRecordCreatedSchema);

//# sourceMappingURL=object-record-created.js.map