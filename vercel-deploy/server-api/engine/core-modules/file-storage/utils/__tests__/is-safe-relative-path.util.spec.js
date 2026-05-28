"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _issaferelativepathutil = require("../is-safe-relative-path.util");
describe('isSafeRelativePath', ()=>{
    it('should accept valid relative paths', ()=>{
        expect((0, _issaferelativepathutil.isSafeRelativePath)('src/components/my-component.mjs')).toBe(true);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('file.mjs')).toBe(true);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('a/b/c/d.txt')).toBe(true);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('.hidden-file')).toBe(true);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('folder/.gitignore')).toBe(true);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('file.name.ext')).toBe(true);
    });
    it('should reject paths with .. traversal segments', ()=>{
        expect((0, _issaferelativepathutil.isSafeRelativePath)('../etc/passwd')).toBe(false);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('folder/../../etc/passwd')).toBe(false);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('..')).toBe(false);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('../../../other-ws/other-app/BuiltFrontComponent/file.js')).toBe(false);
    });
    it('should reject paths with null bytes', ()=>{
        expect((0, _issaferelativepathutil.isSafeRelativePath)('file\0.txt')).toBe(false);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('folder/\0/file.txt')).toBe(false);
    });
    it('should reject absolute paths', ()=>{
        expect((0, _issaferelativepathutil.isSafeRelativePath)('/etc/passwd')).toBe(false);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('/tmp/file.txt')).toBe(false);
    });
    it('should reject paths with backslashes', ()=>{
        expect((0, _issaferelativepathutil.isSafeRelativePath)('folder\\file.txt')).toBe(false);
        expect((0, _issaferelativepathutil.isSafeRelativePath)('..\\..\\etc\\passwd')).toBe(false);
    });
    it('should reject empty strings', ()=>{
        expect((0, _issaferelativepathutil.isSafeRelativePath)('')).toBe(false);
    });
});

//# sourceMappingURL=is-safe-relative-path.util.spec.js.map