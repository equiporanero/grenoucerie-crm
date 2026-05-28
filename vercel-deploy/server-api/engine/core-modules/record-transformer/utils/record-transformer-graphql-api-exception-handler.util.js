"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recordTransformerGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return recordTransformerGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _recordtransformerexception = require("../record-transformer.exception");
const recordTransformerGraphqlApiExceptionHandler = (error)=>{
    switch(error.code){
        case _recordtransformerexception.RecordTransformerExceptionCode.INVALID_PHONE_NUMBER:
        case _recordtransformerexception.RecordTransformerExceptionCode.INVALID_PHONE_COUNTRY_CODE:
        case _recordtransformerexception.RecordTransformerExceptionCode.CONFLICTING_PHONE_COUNTRY_CODE:
        case _recordtransformerexception.RecordTransformerExceptionCode.CONFLICTING_PHONE_CALLING_CODE:
        case _recordtransformerexception.RecordTransformerExceptionCode.CONFLICTING_PHONE_CALLING_CODE_AND_COUNTRY_CODE:
        case _recordtransformerexception.RecordTransformerExceptionCode.INVALID_PHONE_CALLING_CODE:
        case _recordtransformerexception.RecordTransformerExceptionCode.INVALID_URL:
            throw new _graphqlerrorsutil.UserInputError(error);
        default:
            {
                (0, _utils.assertUnreachable)(error.code);
            }
    }
};

//# sourceMappingURL=record-transformer-graphql-api-exception-handler.util.js.map