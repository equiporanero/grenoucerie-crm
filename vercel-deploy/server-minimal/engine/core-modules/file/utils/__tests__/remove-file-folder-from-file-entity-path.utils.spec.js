"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _removefilefolderfromfileentitypathutils = require("../remove-file-folder-from-file-entity-path.utils");
describe('removeFileFolderFromFileEntityPath', ()=>{
    it('should remove file folder prefix from path', ()=>{
        expect((0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(`${_types.FileFolder.Attachment}/file.txt`)).toBe('file.txt');
    });
    it('should handle nested paths correctly', ()=>{
        expect((0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(`${_types.FileFolder.Attachment}/subfolder/file.txt`)).toBe('subfolder/file.txt');
    });
    it('should work with different valid file folders', ()=>{
        expect((0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(`${_types.FileFolder.ProfilePicture}/avatar.png`)).toBe('avatar.png');
        expect((0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(`${_types.FileFolder.WorkspaceLogo}/logo.svg`)).toBe('logo.svg');
        expect((0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)(`${_types.FileFolder.FilesField}/doc.pdf`)).toBe('doc.pdf');
    });
    it('should throw BadRequestException for invalid file folder', ()=>{
        expect(()=>(0, _removefilefolderfromfileentitypathutils.removeFileFolderFromFileEntityPath)('invalid-folder/file.txt')).toThrow(_common.BadRequestException);
    });
});

//# sourceMappingURL=remove-file-folder-from-file-entity-path.utils.spec.js.map