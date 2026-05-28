"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAttachmentData", {
    enumerable: true,
    get: function() {
        return getAttachmentData;
    }
});
const getAttachmentData = (message)=>{
    return message.payload?.parts?.filter((part)=>part.filename && part.body?.attachmentId).map((part)=>({
            filename: part.filename ?? '',
            id: part.body?.attachmentId ?? '',
            mimeType: part.mimeType ?? '',
            size: part.body?.size ?? 0
        })) ?? [];
};

//# sourceMappingURL=get-attachment-data.util.js.map