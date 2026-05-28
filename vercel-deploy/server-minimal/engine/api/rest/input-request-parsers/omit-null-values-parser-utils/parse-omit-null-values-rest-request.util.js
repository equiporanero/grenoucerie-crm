"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseOmitNullValuesRestRequest", {
    enumerable: true,
    get: function() {
        return parseOmitNullValuesRestRequest;
    }
});
const _utils = require("twenty-shared/utils");
const parseOmitNullValuesRestRequest = (request)=>{
    if (!(0, _utils.isDefined)(request.query.omit_null_values)) {
        return false;
    }
    return request.query.omit_null_values === 'true';
};

//# sourceMappingURL=parse-omit-null-values-rest-request.util.js.map