"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _escapeforilike = require("../escape-for-ilike");
describe('escapeForIlike', ()=>{
    it('should escape percent signs', ()=>{
        expect((0, _escapeforilike.escapeForIlike)('100%')).toBe('100\\%');
    });
    it('should escape underscores', ()=>{
        expect((0, _escapeforilike.escapeForIlike)('my_company')).toBe('my\\_company');
    });
    it('should escape backslashes', ()=>{
        expect((0, _escapeforilike.escapeForIlike)('path\\to')).toBe('path\\\\to');
    });
    it('should leave normal text unchanged', ()=>{
        expect((0, _escapeforilike.escapeForIlike)('hello world')).toBe('hello world');
    });
    it('should handle CJK text unchanged', ()=>{
        expect((0, _escapeforilike.escapeForIlike)('商业线索')).toBe('商业线索');
    });
    it('should handle multiple special characters', ()=>{
        expect((0, _escapeforilike.escapeForIlike)('50%_off\\deal')).toBe('50\\%\\_off\\\\deal');
    });
});

//# sourceMappingURL=escape-for-ilike.spec.js.map