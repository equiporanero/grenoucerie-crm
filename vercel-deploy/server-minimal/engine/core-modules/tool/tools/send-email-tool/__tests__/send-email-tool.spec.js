"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parsecommaseparatedemailsutil = require("../../email-tool/utils/parse-comma-separated-emails.util");
describe('SendEmailTool - parseCommaSeparatedEmails', ()=>{
    it('should parse comma-separated emails into array', ()=>{
        expect((0, _parsecommaseparatedemailsutil.parseCommaSeparatedEmails)('a@test.com, b@test.com, c@test.com')).toEqual([
            'a@test.com',
            'b@test.com',
            'c@test.com'
        ]);
    });
    it('should handle workflow variables mixed with emails', ()=>{
        expect((0, _parsecommaseparatedemailsutil.parseCommaSeparatedEmails)('{{trigger.record.email}}, static@example.com, {{user.email}}')).toEqual([
            '{{trigger.record.email}}',
            'static@example.com',
            '{{user.email}}'
        ]);
    });
    it('should filter out empty entries and handle irregular spacing', ()=>{
        expect((0, _parsecommaseparatedemailsutil.parseCommaSeparatedEmails)('  a@test.com  ,   , b@test.com,  ')).toEqual([
            'a@test.com',
            'b@test.com'
        ]);
    });
    it('should return empty array for undefined or empty input', ()=>{
        expect((0, _parsecommaseparatedemailsutil.parseCommaSeparatedEmails)(undefined)).toEqual([]);
        expect((0, _parsecommaseparatedemailsutil.parseCommaSeparatedEmails)('')).toEqual([]);
        expect((0, _parsecommaseparatedemailsutil.parseCommaSeparatedEmails)('   ')).toEqual([]);
    });
});

//# sourceMappingURL=send-email-tool.spec.js.map