"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parsegmailerrorretryafterutil = require("../parse-gmail-error-retry-after.util");
describe('parseGmailErrorRetryAfter', ()=>{
    it('should extract the retry-after date from a Gmail 429 error message', ()=>{
        const fifteenMinutesFromNow = new Date(Date.now() + 15 * 60 * 1000);
        const message = `User-rate limit exceeded.  Retry after ${fifteenMinutesFromNow.toISOString()}`;
        const result = (0, _parsegmailerrorretryafterutil.parseGmailErrorRetryAfter)(message);
        expect(result).toBeInstanceOf(Date);
        expect(result.getTime()).toBeCloseTo(fifteenMinutesFromNow.getTime(), -3);
    });
    it('should return undefined when the message contains no retry-after timestamp', ()=>{
        expect((0, _parsegmailerrorretryafterutil.parseGmailErrorRetryAfter)('Too Many Concurrent Requests')).toBeUndefined();
    });
    it('should return undefined when the retry-after timestamp has already passed', ()=>{
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const message = `User-rate limit exceeded.  Retry after ${fiveMinutesAgo.toISOString()}`;
        expect((0, _parsegmailerrorretryafterutil.parseGmailErrorRetryAfter)(message)).toBeUndefined();
    });
    it('should return undefined for an empty string', ()=>{
        expect((0, _parsegmailerrorretryafterutil.parseGmailErrorRetryAfter)('')).toBeUndefined();
    });
    it('should match case variations of "Retry after"', ()=>{
        const fifteenMinutesFromNow = new Date(Date.now() + 15 * 60 * 1000);
        const message = `User-rate limit exceeded.  retry after ${fifteenMinutesFromNow.toISOString()}`;
        const result = (0, _parsegmailerrorretryafterutil.parseGmailErrorRetryAfter)(message);
        expect(result).toBeInstanceOf(Date);
        expect(result.getTime()).toBeCloseTo(fifteenMinutesFromNow.getTime(), -3);
    });
});

//# sourceMappingURL=parse-gmail-error-retry-after.spec.js.map