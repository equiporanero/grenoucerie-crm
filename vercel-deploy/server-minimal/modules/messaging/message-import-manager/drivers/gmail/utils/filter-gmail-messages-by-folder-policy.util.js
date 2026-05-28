"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterGmailMessagesByFolderPolicy", {
    enumerable: true,
    get: function() {
        return filterGmailMessagesByFolderPolicy;
    }
});
const _types = require("twenty-shared/types");
const _messaginggmailexcludedcategorylabelsconstant = require("../constants/messaging-gmail-excluded-category-labels.constant");
const _messaginggmailfolderswithcategoryexclusionsconstant = require("../constants/messaging-gmail-folders-with-category-exclusions.constant");
const filterGmailMessagesByFolderPolicy = (messages, messageChannel)=>{
    const { messageFolders, messageFolderImportPolicy } = messageChannel;
    if (messageFolderImportPolicy === _types.MessageFolderImportPolicy.ALL_FOLDERS) {
        return messages;
    }
    const syncedFolderExternalIds = (messageFolders ?? []).filter((folder)=>folder.isSynced && folder.externalId).map((folder)=>folder.externalId);
    return messages.filter((message)=>{
        const messageLabelIds = message.labelIds ?? [];
        const messageIsInAtLeastOneSyncedFolder = messageLabelIds.some((labelId)=>syncedFolderExternalIds.includes(labelId));
        if (!messageIsInAtLeastOneSyncedFolder) {
            return false;
        }
        const messageIsInSyncedCustomFolder = messageLabelIds.some((labelId)=>syncedFolderExternalIds.includes(labelId) && !_messaginggmailfolderswithcategoryexclusionsconstant.MESSAGING_GMAIL_FOLDERS_WITH_CATEGORY_EXCLUSIONS.includes(labelId));
        if (messageIsInSyncedCustomFolder) {
            return true;
        }
        const messageHasExcludedCategoryLabel = messageLabelIds.some((labelId)=>_messaginggmailexcludedcategorylabelsconstant.MESSAGING_GMAIL_EXCLUDED_CATEGORY_LABELS.includes(labelId));
        return !messageHasExcludedCategoryLabel;
    });
};

//# sourceMappingURL=filter-gmail-messages-by-folder-policy.util.js.map