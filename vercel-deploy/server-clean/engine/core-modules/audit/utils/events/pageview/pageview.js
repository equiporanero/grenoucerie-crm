"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pageviewSchema", {
    enumerable: true,
    get: function() {
        return pageviewSchema;
    }
});
const _zod = require("zod");
const _baseschemas = require("../common/base-schemas");
const pageviewSchema = _baseschemas.baseEventSchema.extend({
    type: _zod.z.literal('page'),
    name: _zod.z.string(),
    properties: _zod.z.object({
        href: _zod.z.string().optional().default(''),
        locale: _zod.z.string().optional().default(''),
        pathname: _zod.z.string().optional().default(''),
        referrer: _zod.z.string().optional().default(''),
        sessionId: _zod.z.string().optional().default(''),
        timeZone: _zod.z.string().optional().default(''),
        userAgent: _zod.z.string().optional().default('')
    })
});

//# sourceMappingURL=pageview.js.map