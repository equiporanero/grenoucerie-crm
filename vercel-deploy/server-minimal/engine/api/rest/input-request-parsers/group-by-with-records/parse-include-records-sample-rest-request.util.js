"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseIncludeRecordsSampleRestRequest", {
    enumerable: true,
    get: function() {
        return parseIncludeRecordsSampleRestRequest;
    }
});
const _utils = require("twenty-shared/utils");
const parseIncludeRecordsSampleRestRequest = (request)=>{
    if (!(0, _utils.isDefined)(request.query.include_records_sample)) {
        return false;
    }
    return request.query.include_records_sample === 'true';
};

//# sourceMappingURL=parse-include-records-sample-rest-request.util.js.map