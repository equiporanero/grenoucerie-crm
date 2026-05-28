"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getdomainnamefromhandleutil = require("../get-domain-name-from-handle.util");
describe('getDomainNameFromHandle', ()=>{
    const testCases = [
        {
            title: 'should extract domain from email handle',
            context: {
                input: 'user@twenty.dev',
                expected: 'twenty.dev'
            }
        },
        {
            title: 'should extract domain from email handle with subdomain',
            context: {
                input: 'user@app.twenty.dev',
                expected: 'twenty.dev'
            }
        },
        {
            title: 'should extract domain from email handle with multiple subdomains',
            context: {
                input: 'user@test.app.twenty.dev',
                expected: 'twenty.dev'
            }
        },
        {
            title: 'should handle domain with multiple parts',
            context: {
                input: 'user@twenty.co.uk',
                expected: 'twenty.co.uk'
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
            title: 'should handle string without @ symbol',
            context: {
                input: 'not-an-email',
                expected: ''
            }
        },
        {
            title: 'should handle undefined handle part after @',
            context: {
                input: 'user@',
                expected: ''
            }
        },
        {
            title: 'should handle invalid domain',
            context: {
                input: 'user@not-a-valid-domain',
                expected: ''
            }
        }
    ];
    test.each(testCases)('$title', ({ context: { input, expected } })=>{
        expect((0, _getdomainnamefromhandleutil.getDomainNameFromHandle)(input)).toBe(expected);
    });
});

//# sourceMappingURL=get-domain-name-from-handle.util.spec.js.map