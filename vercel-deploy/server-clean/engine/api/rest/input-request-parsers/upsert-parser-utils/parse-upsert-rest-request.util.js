"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseUpsertRestRequest", {
    enumerable: true,
    get: function() {
        return parseUpsertRestRequest;
    }
});
const _utils = require("twenty-shared/utils");
const parseUpsertRestRequest = (request)=>{
    if (!(0, _utils.isDefined)(request.query.upsert)) {
        return false;
    }
    return request.query.upsert === 'true';
};

//# sourceMappingURL=parse-upsert-rest-request.util.js.map