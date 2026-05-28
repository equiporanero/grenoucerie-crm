"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterEmails", {
    enumerable: true,
    get: function() {
        return filterEmails;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _filteroutblocklistedmessagesutil = require("./filter-out-blocklisted-messages.util");
const _filterouticsattachmentsutil = require("./filter-out-ics-attachments.util");
const _filteroutinternalsutil = require("./filter-out-internals.util");
const _isgroupemail = require("./is-group-email");
const _ismessagesendermatchinghandlesutil = require("./is-message-sender-matching-handles.util");
const _isworkemail = require("../../../../utils/is-work-email");
const filterEmails = (primaryHandle, handleAliases, messages, blocklist, excludeGroupEmails = true, isInternalMessagesImportEnabled = false)=>{
    const messagesWithoutIcsAttachments = (0, _filterouticsattachmentsutil.filterOutIcsAttachments)(messages);
    const messagesWithoutBlocklisted = (0, _filteroutblocklistedmessagesutil.filterOutBlocklistedMessages)([
        primaryHandle,
        ...handleAliases
    ], messagesWithoutIcsAttachments, blocklist);
    const shouldFilterOutInternals = (0, _isworkemail.isWorkEmail)(primaryHandle) && !isInternalMessagesImportEnabled;
    const messagesWithoutInternals = shouldFilterOutInternals ? (0, _filteroutinternalsutil.filterOutInternals)(primaryHandle, messagesWithoutBlocklisted) : messagesWithoutBlocklisted;
    if (!excludeGroupEmails) {
        return messagesWithoutInternals;
    }
    const userHandles = [
        primaryHandle,
        ...handleAliases
    ];
    return messagesWithoutInternals.filter((message)=>{
        const isSentByUser = (0, _ismessagesendermatchinghandlesutil.isMessageSenderMatchingHandles)(message, userHandles);
        if (isSentByUser) {
            return true;
        }
        const senderHandle = message.participants?.find((participant)=>participant.role === _types.MessageParticipantRole.FROM)?.handle;
        if (!(0, _utils.isDefined)(senderHandle)) {
            return true;
        }
        const isSenderGroupEmail = (0, _isgroupemail.isGroupEmail)(senderHandle);
        if (!isSenderGroupEmail) {
            return true;
        }
        return false;
    });
};

//# sourceMappingURL=filter-emails.util.js.map