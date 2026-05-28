"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nullifyemptylinksdefaultvalueutil = require("../nullify-empty-links-default-value.util");
describe('nullifyEmptyLinksDefaultValue', ()=>{
    it('returns null when all sub-fields are empty-string equivalents', ()=>{
        expect((0, _nullifyemptylinksdefaultvalueutil.nullifyEmptyLinksDefaultValue)({
            primaryLinkLabel: '',
            primaryLinkUrl: "''",
            secondaryLinks: null
        })).toBeNull();
    });
    it('returns normalized object when primaryLinkUrl has a value', ()=>{
        expect((0, _nullifyemptylinksdefaultvalueutil.nullifyEmptyLinksDefaultValue)({
            primaryLinkLabel: "''",
            primaryLinkUrl: 'https://twenty.com',
            secondaryLinks: null
        })).toEqual({
            primaryLinkLabel: null,
            primaryLinkUrl: 'https://twenty.com',
            secondaryLinks: null
        });
    });
});

//# sourceMappingURL=nullify-empty-links-default-value.spec.js.map