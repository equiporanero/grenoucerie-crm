/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StripeSDKMockService", {
    enumerable: true,
    get: function() {
        return StripeSDKMockService;
    }
});
const _common = require("@nestjs/common");
const _stripesdkmock = require("./stripe-sdk.mock");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let StripeSDKMockService = class StripeSDKMockService {
    getStripe(stripeApiKey) {
        return new _stripesdkmock.StripeSDKMock(stripeApiKey);
    }
};
StripeSDKMockService = _ts_decorate([
    (0, _common.Injectable)()
], StripeSDKMockService);

//# sourceMappingURL=stripe-sdk-mock.service.js.map