"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _shouldsyncfolderbydefaultutil = require("../should-sync-folder-by-default.util");
describe('shouldSyncFolderByDefault', ()=>{
    describe('when messageFolderImportPolicy is SELECTED_FOLDERS', ()=>{
        it('should return false for all folders', ()=>{
            const result = (0, _shouldsyncfolderbydefaultutil.shouldSyncFolderByDefault)(_types.MessageFolderImportPolicy.SELECTED_FOLDERS);
            expect(result).toBe(false);
        });
    });
    describe('when messageFolderImportPolicy is ALL_FOLDERS', ()=>{
        it('should return true for all folders', ()=>{
            const result = (0, _shouldsyncfolderbydefaultutil.shouldSyncFolderByDefault)(_types.MessageFolderImportPolicy.ALL_FOLDERS);
            expect(result).toBe(true);
        });
    });
});

//# sourceMappingURL=should-sync-folder-by-default.util.spec.js.map