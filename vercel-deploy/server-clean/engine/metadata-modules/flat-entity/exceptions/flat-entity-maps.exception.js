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
    get FlatEntityMapsException () {
        return FlatEntityMapsException;
    },
    get FlatEntityMapsExceptionCode () {
        return FlatEntityMapsExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../../utils/custom-exception");
const FlatEntityMapsExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND: 'RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND',
    ENTITY_ALREADY_EXISTS: 'ENTITY_ALREADY_EXISTS',
    ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
    ENTITY_MALFORMED: 'ENTITY_MALFORMED'
});
const getFlatEntityMapsExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND:
        case FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS:
        case FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND:
        case FlatEntityMapsExceptionCode.ENTITY_MALFORMED:
        case FlatEntityMapsExceptionCode.INTERNAL_SERVER_ERROR:
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let FlatEntityMapsException = class FlatEntityMapsException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getFlatEntityMapsExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=flat-entity-maps.exception.js.map