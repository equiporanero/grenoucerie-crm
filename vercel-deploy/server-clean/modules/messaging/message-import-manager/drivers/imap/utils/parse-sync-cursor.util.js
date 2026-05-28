"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseSyncCursor", {
    enumerable: true,
    get: function() {
        return parseSyncCursor;
    }
});
const _utils = require("twenty-shared/utils");
const parseSyncCursor = (cursor)=>{
    if (!(0, _utils.isDefined)(cursor)) {
        return null;
    }
    try {
        return JSON.parse(cursor);
    } catch  {
        return null;
    }
};

//# sourceMappingURL=parse-sync-cursor.util.js.map