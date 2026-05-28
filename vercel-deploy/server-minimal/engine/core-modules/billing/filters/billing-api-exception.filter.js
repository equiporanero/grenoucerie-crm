/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return BillingRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _stripe = /*#__PURE__*/ _interop_require_default(require("stripe"));
const _billingexception = require("../billing.exception");
const _httpexceptionhandlerservice = require("../../exception-handler/http-exception-handler.service");
const _getbillingexceptionstatuscodeutil = require("../utils/get-billing-exception-status-code.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingRestApiExceptionFilter = class BillingRestApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof _stripe.default.errors.StripeError) {
            return this.httpExceptionHandlerService.handleError({
                code: _billingexception.BillingExceptionCode.BILLING_STRIPE_ERROR,
                message: exception.message,
                name: 'StripeError'
            }, response, 400);
        }
        return this.httpExceptionHandlerService.handleError(exception, response, (0, _getbillingexceptionstatuscodeutil.getBillingExceptionStatusCode)(exception));
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
BillingRestApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_billingexception.BillingException, _stripe.default.errors.StripeError),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], BillingRestApiExceptionFilter);

//# sourceMappingURL=billing-api-exception.filter.js.map