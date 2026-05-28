"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nullifyemptyrichtextdefaultvalueutil = require("../nullify-empty-rich-text-default-value.util");
describe('nullifyEmptyRichTextDefaultValue', ()=>{
    it('returns null when both sub-fields are empty-string equivalents', ()=>{
        expect((0, _nullifyemptyrichtextdefaultvalueutil.nullifyEmptyRichTextDefaultValue)({
            blocknote: "''",
            markdown: ''
        })).toBeNull();
    });
    it('returns normalized object when blocknote has a value', ()=>{
        expect((0, _nullifyemptyrichtextdefaultvalueutil.nullifyEmptyRichTextDefaultValue)({
            blocknote: '[]',
            markdown: "''"
        })).toEqual({
            blocknote: '[]',
            markdown: null
        });
    });
});

//# sourceMappingURL=nullify-empty-rich-text-default-value.spec.js.map