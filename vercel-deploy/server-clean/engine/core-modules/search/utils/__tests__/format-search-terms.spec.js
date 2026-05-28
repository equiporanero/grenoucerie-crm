"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _formatsearchterms = require("../format-search-terms");
describe('formatSearchTerms', ()=>{
    it('should format the search terms', ()=>{
        const formattedTerms = (0, _formatsearchterms.formatSearchTerms)('my search input', 'and');
        expect(formattedTerms).toBe('my:* & search:* & input:*');
    });
    it('should format the search terms with or', ()=>{
        const formattedTerms = (0, _formatsearchterms.formatSearchTerms)('my search input', 'or');
        expect(formattedTerms).toBe('my:* | search:* | input:*');
    });
});

//# sourceMappingURL=format-search-terms.spec.js.map