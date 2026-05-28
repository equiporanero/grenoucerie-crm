"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MESSAGING_GMAIL_DEFAULT_EXCLUDED_LABELS", {
    enumerable: true,
    get: function() {
        return MESSAGING_GMAIL_DEFAULT_EXCLUDED_LABELS;
    }
});
const _messaginggmailexcludedcategorylabelsconstant = require("./messaging-gmail-excluded-category-labels.constant");
const _messaginggmailexcludedsystemlabelsconstant = require("./messaging-gmail-excluded-system-labels.constant");
const MESSAGING_GMAIL_DEFAULT_EXCLUDED_LABELS = [
    ..._messaginggmailexcludedcategorylabelsconstant.MESSAGING_GMAIL_EXCLUDED_CATEGORY_LABELS,
    ..._messaginggmailexcludedsystemlabelsconstant.MESSAGING_GMAIL_EXCLUDED_SYSTEM_LABELS
];

//# sourceMappingURL=messaging-gmail-default-excluded-labels.constant.js.map