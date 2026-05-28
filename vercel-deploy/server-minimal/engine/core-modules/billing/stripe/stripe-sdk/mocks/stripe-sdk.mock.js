/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StripeSDKMock", {
    enumerable: true,
    get: function() {
        return StripeSDKMock;
    }
});
let StripeSDKMock = class StripeSDKMock {
    constructor(_apiKey){
        this._apiKey = _apiKey;
        this.customers = {
            update: (_id, _params)=>{
                return;
            }
        };
        this.webhooks = {
            constructEvent: (payload, signature, _webhookSecret)=>{
                if (signature === 'correct-signature') {
                    const body = JSON.parse(payload.toString());
                    return {
                        type: body.type,
                        data: body.data
                    };
                }
                throw new Error('Invalid signature');
            }
        };
    }
};

//# sourceMappingURL=stripe-sdk.mock.js.map