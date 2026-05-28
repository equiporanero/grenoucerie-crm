"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatSentMessage", {
    enumerable: true,
    get: function() {
        return formatSentMessage;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _messagedirectionenum = require("../../common/enums/message-direction.enum");
const _resolveoutboundthreadexternalidutil = require("./resolve-outbound-thread-external-id.util");
const formatSentMessage = (input)=>{
    const senderHandle = input.connectedAccount.handle ?? '';
    const participants = [
        {
            role: _types.MessageParticipantRole.FROM,
            handle: senderHandle,
            displayName: senderHandle
        },
        ...input.recipients.to.map((handle)=>({
                role: _types.MessageParticipantRole.TO,
                handle,
                displayName: handle
            })),
        ...input.recipients.cc.map((handle)=>({
                role: _types.MessageParticipantRole.CC,
                handle,
                displayName: handle
            })),
        ...input.recipients.bcc.map((handle)=>({
                role: _types.MessageParticipantRole.BCC,
                handle,
                displayName: handle
            }))
    ];
    const headerMessageId = input.sendResult.headerMessageId;
    return {
        externalId: (0, _guards.isNonEmptyString)(input.sendResult.messageExternalId) ? input.sendResult.messageExternalId : headerMessageId,
        headerMessageId,
        messageThreadExternalId: (0, _resolveoutboundthreadexternalidutil.resolveOutboundThreadExternalId)({
            sendResult: input.sendResult,
            parentThreadExternalId: input.parentThreadExternalId,
            inReplyTo: input.inReplyTo
        }),
        subject: input.subject,
        text: input.body,
        receivedAt: new Date(),
        direction: _messagedirectionenum.MessageDirection.OUTGOING,
        attachments: [],
        participants
    };
};

//# sourceMappingURL=format-sent-message.util.js.map