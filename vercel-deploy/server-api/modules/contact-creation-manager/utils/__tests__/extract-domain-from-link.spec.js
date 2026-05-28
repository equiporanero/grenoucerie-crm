"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _extractdomainfromlinkutil = require("../extract-domain-from-link.util");
describe('extractDomainFromLink', ()=>{
    it('should extract domain from link', ()=>{
        const link = 'https://www.twenty.com';
        const result = (0, _extractdomainfromlinkutil.extractDomainFromLink)(link);
        expect(result).toBe('twenty.com');
    });
    it('should extract domain from link without www', ()=>{
        const link = 'https://twenty.com';
        const result = (0, _extractdomainfromlinkutil.extractDomainFromLink)(link);
        expect(result).toBe('twenty.com');
    });
    it('should extract domain from link without protocol', ()=>{
        const link = 'twenty.com';
        const result = (0, _extractdomainfromlinkutil.extractDomainFromLink)(link);
        expect(result).toBe('twenty.com');
    });
    it('should extract domain from link with path', ()=>{
        const link = 'https://twenty.com/about';
        const result = (0, _extractdomainfromlinkutil.extractDomainFromLink)(link);
        expect(result).toBe('twenty.com');
    });
});

//# sourceMappingURL=extract-domain-from-link.spec.js.map