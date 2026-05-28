"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _aiexception = require("../../ai.exception");
const _aigraphqlapiexceptionhandlerutil = require("../ai-graphql-api-exception-handler.util");
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
const catchGraphqlError = (error)=>{
    try {
        (0, _aigraphqlapiexceptionhandlerutil.aiGraphqlApiExceptionHandler)(error);
        throw new Error('Expected aiGraphqlApiExceptionHandler to throw');
    } catch (graphqlError) {
        return graphqlError;
    }
};
describe('aiGraphqlApiExceptionHandler', ()=>{
    it('maps API key configuration failures to INTERNAL_SERVER_ERROR with a subCode', ()=>{
        const error = new _aiexception.AiException('No AI models are available', _aiexception.AiExceptionCode.API_KEY_NOT_CONFIGURED);
        const graphqlError = catchGraphqlError(error);
        expect(graphqlError.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.INTERNAL_SERVER_ERROR);
        expect(graphqlError.extensions.subCode).toBe(_aiexception.AiExceptionCode.API_KEY_NOT_CONFIGURED);
        expect(graphqlError.extensions.userFriendlyMessage).toBeDefined();
    });
    it('maps THREAD_NOT_FOUND to NOT_FOUND', ()=>{
        const error = new _aiexception.AiException('Thread not found', _aiexception.AiExceptionCode.THREAD_NOT_FOUND);
        const graphqlError = catchGraphqlError(error);
        expect(graphqlError.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.NOT_FOUND);
        expect(graphqlError.extensions.subCode).toBe(_aiexception.AiExceptionCode.THREAD_NOT_FOUND);
    });
    it('maps MESSAGE_NOT_FOUND to NOT_FOUND', ()=>{
        const error = new _aiexception.AiException('Message not found', _aiexception.AiExceptionCode.MESSAGE_NOT_FOUND);
        const graphqlError = catchGraphqlError(error);
        expect(graphqlError.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.NOT_FOUND);
        expect(graphqlError.extensions.subCode).toBe(_aiexception.AiExceptionCode.MESSAGE_NOT_FOUND);
    });
});

//# sourceMappingURL=ai-graphql-api-exception-handler.util.spec.js.map