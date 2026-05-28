"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseSoftDeleteRestRequest", {
    enumerable: true,
    get: function() {
        return parseSoftDeleteRestRequest;
    }
});
const _utils = require("twenty-shared/utils");
const parseSoftDeleteRestRequest = (request)=>{
    if (!(0, _utils.isDefined)(request.query.soft_delete)) {
        return false;
    }
    return request.query.soft_delete === 'true';
};

//# sourceMappingURL=parse-soft-delete-rest-request.util.js.map