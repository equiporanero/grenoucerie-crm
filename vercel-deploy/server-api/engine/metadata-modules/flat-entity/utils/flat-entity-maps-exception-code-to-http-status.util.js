"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "flatEntityMapsExceptionCodeToHttpStatus", {
    enumerable: true,
    get: function() {
        return flatEntityMapsExceptionCodeToHttpStatus;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../exceptions/flat-entity-maps.exception");
const flatEntityMapsExceptionCodeToHttpStatus = (code)=>{
    switch(code){
        case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND:
            return 404;
        case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS:
            return 409;
        case _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND:
        case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_MALFORMED:
        case _flatentitymapsexception.FlatEntityMapsExceptionCode.INTERNAL_SERVER_ERROR:
            return 500;
        default:
            return (0, _utils.assertUnreachable)(code);
    }
};

//# sourceMappingURL=flat-entity-maps-exception-code-to-http-status.util.js.map