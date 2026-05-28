"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeGmailDefaultNotSyncedLabelsSearchFilter", {
    enumerable: true,
    get: function() {
        return computeGmailDefaultNotSyncedLabelsSearchFilter;
    }
});
const CATEGORY_PREFIX = 'CATEGORY_';
const computeGmailDefaultNotSyncedLabelsSearchFilter = (labelId)=>{
    if (labelId.startsWith(CATEGORY_PREFIX)) {
        const category = labelId.slice(CATEGORY_PREFIX.length).toLowerCase();
        return `-category:${category}`;
    }
    return `-label:${labelId.toLowerCase()}`;
};

//# sourceMappingURL=compute-gmail-default-not-synced-labels-search-filter.js.map