"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeUndefinedFromRecord", {
    enumerable: true,
    get: function() {
        return removeUndefinedFromRecord;
    }
});
const _utils = require("twenty-shared/utils");
const removeUndefinedFromRecord = (record)=>{
    const result = {};
    for (const [key, value] of Object.entries(record)){
        if (!(0, _utils.isDefined)(value)) {
            continue;
        }
        // Recursively clean nested objects (composite fields like LINKS, ADDRESS, etc.)
        // but preserve arrays as-is (they should be handled separately if needed)
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            const cleaned = removeUndefinedFromRecord(value);
            // Only include the nested object if it has at least one defined property
            if (Object.keys(cleaned).length > 0) {
                result[key] = cleaned;
            }
        } else {
            result[key] = value;
        }
    }
    return result;
};

//# sourceMappingURL=remove-undefined-from-record.util.js.map