"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeEmptyLinks", {
    enumerable: true,
    get: function() {
        return removeEmptyLinks;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _recordtransformerexception = require("../record-transformer.exception");
const removeEmptyLinks = ({ primaryLinkUrl, secondaryLinks, primaryLinkLabel })=>{
    const filteredLinks = [
        (0, _guards.isNonEmptyString)(primaryLinkUrl) ? {
            url: primaryLinkUrl,
            label: primaryLinkLabel
        } : null,
        ...secondaryLinks ?? []
    ].filter(_utils.isDefined).map((link)=>{
        if (!(0, _guards.isNonEmptyString)(link.url)) {
            return undefined;
        }
        return {
            url: link.url,
            label: link.label
        };
    }).filter(_utils.isDefined);
    for (const link of filteredLinks){
        if (!(0, _utils.isValidUrl)(link.url)) {
            throw new _recordtransformerexception.RecordTransformerException('The URL of the link is not valid', _recordtransformerexception.RecordTransformerExceptionCode.INVALID_URL);
        }
    }
    const firstLink = filteredLinks[0];
    const otherLinks = filteredLinks.slice(1);
    return {
        primaryLinkUrl: firstLink?.url ?? null,
        primaryLinkLabel: firstLink?.label ?? null,
        secondaryLinks: otherLinks
    };
};

//# sourceMappingURL=remove-empty-links.js.map