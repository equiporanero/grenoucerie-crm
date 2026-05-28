"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _isworkemail = require("../is-work-email");
describe('isWorkEmail', ()=>{
    it('should return true for a work email', ()=>{
        expect((0, _isworkemail.isWorkEmail)('user@company.com')).toBe(true);
    });
    it('should return false for a personal email', ()=>{
        expect((0, _isworkemail.isWorkEmail)('user@gmail.com')).toBe(false);
    });
    it('should return false for an empty email string', ()=>{
        expect((0, _isworkemail.isWorkEmail)('')).toBe(false);
    });
    it('should return false for an email with undefined domain', ()=>{
        // Assuming getDomainNameByEmail(email) returns undefined if no domain.
        expect((0, _isworkemail.isWorkEmail)('user@')).toBe(false);
    });
    it('should return false for an invalid email format', ()=>{
        expect((0, _isworkemail.isWorkEmail)('invalid-email')).toBe(false);
    });
});

//# sourceMappingURL=is-work-email.spec.js.map