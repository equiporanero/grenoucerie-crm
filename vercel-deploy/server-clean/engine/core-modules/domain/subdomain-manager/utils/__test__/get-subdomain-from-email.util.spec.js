"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getsubdomainfromemailutil = require("../get-subdomain-from-email.util");
describe('getSubdomainFromEmail', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    it('should return undefined if email is not defined', ()=>{
        const result = (0, _getsubdomainfromemailutil.getSubdomainFromEmail)(undefined);
        expect(result).toBeUndefined();
    });
    it('should return undefined if email is not a work email', ()=>{
        const result = (0, _getsubdomainfromemailutil.getSubdomainFromEmail)('test@gmail.com');
        expect(result).toBeUndefined();
    });
    it('should return the domain name if email is valid and a work email', ()=>{
        const result = (0, _getsubdomainfromemailutil.getSubdomainFromEmail)('test@twenty.com');
        expect(result).toBe('twenty');
    });
});

//# sourceMappingURL=get-subdomain-from-email.util.spec.js.map