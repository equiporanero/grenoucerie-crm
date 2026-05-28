"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _validatefilepathutil = require("../validate-file-path.util");
describe('validateFilePath', ()=>{
    it.each([
        {
            title: 'valid built logic function path',
            resourcePath: 'src/handlers/index.mjs',
            fileFolder: _types.FileFolder.BuiltLogicFunction
        },
        {
            title: 'valid source path',
            resourcePath: 'src/index.ts',
            fileFolder: _types.FileFolder.Source
        },
        {
            title: 'valid public asset path',
            resourcePath: 'assets/logo.svg',
            fileFolder: _types.FileFolder.PublicAsset
        },
        {
            title: 'valid dependencies path',
            resourcePath: 'package.json',
            fileFolder: _types.FileFolder.Dependencies
        },
        {
            title: 'valid unconfigured folder',
            resourcePath: 'photo.png',
            fileFolder: _types.FileFolder.CorePicture
        }
    ])('should return isValid: true for $title', ({ resourcePath, fileFolder })=>{
        expect((0, _validatefilepathutil.validateFilePath)({
            resourcePath,
            fileFolder
        })).toEqual({
            isValid: true
        });
    });
    it('should fail on path traversal (safe relative path check)', ()=>{
        const result = (0, _validatefilepathutil.validateFilePath)({
            resourcePath: '../../../etc/passwd',
            fileFolder: _types.FileFolder.BuiltLogicFunction
        });
        expect(result.isValid).toBe(false);
        if (!result.isValid) {
            expect(result.error).toContain('path traversal');
        }
    });
    it('should fail on invalid characters (filename integrity check)', ()=>{
        const result = (0, _validatefilepathutil.validateFilePath)({
            resourcePath: 'my folder/file.mjs',
            fileFolder: _types.FileFolder.BuiltLogicFunction
        });
        expect(result.isValid).toBe(false);
        if (!result.isValid) {
            expect(result.error).toContain('invalid characters');
        }
    });
    it('should fail on missing extension (filename integrity check)', ()=>{
        const result = (0, _validatefilepathutil.validateFilePath)({
            resourcePath: 'Makefile',
            fileFolder: _types.FileFolder.BuiltLogicFunction
        });
        expect(result.isValid).toBe(false);
        if (!result.isValid) {
            expect(result.error).toContain('must have an extension');
        }
    });
    it('should fail on wrong extension (resource extension check)', ()=>{
        const result = (0, _validatefilepathutil.validateFilePath)({
            resourcePath: 'handler.js',
            fileFolder: _types.FileFolder.BuiltLogicFunction
        });
        expect(result.isValid).toBe(false);
        if (!result.isValid) {
            expect(result.error).toContain('Invalid file extension');
        }
    });
    it('should short-circuit on the first failure', ()=>{
        const result = (0, _validatefilepathutil.validateFilePath)({
            resourcePath: '',
            fileFolder: _types.FileFolder.BuiltLogicFunction
        });
        expect(result.isValid).toBe(false);
        if (!result.isValid) {
            expect(result.error).toContain('must not be empty');
        }
    });
});

//# sourceMappingURL=validate-file-path.util.spec.js.map