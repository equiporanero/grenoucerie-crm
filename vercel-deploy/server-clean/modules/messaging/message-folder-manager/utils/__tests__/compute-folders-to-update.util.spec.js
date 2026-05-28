"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _computefolderstoupdateutil = require("../compute-folders-to-update.util");
describe('computeFoldersToUpdate', ()=>{
    it('should detect folder rename from provider', ()=>{
        const discoveredFolders = [
            {
                name: 'Work Emails',
                externalId: 'label-123',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: null
            }
        ];
        const existingFolders = [
            {
                id: 'folder-id',
                name: 'Old Label Name',
                externalId: 'label-123',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: null,
                syncCursor: 'cursor',
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            }
        ];
        const result = (0, _computefolderstoupdateutil.computeFoldersToUpdate)({
            discoveredFolders,
            existingFolders
        });
        expect(result.get('folder-id')?.name).toBe('Work Emails');
    });
    it('should detect folder moved to different parent', ()=>{
        const discoveredFolders = [
            {
                name: 'Subfolder',
                externalId: 'sub-1',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: 'new-parent-ext'
            }
        ];
        const existingFolders = [
            {
                id: 'folder-id',
                name: 'Subfolder',
                externalId: 'sub-1',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: 'old-parent-ext',
                syncCursor: 'cursor',
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            }
        ];
        const result = (0, _computefolderstoupdateutil.computeFoldersToUpdate)({
            discoveredFolders,
            existingFolders
        });
        expect(result.get('folder-id')?.parentFolderId).toBe('new-parent-ext');
    });
    it('should not flag unchanged folders for update', ()=>{
        const folder = {
            name: 'Inbox',
            externalId: 'INBOX',
            isSynced: true,
            isSentFolder: false,
            parentFolderId: null
        };
        const discoveredFolders = [
            folder
        ];
        const existingFolders = [
            {
                ...folder,
                id: 'folder-id',
                syncCursor: 'cursor',
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            }
        ];
        const result = (0, _computefolderstoupdateutil.computeFoldersToUpdate)({
            discoveredFolders,
            existingFolders
        });
        expect(result.size).toBe(0);
    });
    it('should treat empty string parentFolderId same as null', ()=>{
        const discoveredFolders = [
            {
                name: 'Folder',
                externalId: 'ext-1',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: ''
            }
        ];
        const existingFolders = [
            {
                id: 'folder-id',
                name: 'Folder',
                externalId: 'ext-1',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: null,
                syncCursor: 'cursor',
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            }
        ];
        const result = (0, _computefolderstoupdateutil.computeFoldersToUpdate)({
            discoveredFolders,
            existingFolders
        });
        expect(result.size).toBe(0);
    });
});

//# sourceMappingURL=compute-folders-to-update.util.spec.js.map