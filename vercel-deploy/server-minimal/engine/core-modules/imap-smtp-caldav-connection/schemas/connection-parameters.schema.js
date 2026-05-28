"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "connectionParametersSchema", {
    enumerable: true,
    get: function() {
        return connectionParametersSchema;
    }
});
const _zod = require("zod");
const connectionParametersSchema = _zod.z.object({
    host: _zod.z.string().min(1, 'Host is required'),
    port: _zod.z.int().positive('Port must be a positive number'),
    username: _zod.z.string().optional(),
    password: _zod.z.string().min(1, 'Password is required'),
    secure: _zod.z.boolean().optional()
});

//# sourceMappingURL=connection-parameters.schema.js.map