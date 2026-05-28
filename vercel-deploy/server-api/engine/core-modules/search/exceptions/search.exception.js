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
    get SearchException () {
        return SearchException;
    },
    get SearchExceptionCode () {
        return SearchExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var SearchExceptionCode = /*#__PURE__*/ function(SearchExceptionCode) {
    SearchExceptionCode["LABEL_IDENTIFIER_FIELD_NOT_FOUND"] = "LABEL_IDENTIFIER_FIELD_NOT_FOUND";
    SearchExceptionCode["OBJECT_METADATA_NOT_FOUND"] = "OBJECT_METADATA_NOT_FOUND";
    return SearchExceptionCode;
}({});
const getSearchExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "LABEL_IDENTIFIER_FIELD_NOT_FOUND":
            return /*i18n*/ {
                id: "6GG2MJ",
                message: "No identifier to search by was found."
            };
        case "OBJECT_METADATA_NOT_FOUND":
            return /*i18n*/ {
                id: "AKqp4k",
                message: "Object not found."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let SearchException = class SearchException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getSearchExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=search.exception.js.map