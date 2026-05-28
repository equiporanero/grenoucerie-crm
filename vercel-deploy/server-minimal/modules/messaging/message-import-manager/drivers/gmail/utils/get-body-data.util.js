"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getBodyData", {
    enumerable: true,
    get: function() {
        return getBodyData;
    }
});
const MAX_PARTS_TO_PROCESS = 100;
const getBodyData = (message)=>{
    const payload = message.payload;
    if (!payload) {
        return undefined;
    }
    const result = {};
    const parts = [
        payload
    ];
    for(let i = 0; parts.length !== 0 && i < MAX_PARTS_TO_PROCESS; i++){
        const part = parts.shift();
        if (part.parts) {
            parts.push(...part.parts);
        }
        if (!part.body?.data) {
            continue;
        }
        const isAttachment = Boolean(part.body.attachmentId && part.filename);
        if (isAttachment) {
            continue;
        }
        if (part.mimeType === 'text/plain') {
            result.textPlain = part.body.data;
        } else if (part.mimeType === 'text/html') {
            result.textHtml = part.body.data;
        }
    }
    if (result.textPlain) {
        return {
            data: result.textPlain,
            isHtml: false
        };
    }
    if (result.textHtml) {
        return {
            data: result.textHtml,
            isHtml: true
        };
    }
    return undefined;
};

//# sourceMappingURL=get-body-data.util.js.map