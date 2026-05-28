"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "twentyORMGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return twentyORMGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../core-modules/graphql/utils/graphql-errors.util");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const twentyORMGraphqlApiExceptionHandler = (error)=>{
    switch(error.code){
        case _twentyormexception.TwentyORMExceptionCode.DUPLICATE_ENTRY_DETECTED:
            {
                const duplicateKeyError = error;
                const extensions = {
                    userFriendlyMessage: error.userFriendlyMessage,
                    ...(0, _utils.isDefined)(duplicateKeyError.conflictingRecordId) && (0, _utils.isDefined)(duplicateKeyError.conflictingObjectNameSingular) ? {
                        conflictingRecordId: duplicateKeyError.conflictingRecordId,
                        conflictingObjectNameSingular: duplicateKeyError.conflictingObjectNameSingular
                    } : {}
                };
                throw new _graphqlerrorsutil.UserInputError(error.message, extensions);
            }
        case _twentyormexception.TwentyORMExceptionCode.INVALID_INPUT:
        case _twentyormexception.TwentyORMExceptionCode.CONNECT_RECORD_NOT_FOUND:
        case _twentyormexception.TwentyORMExceptionCode.CONNECT_NOT_ALLOWED:
        case _twentyormexception.TwentyORMExceptionCode.CONNECT_UNIQUE_CONSTRAINT_ERROR:
        case _twentyormexception.TwentyORMExceptionCode.RLS_VALIDATION_FAILED:
        case _twentyormexception.TwentyORMExceptionCode.TOO_MANY_RECORDS_TO_UPDATE:
            throw new _graphqlerrorsutil.UserInputError(error.message, {
                userFriendlyMessage: error.userFriendlyMessage
            });
        default:
            {
                throw error;
            }
    }
};

//# sourceMappingURL=twenty-orm-graphql-api-exception-handler.util.js.map