"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getcontentdispositionutils = require("../get-content-disposition.utils");
const _setfileresponseheadersutils = require("../set-file-response-headers.utils");
const createMockResponse = ()=>({
        setHeader: jest.fn()
    });
describe('setFileResponseHeaders', ()=>{
    it('should set Content-Type from mimeType', ()=>{
        const res = createMockResponse();
        (0, _setfileresponseheadersutils.setFileResponseHeaders)(res, 'image/png');
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'image/png');
    });
    it('should fall back to application/octet-stream for empty mimeType', ()=>{
        const res = createMockResponse();
        (0, _setfileresponseheadersutils.setFileResponseHeaders)(res, '');
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/octet-stream');
    });
    it('should always set X-Content-Type-Options: nosniff', ()=>{
        const res = createMockResponse();
        (0, _setfileresponseheadersutils.setFileResponseHeaders)(res, 'text/html');
        expect(res.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
    });
    it.each([
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'text/plain',
        'video/mp4',
        'audio/mpeg'
    ])('should set Content-Disposition: inline for safe type %s', (mimeType)=>{
        const res = createMockResponse();
        (0, _setfileresponseheadersutils.setFileResponseHeaders)(res, mimeType);
        expect(res.setHeader).toHaveBeenCalledWith('Content-Disposition', 'inline');
    });
    it.each([
        'text/html',
        'image/svg+xml',
        'application/xml',
        'application/octet-stream',
        'application/javascript'
    ])('should set Content-Disposition: attachment for unsafe type %s', (mimeType)=>{
        const res = createMockResponse();
        (0, _setfileresponseheadersutils.setFileResponseHeaders)(res, mimeType);
        expect(res.setHeader).toHaveBeenCalledWith('Content-Disposition', 'attachment');
    });
});
describe('getContentDisposition', ()=>{
    it('should return inline for safe MIME types', ()=>{
        expect((0, _getcontentdispositionutils.getContentDisposition)('image/png')).toBe('inline');
        expect((0, _getcontentdispositionutils.getContentDisposition)('application/pdf')).toBe('inline');
    });
    it('should return attachment for unsafe MIME types', ()=>{
        expect((0, _getcontentdispositionutils.getContentDisposition)('text/html')).toBe('attachment');
        expect((0, _getcontentdispositionutils.getContentDisposition)('application/xml')).toBe('attachment');
        expect((0, _getcontentdispositionutils.getContentDisposition)('application/octet-stream')).toBe('attachment');
    });
});

//# sourceMappingURL=set-file-response-headers.utils.spec.js.map