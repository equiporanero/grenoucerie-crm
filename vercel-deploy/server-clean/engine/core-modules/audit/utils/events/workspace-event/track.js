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
    get eventsRegistry () {
        return eventsRegistry;
    },
    get genericTrackSchema () {
        return genericTrackSchema;
    },
    get registerEvent () {
        return registerEvent;
    }
});
const _zod = require("zod");
const _baseschemas = require("../common/base-schemas");
const genericTrackSchema = _baseschemas.baseEventSchema.extend({
    type: _zod.z.literal('track'),
    event: _zod.z.string(),
    properties: _zod.z.any()
});
const eventsRegistry = new Map();
function registerEvent(event, schema) {
    eventsRegistry.set(event, genericTrackSchema.merge(schema));
}

//# sourceMappingURL=track.js.map