"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _extractfileidfromurlutil = require("../extract-file-id-from-url.util");
describe('extractFileIdFromUrl', ()=>{
    const validUuid = '550e8400-e29b-41d4-a716-446655440000';
    it('should extract valid UUID from URL with matching file folder', ()=>{
        const url = `https://example.com/file/${_types.FileFolder.FilesField}/${validUuid}`;
        expect((0, _extractfileidfromurlutil.extractFileIdFromUrl)(url, _types.FileFolder.FilesField)).toBe(validUuid);
    });
    it('should return null for invalid URL', ()=>{
        expect((0, _extractfileidfromurlutil.extractFileIdFromUrl)('not-a-valid-url', _types.FileFolder.FilesField)).toBe(null);
    });
    it('should return null for external link with different path', ()=>{
        const url = `https://example.com/external-path/${validUuid}`;
        expect((0, _extractfileidfromurlutil.extractFileIdFromUrl)(url, _types.FileFolder.FilesField)).toBe(null);
    });
    it('should return null when fileId is not a valid UUID', ()=>{
        const url = `https://example.com/file/${_types.FileFolder.FilesField}/not-a-uuid`;
        expect((0, _extractfileidfromurlutil.extractFileIdFromUrl)(url, _types.FileFolder.FilesField)).toBe(null);
    });
    it('should return null when pathname has no fileId segment', ()=>{
        const url = `https://example.com/file/${_types.FileFolder.FilesField}/`;
        expect((0, _extractfileidfromurlutil.extractFileIdFromUrl)(url, _types.FileFolder.FilesField)).toBe(null);
    });
    it('should work with different file folders', ()=>{
        const corePictureUrl = `https://example.com/file/${_types.FileFolder.CorePicture}/${validUuid}`;
        expect((0, _extractfileidfromurlutil.extractFileIdFromUrl)(corePictureUrl, _types.FileFolder.CorePicture)).toBe(validUuid);
    });
    it('should work with query params', ()=>{
        const url = `http://localhost:3000/file/${_types.FileFolder.FilesField}/${validUuid}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3b3Jrc3BhY2VJZCI6IjNmZWNhYzJkLWMbOWEtNGExOC1hZjVlLTk0NjYwMTNhODFkMSIsImZpbGVJZCI6IjVlYmJjODQ0LTAzYTUtNGEyNS05NDliLWE2NWNmMjkzMWExOSIsInN1YiI6IjNmZWNhYzJkLWMwOWEtNGExOC1hZjVlLTk0NjYwMTNhODFkMSIsInR5cGUiOiJGSUxFIiwiaWF0IjoxNzcxMjYzNjEwLCJleHAiOjE3NzEzNTAwMTB9.qBy0SvkAuaq-KwWIALasRVJwSkN9Llu15LXUnVZMy-Y`;
        expect((0, _extractfileidfromurlutil.extractFileIdFromUrl)(url, _types.FileFolder.FilesField)).toBe(validUuid);
    });
    it('should return null when file folder does not match', ()=>{
        const url = `https://example.com/file/${_types.FileFolder.CorePicture}/${validUuid}`;
        expect((0, _extractfileidfromurlutil.extractFileIdFromUrl)(url, _types.FileFolder.FilesField)).toBe(null);
    });
});

//# sourceMappingURL=extract-file-id-from-url.util.spec.js.map