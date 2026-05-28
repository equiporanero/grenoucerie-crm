"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMimeType", {
    enumerable: true,
    get: function() {
        return getMimeType;
    }
});
const MIME_TYPES = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    csv: 'text/csv',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    pdf: 'application/pdf',
    json: 'application/json',
    txt: 'text/plain'
};
const getMimeType = (filename)=>{
    const ext = filename.split('.').pop()?.toLowerCase();
    return MIME_TYPES[ext ?? ''] ?? 'application/octet-stream';
};

//# sourceMappingURL=get-mime-type.util.js.map