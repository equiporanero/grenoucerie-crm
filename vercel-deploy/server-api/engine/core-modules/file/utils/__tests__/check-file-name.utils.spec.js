"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _checkfilenameutils = require("../check-file-name.utils");
describe('checkFilename', ()=>{
    it('should return sanitized filename', ()=>{
        const filename = `${_types.FileFolder.Attachment}\0.png`;
        const sanitizedFilename = (0, _checkfilenameutils.checkFilename)(filename);
        expect(sanitizedFilename).toBe(`${_types.FileFolder.Attachment}.png`);
    });
    it('should throw an error for invalid filename', ()=>{
        const filename = `invalid-filename`;
        expect(()=>(0, _checkfilenameutils.checkFilename)(filename)).toThrow(`Filename 'invalid-filename' is not allowed`);
    });
    it('should throw an error for invalid filename', ()=>{
        const filename = `\0`;
        expect(()=>(0, _checkfilenameutils.checkFilename)(filename)).toThrow(`Filename '\0' is not allowed`);
    });
});

//# sourceMappingURL=check-file-name.utils.spec.js.map