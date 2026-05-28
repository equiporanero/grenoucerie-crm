"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "toMailComposerOptions", {
    enumerable: true,
    get: function() {
        return toMailComposerOptions;
    }
});
const _utils = require("twenty-shared/utils");
const toMailComposerOptions = (from, sendMessageInput)=>{
    return {
        from,
        to: sendMessageInput.to,
        cc: sendMessageInput.cc,
        bcc: sendMessageInput.bcc,
        subject: sendMessageInput.subject,
        text: sendMessageInput.body,
        html: sendMessageInput.html,
        ...sendMessageInput.attachments && sendMessageInput.attachments.length > 0 ? {
            attachments: sendMessageInput.attachments.map((attachment)=>({
                    filename: attachment.filename,
                    content: attachment.content,
                    contentType: attachment.contentType
                }))
        } : {},
        ...sendMessageInput.inReplyTo ? {
            inReplyTo: sendMessageInput.inReplyTo,
            references: (0, _utils.isDefined)(sendMessageInput.references) && sendMessageInput.references.length > 0 ? sendMessageInput.references : sendMessageInput.inReplyTo
        } : {}
    };
};

//# sourceMappingURL=to-mail-composer-options.util.js.map