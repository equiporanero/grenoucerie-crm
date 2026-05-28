"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseAndFormatGmailMessage", {
    enumerable: true,
    get: function() {
        return parseAndFormatGmailMessage;
    }
});
const _planer = /*#__PURE__*/ _interop_require_default(require("planer"));
const _types = require("twenty-shared/types");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _computemessagedirectionutil = require("./compute-message-direction.util");
const _parsegmailmessageutil = require("./parse-gmail-message.util");
const _formataddressobjectasparticipantsutil = require("../../../utils/format-address-object-as-participants.util");
const _sanitizestringutil = require("../../../utils/sanitize-string.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const parseAndFormatGmailMessage = (message, connectedAccount)=>{
    const { id, threadId, internalDate, subject, from, to, cc, bcc, headerMessageId, text, attachments, deliveredTo, labelIds } = (0, _parsegmailmessageutil.parseGmailMessage)(message);
    if (!(0, _utils.isDefined)(from) || !(0, _utils.isDefined)(headerMessageId) || !(0, _utils.isDefined)(threadId)) {
        return null;
    }
    const toParticipants = (0, _utils.isNonEmptyArray)(to) ? to : (0, _guards.isNonEmptyString)(deliveredTo) ? [
        {
            address: deliveredTo
        }
    ] : [];
    const participants = [
        ...(0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)([
            from
        ], _types.MessageParticipantRole.FROM),
        ...(0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)(toParticipants, _types.MessageParticipantRole.TO),
        ...(0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)(cc, _types.MessageParticipantRole.CC),
        ...(0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)(bcc, _types.MessageParticipantRole.BCC)
    ];
    const hasRecipientParticipant = participants.some((participant)=>participant.role !== _types.MessageParticipantRole.FROM);
    if (!hasRecipientParticipant) {
        return null;
    }
    const textWithoutReplyQuotations = text ? _planer.default.extractFrom(text, 'text/plain') : '';
    return {
        externalId: id,
        headerMessageId,
        subject: subject || '',
        messageThreadExternalId: threadId,
        receivedAt: new Date(parseInt(internalDate)),
        direction: (0, _computemessagedirectionutil.computeMessageDirection)(from.address || '', connectedAccount),
        participants,
        text: (0, _sanitizestringutil.sanitizeString)(textWithoutReplyQuotations),
        attachments,
        messageFolderExternalIds: labelIds,
        labelIds
    };
};

//# sourceMappingURL=parse-and-format-gmail-message.util.js.map