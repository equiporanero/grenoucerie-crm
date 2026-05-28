"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _validatefileextensionutil = require("../validate-file-extension.util");
describe('validateFileExtension', ()=>{
    it.each([
        {
            title: 'BuiltLogicFunction with .mjs',
            resourcePath: 'src/handlers/index.mjs',
            fileFolder: _types.FileFolder.BuiltLogicFunction
        },
        {
            title: 'BuiltFrontComponent with .mjs',
            resourcePath: 'src/components/card.mjs',
            fileFolder: _types.FileFolder.BuiltFrontComponent
        },
        {
            title: 'Source with .ts',
            resourcePath: 'src/index.ts',
            fileFolder: _types.FileFolder.Source
        },
        {
            title: 'Source with .tsx',
            resourcePath: 'src/app.tsx',
            fileFolder: _types.FileFolder.Source
        },
        {
            title: 'Dependencies with .json',
            resourcePath: 'package.json',
            fileFolder: _types.FileFolder.Dependencies
        },
        {
            title: 'Dependencies with .lock',
            resourcePath: 'yarn.lock',
            fileFolder: _types.FileFolder.Dependencies
        }
    ])('should return isValid: true for $title', ({ resourcePath, fileFolder })=>{
        expect((0, _validatefileextensionutil.validateFileExtension)({
            resourcePath,
            fileFolder
        })).toEqual({
            isValid: true
        });
    });
    it.each([
        {
            title: 'BuiltLogicFunction with .js',
            resourcePath: 'handler.js',
            fileFolder: _types.FileFolder.BuiltLogicFunction
        },
        {
            title: 'BuiltFrontComponent with .html',
            resourcePath: 'component.html',
            fileFolder: _types.FileFolder.BuiltFrontComponent
        },
        {
            title: 'BuiltLogicFunction with .pdf',
            resourcePath: 'handler.pdf',
            fileFolder: _types.FileFolder.BuiltLogicFunction
        },
        {
            title: 'Source with .mjs',
            resourcePath: 'src/index.mjs',
            fileFolder: _types.FileFolder.Source
        },
        {
            title: 'Dependencies with .sh',
            resourcePath: 'install.sh',
            fileFolder: _types.FileFolder.Dependencies
        }
    ])('should return isValid: false for $title', ({ resourcePath, fileFolder })=>{
        const result = (0, _validatefileextensionutil.validateFileExtension)({
            resourcePath,
            fileFolder
        });
        expect(result.isValid).toBe(false);
        if (!result.isValid) {
            expect(result.error).toContain('Invalid file extension');
        }
    });
    it.each([
        {
            title: 'CorePicture',
            resourcePath: 'photo.png',
            fileFolder: _types.FileFolder.CorePicture
        },
        {
            title: 'FilesField',
            resourcePath: 'document.pdf',
            fileFolder: _types.FileFolder.FilesField
        },
        {
            title: 'PublicAsset with .svg',
            resourcePath: 'assets/logo.svg',
            fileFolder: _types.FileFolder.PublicAsset
        },
        {
            title: 'PublicAsset with .js',
            resourcePath: 'assets/script.js',
            fileFolder: _types.FileFolder.PublicAsset
        },
        {
            title: 'PublicAsset with .exe',
            resourcePath: 'downloads/installer.exe',
            fileFolder: _types.FileFolder.PublicAsset
        }
    ])('should return isValid: true for unconfigured file folder $title', ({ resourcePath, fileFolder })=>{
        expect((0, _validatefileextensionutil.validateFileExtension)({
            resourcePath,
            fileFolder
        })).toEqual({
            isValid: true
        });
    });
});

//# sourceMappingURL=validate-file-extension.util.spec.js.map