"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseViewIdRestRequest", {
    enumerable: true,
    get: function() {
        return parseViewIdRestRequest;
    }
});
const _utils = require("twenty-shared/utils");
const parseViewIdRestRequest = (request)=>{
    if (!(0, _utils.isDefined)(request.query.viewId) || typeof request.query.viewId !== 'string') return undefined;
    return request.query.viewId;
};

//# sourceMappingURL=parse-view-id-rest-request.util.js.map