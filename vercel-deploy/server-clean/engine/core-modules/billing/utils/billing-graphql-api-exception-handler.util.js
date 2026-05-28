/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "billingGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return billingGraphqlApiExceptionHandler;
    }
});
const _stripe = /*#__PURE__*/ _interop_require_default(require("stripe"));
const _billingexception = require("../billing.exception");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _getbillingexceptionstatuscodeutil = require("./get-billing-exception-status-code.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const billingGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _stripe.default.errors.StripeError) {
        throw new _graphqlerrorsutil.InternalServerError(error.message, {
            subCode: _billingexception.BillingExceptionCode.BILLING_STRIPE_ERROR,
            userFriendlyMessage: /*i18n*/ {
                id: "W6LTzL",
                message: "A payment processing error occurred."
            }
        });
    }
    if (error instanceof _billingexception.BillingException) {
        switch((0, _getbillingexceptionstatuscodeutil.getBillingExceptionStatusCode)(error)){
            case 404:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case 400:
                throw new _graphqlerrorsutil.UserInputError(error);
            case 402:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            case 500:
                throw new _graphqlerrorsutil.InternalServerError(error);
        }
    }
    throw error;
};

//# sourceMappingURL=billing-graphql-api-exception-handler.util.js.map