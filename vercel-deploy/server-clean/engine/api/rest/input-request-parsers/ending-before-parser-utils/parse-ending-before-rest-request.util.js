"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseEndingBeforeRestRequest", {
    enumerable: true,
    get: function() {
        return parseEndingBeforeRestRequest;
    }
});
const parseEndingBeforeRestRequest = (request)=>{
    const cursorQuery = request.query?.ending_before;
    if (typeof cursorQuery !== 'string') {
        return undefined;
    }
    return cursorQuery;
};

//# sourceMappingURL=parse-ending-before-rest-request.util.js.map