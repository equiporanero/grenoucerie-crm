"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolvePageLayoutTabTitle", {
    enumerable: true,
    get: function() {
        return resolvePageLayoutTabTitle;
    }
});
const _utils = require("twenty-shared/utils");
const _generateMessageId = require("../../../core-modules/i18n/utils/generateMessageId");
const resolvePageLayoutTabTitle = ({ title, applicationId, twentyStandardApplicationId, overrides, i18nInstance })=>{
    if (applicationId !== twentyStandardApplicationId) {
        return title;
    }
    if ((0, _utils.isDefined)(overrides?.title)) {
        return title;
    }
    const messageId = (0, _generateMessageId.generateMessageId)(title);
    const translatedMessage = i18nInstance._(messageId);
    if (translatedMessage === messageId) {
        return title;
    }
    return translatedMessage;
};

//# sourceMappingURL=resolve-page-layout-tab-title.util.js.map