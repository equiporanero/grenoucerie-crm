"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseDepthRestRequest", {
    enumerable: true,
    get: function() {
        return parseDepthRestRequest;
    }
});
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _restinputrequestparserexception = require("../rest-input-request-parser.exception");
const parseDepthRestRequest = (request)=>{
    if (!request.query.depth) {
        return 0;
    }
    const depth = +request.query.depth;
    const ALLOWED_DEPTH_VALUES = [
        0,
        1
    ];
    if (isNaN(depth) || !ALLOWED_DEPTH_VALUES.includes(depth)) {
        throw new _restinputrequestparserexception.RestInputRequestParserException(`'depth=${request.query.depth}' parameter invalid. Allowed values are ${ALLOWED_DEPTH_VALUES.join(', ')}`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_DEPTH_QUERY_PARAM, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    return depth;
};

//# sourceMappingURL=parse-depth-rest-request.util.js.map