"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "connectionParametersUpdateSchema", {
    enumerable: true,
    get: function() {
        return connectionParametersUpdateSchema;
    }
});
const _zod = require("zod");
const _connectionparametersschema = require("./connection-parameters.schema");
const connectionParametersUpdateSchema = _connectionparametersschema.connectionParametersSchema.extend({
    password: _zod.z.string().min(1, 'Password is required').optional()
});

//# sourceMappingURL=connection-parameters-update.schema.js.map