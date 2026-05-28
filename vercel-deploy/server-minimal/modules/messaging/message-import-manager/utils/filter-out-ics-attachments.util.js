"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterOutIcsAttachments", {
    enumerable: true,
    get: function() {
        return filterOutIcsAttachments;
    }
});
const filterOutIcsAttachments = (messages)=>{
    return messages.filter((message)=>{
        if (!message.attachments) {
            return true;
        }
        return message.attachments.every((attachment)=>!attachment.filename.endsWith('.ics'));
    });
};

//# sourceMappingURL=filter-out-ics-attachments.util.js.map