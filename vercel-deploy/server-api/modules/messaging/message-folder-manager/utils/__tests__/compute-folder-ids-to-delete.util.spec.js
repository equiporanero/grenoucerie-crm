"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _computefolderidstodeleteutil = require("../compute-folder-ids-to-delete.util");
describe('computeFolderIdsToDelete', ()=>{
    it('should mark folders deleted from provider for deletion', ()=>{
        const discoveredFolders = [
            {
                name: 'Inbox',
                externalId: 'INBOX',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: null
            }
        ];
        const existingFolders = [
            {
                id: 'inbox-id',
                name: 'Inbox',
                externalId: 'INBOX',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: null,
                syncCursor: 'cursor',
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            },
            {
                id: 'deleted-label-id',
                name: 'Old Label',
                externalId: 'deleted-label',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: null,
                syncCursor: 'cursor',
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            }
        ];
        const result = (0, _computefolderidstodeleteutil.computeFolderIdsToDelete)({
            discoveredFolders,
            existingFolders
        });
        expect(result).toEqual([
            'deleted-label-id'
        ]);
    });
    it('should return empty when all local folders still exist in provider', ()=>{
        const discoveredFolders = [
            {
                name: 'Inbox',
                externalId: 'INBOX',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: null
            }
        ];
        const existingFolders = [
            {
                id: 'inbox-id',
                name: 'Inbox',
                externalId: 'INBOX',
                isSynced: true,
                isSentFolder: false,
                parentFolderId: null,
                syncCursor: 'cursor',
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            }
        ];
        const result = (0, _computefolderidstodeleteutil.computeFolderIdsToDelete)({
            discoveredFolders,
            existingFolders
        });
        expect(result).toEqual([]);
    });
});

//# sourceMappingURL=compute-folder-ids-to-delete.util.spec.js.map