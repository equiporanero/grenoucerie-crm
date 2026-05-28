"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _gaxios = require("gaxios");
const _isgmailapierrorutil = require("../is-gmail-api-error.util");
describe('isGmailApiError', ()=>{
    it('should detect Gmail API error shape even when instanceof GaxiosError fails', ()=>{
        const originalError = new _gaxios.GaxiosError('Rate limit exceeded', {}, {
            status: 429,
            statusText: 'Too Many Requests',
            headers: {},
            config: {},
            request: {
                responseURL: ''
            },
            data: {
                error: {
                    errors: [
                        {
                            reason: 'rateLimitExceeded',
                            message: 'Rate limit exceeded'
                        }
                    ]
                }
            }
        });
        const serialized = JSON.parse(JSON.stringify(originalError));
        expect(serialized instanceof _gaxios.GaxiosError).toBe(false);
        expect((0, _isgmailapierrorutil.isGmailApiError)(serialized)).toBe(true);
    });
    it('should detect error when data.error is a string instead of object', ()=>{
        const error = {
            response: {
                status: 429,
                data: {
                    error: 'userRateLimitExceeded',
                    error_description: 'User Rate Limit Exceeded'
                }
            }
        };
        expect((0, _isgmailapierrorutil.isGmailApiError)(error)).toBe(true);
    });
    it('should reject network errors that have no response', ()=>{
        const networkError = new Error('connect ECONNREFUSED');
        expect((0, _isgmailapierrorutil.isGmailApiError)(networkError)).toBe(false);
    });
});

//# sourceMappingURL=is-gmail-api-error.util.spec.js.map