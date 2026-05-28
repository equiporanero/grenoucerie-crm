"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _filestorageexception = require("../../interfaces/file-storage-exception");
const _validatestoragepathiswithinworkspaceorthrowutil = require("../validate-storage-path-is-within-workspace-or-throw.util");
const primitives = {
    workspaceId: 'workspace-id',
    applicationUniversalIdentifier: 'app-uid',
    fileFolder: _types.FileFolder.BuiltFrontComponent
};
describe('validateStoragePathIsWithinWorkspaceOrThrow', ()=>{
    it.each([
        {
            title: 'nested path within prefix',
            onStoragePath: 'workspace-id/app-uid/built-front-component/src/component.mjs'
        },
        {
            title: 'file directly under prefix',
            onStoragePath: 'workspace-id/app-uid/built-front-component/file.mjs'
        }
    ])('should accept valid path: $title', ({ onStoragePath })=>{
        expect(()=>(0, _validatestoragepathiswithinworkspaceorthrowutil.validateStoragePathIsWithinWorkspaceOrThrow)({
                onStoragePath,
                ...primitives
            })).not.toThrow();
    });
    it.each([
        {
            title: 'different workspace and app',
            onStoragePath: 'other-workspace/other-app/built-front-component/stolen.mjs'
        },
        {
            title: 'different file folder',
            onStoragePath: 'workspace-id/app-uid/other-folder/file.mjs'
        },
        {
            title: 'prefix without trailing file',
            onStoragePath: 'workspace-id/app-uid/built-front-component'
        },
        {
            title: 'partial prefix match (malicious suffix)',
            onStoragePath: 'workspace-id/app-uid/built-front-componentMalicious/file.mjs'
        }
    ])('should reject path that escapes workspace: $title', ({ onStoragePath })=>{
        expect(()=>(0, _validatestoragepathiswithinworkspaceorthrowutil.validateStoragePathIsWithinWorkspaceOrThrow)({
                onStoragePath,
                ...primitives
            })).toThrow(expect.objectContaining({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        }));
    });
});

//# sourceMappingURL=validate-storage-path-is-within-workspace-or-throw.util.spec.js.map