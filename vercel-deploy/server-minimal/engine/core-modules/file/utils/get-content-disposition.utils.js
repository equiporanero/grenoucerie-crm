"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getContentDisposition", {
    enumerable: true,
    get: function() {
        return getContentDisposition;
    }
});
const INLINE_SAFE_MIME_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/avif',
    'image/bmp',
    'image/tiff',
    'application/pdf',
    'text/plain',
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'video/mp4',
    'video/webm',
    'video/ogg',
    'image/x-icon'
]);
const getContentDisposition = (mimeType)=>{
    return INLINE_SAFE_MIME_TYPES.has(mimeType) ? 'inline' : 'attachment';
};

//# sourceMappingURL=get-content-disposition.utils.js.map