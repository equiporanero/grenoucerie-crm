"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getGroupLimit", {
    enumerable: true,
    get: function() {
        return getGroupLimit;
    }
});
const _constants = require("twenty-shared/constants");
const getGroupLimit = (limit)=>{
    if (typeof limit === 'number' && Number.isFinite(limit) && limit > 0 && Number.isInteger(limit)) {
        return limit;
    }
    return _constants.DEFAULT_NUMBER_OF_GROUPS_LIMIT;
};

//# sourceMappingURL=get-group-limit.util.js.map