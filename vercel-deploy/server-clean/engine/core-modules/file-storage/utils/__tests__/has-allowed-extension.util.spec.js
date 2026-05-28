"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _hasallowedextensionutil = require("../has-allowed-extension.util");
describe('hasAllowedExtension', ()=>{
    const allowedExtensions = {
        '.mjs': true,
        '.ts': true,
        '.tsx': true
    };
    it('should return true for an allowed extension', ()=>{
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'index.mjs',
            allowedExtensions
        })).toBe(true);
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'handler.ts',
            allowedExtensions
        })).toBe(true);
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'component.tsx',
            allowedExtensions
        })).toBe(true);
    });
    it('should return true for nested paths with allowed extensions', ()=>{
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'src/handlers/index.mjs',
            allowedExtensions
        })).toBe(true);
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'src/deep/nested/path/file.ts',
            allowedExtensions
        })).toBe(true);
    });
    it('should return false for disallowed extensions', ()=>{
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'index.js',
            allowedExtensions
        })).toBe(false);
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'index.html',
            allowedExtensions
        })).toBe(false);
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'script.sh',
            allowedExtensions
        })).toBe(false);
    });
    it('should return false for files with no extension', ()=>{
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'Makefile',
            allowedExtensions
        })).toBe(false);
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'README',
            allowedExtensions
        })).toBe(false);
    });
    it('should be case-insensitive', ()=>{
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'index.MJS',
            allowedExtensions
        })).toBe(true);
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'handler.TS',
            allowedExtensions
        })).toBe(true);
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'component.TSX',
            allowedExtensions
        })).toBe(true);
    });
    it('should use the last extension for double extensions', ()=>{
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'archive.tar.gz',
            allowedExtensions: {
                '.gz': true
            }
        })).toBe(true);
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: 'archive.tar.gz',
            allowedExtensions: {
                '.tar': true
            }
        })).toBe(false);
    });
    it('should return false for empty file path', ()=>{
        expect((0, _hasallowedextensionutil.hasAllowedExtension)({
            filePath: '',
            allowedExtensions
        })).toBe(false);
    });
});

//# sourceMappingURL=has-allowed-extension.util.spec.js.map