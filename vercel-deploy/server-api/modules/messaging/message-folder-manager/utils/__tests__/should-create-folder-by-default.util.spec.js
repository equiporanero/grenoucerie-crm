"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _shouldcreatefolderbydefaultutil = require("../should-create-folder-by-default.util");
const _standardfolder = require("../../../message-import-manager/drivers/types/standard-folder");
describe('shouldCreateFolderByDefault', ()=>{
    it('should allow creating user folders', ()=>{
        expect((0, _shouldcreatefolderbydefaultutil.shouldCreateFolderByDefault)(_standardfolder.StandardFolder.INBOX)).toBe(true);
        expect((0, _shouldcreatefolderbydefaultutil.shouldCreateFolderByDefault)(_standardfolder.StandardFolder.SENT)).toBe(true);
    });
    it('should allow creating custom folders', ()=>{
        expect((0, _shouldcreatefolderbydefaultutil.shouldCreateFolderByDefault)(null)).toBe(true);
        expect((0, _shouldcreatefolderbydefaultutil.shouldCreateFolderByDefault)(undefined)).toBe(true);
    });
    it('should prevent creating system-excluded folders', ()=>{
        expect((0, _shouldcreatefolderbydefaultutil.shouldCreateFolderByDefault)(_standardfolder.StandardFolder.DRAFTS)).toBe(false);
        expect((0, _shouldcreatefolderbydefaultutil.shouldCreateFolderByDefault)(_standardfolder.StandardFolder.TRASH)).toBe(false);
        expect((0, _shouldcreatefolderbydefaultutil.shouldCreateFolderByDefault)(_standardfolder.StandardFolder.JUNK)).toBe(false);
    });
});

//# sourceMappingURL=should-create-folder-by-default.util.spec.js.map