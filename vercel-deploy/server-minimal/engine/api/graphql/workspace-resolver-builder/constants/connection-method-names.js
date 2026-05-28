"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CONNECTION_METHOD_NAMES", {
    enumerable: true,
    get: function() {
        return CONNECTION_METHOD_NAMES;
    }
});
const _resolvermethodnames = require("./resolver-method-names");
const CONNECTION_METHOD_NAMES = new Set([
    _resolvermethodnames.RESOLVER_METHOD_NAMES.FIND_MANY,
    _resolvermethodnames.RESOLVER_METHOD_NAMES.FIND_DUPLICATES,
    _resolvermethodnames.RESOLVER_METHOD_NAMES.CREATE_MANY,
    _resolvermethodnames.RESOLVER_METHOD_NAMES.UPDATE_MANY,
    _resolvermethodnames.RESOLVER_METHOD_NAMES.DELETE_MANY,
    _resolvermethodnames.RESOLVER_METHOD_NAMES.DESTROY_MANY,
    _resolvermethodnames.RESOLVER_METHOD_NAMES.RESTORE_MANY
]);

//# sourceMappingURL=connection-method-names.js.map