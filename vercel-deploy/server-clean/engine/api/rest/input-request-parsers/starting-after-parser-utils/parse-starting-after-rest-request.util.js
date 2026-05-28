"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseStartingAfterRestRequest", {
    enumerable: true,
    get: function() {
        return parseStartingAfterRestRequest;
    }
});
const parseStartingAfterRestRequest = (request)=>{
    const cursorQuery = request.query?.starting_after;
    if (typeof cursorQuery !== 'string') {
        return undefined;
    }
    return cursorQuery;
};

//# sourceMappingURL=parse-starting-after-rest-request.util.js.map