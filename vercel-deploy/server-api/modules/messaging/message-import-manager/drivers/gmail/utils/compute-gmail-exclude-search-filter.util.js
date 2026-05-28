"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeGmailExcludeSearchFilter", {
    enumerable: true,
    get: function() {
        return computeGmailExcludeSearchFilter;
    }
});
const _utils = require("twenty-shared/utils");
const _types = require("twenty-shared/types");
const _messaginggmaildefaultexcludedlabelsconstant = require("../constants/messaging-gmail-default-excluded-labels.constant");
const _messaginggmailexcludedsystemlabelsconstant = require("../constants/messaging-gmail-excluded-system-labels.constant");
const _messaginggmailfolderswithcategoryexclusionsconstant = require("../constants/messaging-gmail-folders-with-category-exclusions.constant");
const _buildgmaillabelsearchnameutil = require("./build-gmail-label-search-name.util");
const _computegmaildefaultnotsyncedlabelssearchfilter = require("./compute-gmail-default-not-synced-labels-search-filter");
const computeGmailExcludeSearchFilter = (messageFolders, messageFolderImportPolicy)=>{
    const allExclusions = _messaginggmaildefaultexcludedlabelsconstant.MESSAGING_GMAIL_DEFAULT_EXCLUDED_LABELS.map(_computegmaildefaultnotsyncedlabelssearchfilter.computeGmailDefaultNotSyncedLabelsSearchFilter).join(' ');
    const systemExclusions = _messaginggmailexcludedsystemlabelsconstant.MESSAGING_GMAIL_EXCLUDED_SYSTEM_LABELS.map(_computegmaildefaultnotsyncedlabelssearchfilter.computeGmailDefaultNotSyncedLabelsSearchFilter).join(' ');
    if (messageFolderImportPolicy === _types.MessageFolderImportPolicy.ALL_FOLDERS) {
        return allExclusions;
    }
    const syncedFolders = messageFolders.filter((folder)=>folder.isSynced);
    const allFoldersSynced = messageFolders.length > 0 && messageFolders.every((folder)=>folder.isSynced);
    if (allFoldersSynced) {
        return allExclusions;
    }
    const labelNamesToInclude = syncedFolders.map((folder)=>(0, _buildgmaillabelsearchnameutil.buildGmailLabelSearchName)(folder, messageFolders)).filter(_utils.isDefined);
    if (labelNamesToInclude.length === 0) {
        return '';
    }
    const inclusionQuery = labelNamesToInclude.length === 1 ? `label:${labelNamesToInclude[0]}` : `(${labelNamesToInclude.map((name)=>`label:${name}`).join(' OR ')})`;
    const hasCustomLabelSelected = syncedFolders.some((folder)=>!_messaginggmailfolderswithcategoryexclusionsconstant.MESSAGING_GMAIL_FOLDERS_WITH_CATEGORY_EXCLUSIONS.includes(folder.externalId ?? ''));
    if (hasCustomLabelSelected) {
        return `${inclusionQuery} ${systemExclusions}`;
    }
    return `${inclusionQuery} ${allExclusions}`;
};

//# sourceMappingURL=compute-gmail-exclude-search-filter.util.js.map