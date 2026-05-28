"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _filestorageexception = require("../../interfaces/file-storage-exception");
const _assertstoragepathissafeutil = require("../assert-storage-path-is-safe.util");
describe('assertStoragePathIsSafe', ()=>{
    it('should accept valid relative paths', ()=>{
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('folder/file.txt')).not.toThrow();
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('workspace-123/profile-picture/avatar.png')).not.toThrow();
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('simple.txt')).not.toThrow();
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('a/b/c/d/e/deeply-nested-file.json')).not.toThrow();
    });
    it('should reject paths with .. traversal segments', ()=>{
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('../etc/passwd')).toThrow(expect.objectContaining({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        }));
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('folder/../../etc/passwd')).toThrow(expect.objectContaining({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        }));
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('..')).toThrow(expect.objectContaining({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        }));
    });
    it('should reject paths with null bytes', ()=>{
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('file\0.txt')).toThrow(expect.objectContaining({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        }));
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('folder/\0/file.txt')).toThrow(expect.objectContaining({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        }));
    });
    it('should reject absolute paths', ()=>{
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('/etc/passwd')).toThrow(expect.objectContaining({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        }));
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('/tmp/file.txt')).toThrow(expect.objectContaining({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        }));
    });
    it('should handle normalized traversal attempts', ()=>{
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('folder/../../../etc/passwd')).toThrow(expect.objectContaining({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        }));
    });
    it('should accept paths with dots that are not traversal', ()=>{
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('.hidden-file')).not.toThrow();
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('folder/.gitignore')).not.toThrow();
        expect(()=>(0, _assertstoragepathissafeutil.assertStoragePathIsSafe)('file.name.ext')).not.toThrow();
    });
});

//# sourceMappingURL=assert-storage-path-is-safe.util.spec.js.map