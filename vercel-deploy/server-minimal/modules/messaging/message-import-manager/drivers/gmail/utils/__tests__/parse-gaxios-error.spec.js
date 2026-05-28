"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _gaxioserrormocks = /*#__PURE__*/ _interop_require_default(require("../../mocks/gaxios-error-mocks"));
const _isgmailnetworkerrorutil = require("../is-gmail-network-error.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('isGmailNetworkError', ()=>{
    it('should return a MessageImportDriverException for ECONNRESET', ()=>{
        const error = _gaxioserrormocks.default.getError('ECONNRESET');
        const result = (0, _isgmailnetworkerrorutil.isGmailNetworkError)(error);
        expect(result).toBe(true);
    });
    it('should return a MessageImportDriverException for ENOTFOUND', ()=>{
        const error = _gaxioserrormocks.default.getError('ENOTFOUND');
        const result = (0, _isgmailnetworkerrorutil.isGmailNetworkError)(error);
        expect(result).toBe(true);
    });
    it('should return a MessageImportDriverException for ECONNABORTED', ()=>{
        const error = _gaxioserrormocks.default.getError('ECONNABORTED');
        const result = (0, _isgmailnetworkerrorutil.isGmailNetworkError)(error);
        expect(result).toBe(true);
    });
    it('should return a MessageImportDriverException for ETIMEDOUT', ()=>{
        const error = _gaxioserrormocks.default.getError('ETIMEDOUT');
        const result = (0, _isgmailnetworkerrorutil.isGmailNetworkError)(error);
        expect(result).toBe(true);
    });
    it('should return a MessageImportDriverException for ERR_NETWORK', ()=>{
        const error = _gaxioserrormocks.default.getError('ERR_NETWORK');
        const result = (0, _isgmailnetworkerrorutil.isGmailNetworkError)(error);
        expect(result).toBe(true);
    });
    it('should return undefined for unknown error codes', ()=>{
        const error = {
            code: 'UNKNOWN_ERROR'
        };
        const result = (0, _isgmailnetworkerrorutil.isGmailNetworkError)(error);
        expect(result).toBe(false);
    });
});

//# sourceMappingURL=parse-gaxios-error.spec.js.map