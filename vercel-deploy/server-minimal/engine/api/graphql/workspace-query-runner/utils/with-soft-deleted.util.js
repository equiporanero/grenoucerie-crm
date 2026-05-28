"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withSoftDeleted", {
    enumerable: true,
    get: function() {
        return withSoftDeleted;
    }
});
const _utils = require("twenty-shared/utils");
const withSoftDeleted = (filter)=>{
    if (!(0, _utils.isDefined)(filter)) {
        return false;
    }
    if (Array.isArray(filter)) {
        return filter.some((item)=>withSoftDeleted(item));
    }
    for (const [key, value] of Object.entries(filter)){
        if (key === 'deletedAt') {
            return true;
        }
        if (typeof value === 'object' && value !== null) {
            if (withSoftDeleted(value)) {
                return true;
            }
        }
    }
    return false;
};

//# sourceMappingURL=with-soft-deleted.util.js.map