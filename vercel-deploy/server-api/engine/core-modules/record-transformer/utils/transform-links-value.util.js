"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformLinksValue", {
    enumerable: true,
    get: function() {
        return transformLinksValue;
    }
});
const _guards = require("@sniptt/guards");
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _utils = require("twenty-shared/utils");
const _removeemptylinks = require("./remove-empty-links");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const transformLinksValue = (value)=>{
    if (!(0, _utils.isDefined)(value)) {
        return value;
    }
    const primaryLinkUrlRaw = value.primaryLinkUrl;
    const primaryLinkLabelRaw = value.primaryLinkLabel;
    const secondaryLinksRaw = value.secondaryLinks;
    const secondaryLinksArray = (0, _guards.isNonEmptyString)(secondaryLinksRaw) ? (0, _utils.parseJson)(secondaryLinksRaw) : secondaryLinksRaw;
    const { primaryLinkLabel, primaryLinkUrl, secondaryLinks } = (0, _removeemptylinks.removeEmptyLinks)({
        primaryLinkUrl: primaryLinkUrlRaw,
        primaryLinkLabel: primaryLinkLabelRaw,
        secondaryLinks: secondaryLinksArray
    });
    const processedSecondaryLinks = secondaryLinks?.map((link)=>({
            ...link,
            url: (0, _utils.isDefined)(link.url) ? (0, _utils.normalizeUrlOrigin)(link.url) : link.url
        }));
    return {
        ...value,
        primaryLinkUrl: (0, _utils.isDefined)(primaryLinkUrl) ? (0, _utils.normalizeUrlOrigin)(primaryLinkUrl) : primaryLinkUrl,
        primaryLinkLabel,
        secondaryLinks: (0, _lodashisempty.default)(processedSecondaryLinks) ? null : JSON.stringify(processedSecondaryLinks)
    };
};

//# sourceMappingURL=transform-links-value.util.js.map