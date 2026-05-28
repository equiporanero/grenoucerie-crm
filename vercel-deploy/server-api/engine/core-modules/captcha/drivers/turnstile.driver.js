"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TurnstileDriver", {
    enumerable: true,
    get: function() {
        return TurnstileDriver;
    }
});
let TurnstileDriver = class TurnstileDriver {
    async validate(token) {
        const formData = new URLSearchParams({
            secret: this.secretKey,
            response: token
        });
        const response = await this.httpService.post('', formData);
        const responseData = response.data;
        return {
            success: responseData.success,
            ...!responseData.success && {
                error: responseData['error-codes']?.[0] ?? 'unknown-error'
            }
        };
    }
    constructor(_options, httpClient){
        this._options = _options;
        this._siteKey = _options.siteKey;
        this.secretKey = _options.secretKey;
        this.httpService = httpClient;
    }
};

//# sourceMappingURL=turnstile.driver.js.map