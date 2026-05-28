"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeDefaultValue", {
    enumerable: true,
    get: function() {
        return sanitizeDefaultValue;
    }
});
const _removesqlinjectionutil = require("../../../workspace-manager/workspace-migration/utils/remove-sql-injection.util");
const ALLOWED_DEFAULT_FUNCTIONS = new Set([
    'public.uuid_generate_v4()',
    'now()'
]);
const sanitizeDefaultValue = (defaultValue)=>{
    if (defaultValue === null) {
        return 'NULL';
    }
    if (typeof defaultValue === 'string') {
        if (ALLOWED_DEFAULT_FUNCTIONS.has(defaultValue.toLowerCase())) {
            return defaultValue;
        }
        return (0, _removesqlinjectionutil.escapeLiteral)(defaultValue);
    }
    return defaultValue;
};

//# sourceMappingURL=sanitize-default-value.util.js.map