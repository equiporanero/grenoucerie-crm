"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _createhtmltotextconverterutil = require("../create-html-to-text-converter.util");
describe('createHtmlToTextConverter', ()=>{
    const convertHtmlToText = (0, _createhtmltotextconverterutil.createHtmlToTextConverter)();
    it('should convert basic HTML to plain text', ()=>{
        expect(convertHtmlToText('<p>Hello world</p>')).toBe('Hello world');
    });
    it('should preserve newlines from block elements', ()=>{
        const result = convertHtmlToText('<p>First</p><p>Second</p>');
        expect(result).toContain('First');
        expect(result).toContain('Second');
    });
    it('should replace non-breaking spaces with regular spaces', ()=>{
        expect(convertHtmlToText('<p>Hello\u00A0world</p>')).toBe('Hello world');
    });
    it('should return empty string for empty input', ()=>{
        expect(convertHtmlToText('')).toBe('');
    });
    it('should sanitize malicious HTML', ()=>{
        const result = convertHtmlToText('<p>Hello</p><script>alert("xss")</script>');
        expect(result).not.toContain('script');
        expect(result).not.toContain('alert');
        expect(result).toContain('Hello');
    });
});

//# sourceMappingURL=create-html-to-text-converter.util.spec.js.map