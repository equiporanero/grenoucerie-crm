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
    get RelationException () {
        return RelationException;
    },
    get RelationExceptionCode () {
        return RelationExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../utils/custom-exception");
var RelationExceptionCode = /*#__PURE__*/ function(RelationExceptionCode) {
    RelationExceptionCode["RELATION_OBJECT_METADATA_NOT_FOUND"] = "RELATION_OBJECT_METADATA_NOT_FOUND";
    RelationExceptionCode["RELATION_TARGET_FIELD_METADATA_ID_NOT_FOUND"] = "RELATION_TARGET_FIELD_METADATA_ID_NOT_FOUND";
    RelationExceptionCode["RELATION_JOIN_COLUMN_ON_BOTH_SIDES"] = "RELATION_JOIN_COLUMN_ON_BOTH_SIDES";
    RelationExceptionCode["MISSING_RELATION_JOIN_COLUMN"] = "MISSING_RELATION_JOIN_COLUMN";
    RelationExceptionCode["MULTIPLE_JOIN_COLUMNS_FOUND"] = "MULTIPLE_JOIN_COLUMNS_FOUND";
    return RelationExceptionCode;
}({});
const getRelationExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "RELATION_OBJECT_METADATA_NOT_FOUND":
        case "RELATION_TARGET_FIELD_METADATA_ID_NOT_FOUND":
        case "RELATION_JOIN_COLUMN_ON_BOTH_SIDES":
        case "MISSING_RELATION_JOIN_COLUMN":
        case "MULTIPLE_JOIN_COLUMNS_FOUND":
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let RelationException = class RelationException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getRelationExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=relation.exception.js.map