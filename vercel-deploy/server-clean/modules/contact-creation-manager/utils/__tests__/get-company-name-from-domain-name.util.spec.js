"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getcompanynamefromdomainnameutil = require("../get-company-name-from-domain-name.util");
describe('getCompanyNameFromDomainName', ()=>{
    const testCases = [
        {
            title: 'should extract and capitalize company name from simple domain',
            context: {
                input: 'twenty.dev',
                expected: 'Twenty'
            }
        },
        {
            title: 'should extract and capitalize company name from subdomain',
            context: {
                input: 'app.twenty.dev',
                expected: 'Twenty'
            }
        },
        {
            title: 'should extract and capitalize company name from multiple subdomains',
            context: {
                input: 'test.app.twenty.dev',
                expected: 'Twenty'
            }
        },
        {
            title: 'should handle domain with multiple parts',
            context: {
                input: 'twenty.co.uk',
                expected: 'Twenty'
            }
        },
        {
            title: 'should handle empty string',
            context: {
                input: '',
                expected: ''
            }
        },
        {
            title: 'should handle invalid domain',
            context: {
                input: 'not-a-valid-domain',
                expected: ''
            }
        }
    ];
    test.each(testCases)('$title', ({ context: { input, expected } })=>{
        expect((0, _getcompanynamefromdomainnameutil.getCompanyNameFromDomainName)(input)).toBe(expected);
    });
});

//# sourceMappingURL=get-company-name-from-domain-name.util.spec.js.map