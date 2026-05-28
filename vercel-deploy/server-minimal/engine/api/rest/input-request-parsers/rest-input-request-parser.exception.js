"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get RestInputRequestParserException () {
        return RestInputRequestParserException;
    },
    get RestInputRequestParserExceptionCode () {
        return RestInputRequestParserExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var RestInputRequestParserExceptionCode = /*#__PURE__*/ function(RestInputRequestParserExceptionCode) {
    RestInputRequestParserExceptionCode["INVALID_AGGREGATE_FIELDS_QUERY_PARAM"] = "INVALID_AGGREGATE_FIELDS_QUERY_PARAM";
    RestInputRequestParserExceptionCode["INVALID_GROUP_BY_QUERY_PARAM"] = "INVALID_GROUP_BY_QUERY_PARAM";
    RestInputRequestParserExceptionCode["INVALID_ORDER_BY_WITH_GROUP_BY_QUERY_PARAM"] = "INVALID_ORDER_BY_WITH_GROUP_BY_QUERY_PARAM";
    RestInputRequestParserExceptionCode["INVALID_ORDER_BY_QUERY_PARAM"] = "INVALID_ORDER_BY_QUERY_PARAM";
    RestInputRequestParserExceptionCode["INVALID_DEPTH_QUERY_PARAM"] = "INVALID_DEPTH_QUERY_PARAM";
    RestInputRequestParserExceptionCode["INVALID_LIMIT_QUERY_PARAM"] = "INVALID_LIMIT_QUERY_PARAM";
    RestInputRequestParserExceptionCode["INVALID_FILTER_QUERY_PARAM"] = "INVALID_FILTER_QUERY_PARAM";
    return RestInputRequestParserExceptionCode;
}({});
const getRestInputRequestParserExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_AGGREGATE_FIELDS_QUERY_PARAM":
            return /*i18n*/ {
                id: "hJpBT6",
                message: "Invalid aggregate fields parameter."
            };
        case "INVALID_GROUP_BY_QUERY_PARAM":
            return /*i18n*/ {
                id: "lPC0WB",
                message: "Invalid group by parameter."
            };
        case "INVALID_ORDER_BY_WITH_GROUP_BY_QUERY_PARAM":
            return /*i18n*/ {
                id: "f7SWSg",
                message: "Invalid order by with group by parameter."
            };
        case "INVALID_ORDER_BY_QUERY_PARAM":
            return /*i18n*/ {
                id: "t4AABW",
                message: "Invalid order by parameter."
            };
        case "INVALID_DEPTH_QUERY_PARAM":
            return /*i18n*/ {
                id: "i++4Wk",
                message: "Invalid depth parameter."
            };
        case "INVALID_LIMIT_QUERY_PARAM":
            return /*i18n*/ {
                id: "Y8ap4e",
                message: "Invalid limit parameter."
            };
        case "INVALID_FILTER_QUERY_PARAM":
            return /*i18n*/ {
                id: "1yoHmO",
                message: "Invalid filter parameter."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let RestInputRequestParserException = class RestInputRequestParserException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getRestInputRequestParserExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=rest-input-request-parser.exception.js.map