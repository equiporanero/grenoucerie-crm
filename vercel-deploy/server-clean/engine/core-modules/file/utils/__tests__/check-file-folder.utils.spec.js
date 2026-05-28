"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _checkfilefolderutils = require("../check-file-folder.utils");
describe('checkFileFolder', ()=>{
    it('should return the root folder when it is allowed', ()=>{
        expect((0, _checkfilefolderutils.checkFileFolder)(`${_types.FileFolder.Attachment}/file.txt`)).toBe(_types.FileFolder.Attachment);
    });
    it('should throw BadRequestException for disallowed folders', ()=>{
        expect(()=>(0, _checkfilefolderutils.checkFileFolder)('invalid-folder/file.txt')).toThrow(_common.BadRequestException);
    });
    it('should sanitize null characters in file path', ()=>{
        expect(()=>(0, _checkfilefolderutils.checkFileFolder)('\0invalid-folder/file.txt')).toThrow(_common.BadRequestException);
    });
    it('should handle edge cases like empty file path', ()=>{
        expect(()=>(0, _checkfilefolderutils.checkFileFolder)('')).toThrow(_common.BadRequestException);
    });
    it('should handle cases where filePath has no folder', ()=>{
        expect(()=>(0, _checkfilefolderutils.checkFileFolder)('file.txt')).toThrow(_common.BadRequestException);
    });
});

//# sourceMappingURL=check-file-folder.utils.spec.js.map