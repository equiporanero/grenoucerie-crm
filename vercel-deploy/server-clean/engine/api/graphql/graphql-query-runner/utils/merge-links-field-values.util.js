"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mergeLinksFieldValues", {
    enumerable: true,
    get: function() {
        return mergeLinksFieldValues;
    }
});
const _lodashuniqby = /*#__PURE__*/ _interop_require_default(require("lodash.uniqby"));
const _hasrecordfieldvalueutil = require("./has-record-field-value.util");
const _parseadditionalitemsutil = require("./parse-additional-items.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const mergeLinksFieldValues = (recordsWithValues, priorityRecordId)=>{
    if (recordsWithValues.length === 0) {
        return {
            primaryLinkUrl: '',
            primaryLinkLabel: '',
            secondaryLinks: null
        };
    }
    let primaryLinkUrl = '';
    let primaryLinkLabel = '';
    const priorityRecord = recordsWithValues.find((record)=>record.recordId === priorityRecordId);
    if (priorityRecord && (0, _hasrecordfieldvalueutil.hasRecordFieldValue)(priorityRecord.value.primaryLinkUrl)) {
        primaryLinkUrl = priorityRecord.value.primaryLinkUrl;
        primaryLinkLabel = priorityRecord.value.primaryLinkLabel;
    } else {
        const fallbackRecord = recordsWithValues.find((record)=>(0, _hasrecordfieldvalueutil.hasRecordFieldValue)(record.value.primaryLinkUrl));
        if (fallbackRecord) {
            primaryLinkUrl = fallbackRecord.value.primaryLinkUrl;
            primaryLinkLabel = fallbackRecord.value.primaryLinkLabel;
        }
    }
    const allLinks = [];
    recordsWithValues.forEach((record)=>{
        if ((0, _hasrecordfieldvalueutil.hasRecordFieldValue)(record.value.primaryLinkUrl)) {
            allLinks.push({
                url: record.value.primaryLinkUrl,
                label: record.value.primaryLinkLabel
            });
        }
        const secondaryLinks = (0, _parseadditionalitemsutil.parseArrayOrJsonStringToArray)(record.value.secondaryLinks);
        allLinks.push(...secondaryLinks.filter((link)=>(0, _hasrecordfieldvalueutil.hasRecordFieldValue)(link.url)));
    });
    const uniqueLinks = (0, _lodashuniqby.default)(allLinks, 'url').filter((link)=>link.url !== primaryLinkUrl);
    const result = {
        primaryLinkLabel,
        primaryLinkUrl,
        secondaryLinks: uniqueLinks.length > 0 ? uniqueLinks : null
    };
    return result;
};

//# sourceMappingURL=merge-links-field-values.util.js.map