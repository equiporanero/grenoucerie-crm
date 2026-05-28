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
    get OBJECT_RECORD_UPSERTED_EVENT () {
        return OBJECT_RECORD_UPSERTED_EVENT;
    },
    get objectRecordUpsertedSchema () {
        return objectRecordUpsertedSchema;
    }
});
const _zod = require("zod");
const _track = require("../workspace-event/track");
const OBJECT_RECORD_UPSERTED_EVENT = 'Object Record Upserted';
const objectRecordUpsertedSchema = _zod.z.object({
    event: _zod.z.literal(OBJECT_RECORD_UPSERTED_EVENT),
    properties: _zod.z.looseObject({})
});
(0, _track.registerEvent)(OBJECT_RECORD_UPSERTED_EVENT, objectRecordUpsertedSchema);

//# sourceMappingURL=object-record-upserted.js.map