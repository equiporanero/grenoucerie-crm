/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _billingexception = require("../../billing.exception");
const _billinggraphqlapiexceptionhandlerutil = require("../billing-graphql-api-exception-handler.util");
const _graphqlerrorsutil = require("../../../graphql/utils/graphql-errors.util");
const catchGraphqlError = (error)=>{
    try {
        (0, _billinggraphqlapiexceptionhandlerutil.billingGraphqlApiExceptionHandler)(error);
        throw new Error('Expected billingGraphqlApiExceptionHandler to throw');
    } catch (graphqlError) {
        return graphqlError;
    }
};
describe('billingGraphqlApiExceptionHandler', ()=>{
    it('maps credits exhausted to a GraphQL error with the billing subCode', ()=>{
        const error = new _billingexception.BillingException('Credits exhausted', _billingexception.BillingExceptionCode.BILLING_CREDITS_EXHAUSTED);
        const graphqlError = catchGraphqlError(error);
        expect(graphqlError.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.FORBIDDEN);
        expect(graphqlError.extensions.subCode).toBe(_billingexception.BillingExceptionCode.BILLING_CREDITS_EXHAUSTED);
        expect(graphqlError.extensions.userFriendlyMessage).toBeDefined();
    });
    it('maps billing not found errors to NOT_FOUND', ()=>{
        const error = new _billingexception.BillingException('Billing product not found', _billingexception.BillingExceptionCode.BILLING_PRODUCT_NOT_FOUND);
        const graphqlError = catchGraphqlError(error);
        expect(graphqlError.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.NOT_FOUND);
        expect(graphqlError.extensions.subCode).toBe(_billingexception.BillingExceptionCode.BILLING_PRODUCT_NOT_FOUND);
    });
    it('maps internal billing failures to INTERNAL_SERVER_ERROR', ()=>{
        const error = new _billingexception.BillingException('Invalid price tiers', _billingexception.BillingExceptionCode.BILLING_PRICE_INVALID_TIERS);
        const graphqlError = catchGraphqlError(error);
        expect(graphqlError.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.INTERNAL_SERVER_ERROR);
        expect(graphqlError.extensions.subCode).toBe(_billingexception.BillingExceptionCode.BILLING_PRICE_INVALID_TIERS);
    });
});

//# sourceMappingURL=billing-graphql-api-exception-handler.util.spec.js.map