"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolvePageLayoutWidgetTitle", {
    enumerable: true,
    get: function() {
        return resolvePageLayoutWidgetTitle;
    }
});
const _utils = require("twenty-shared/utils");
const _generateMessageId = require("../../../core-modules/i18n/utils/generateMessageId");
const resolvePageLayoutWidgetTitle = ({ title, applicationId, twentyStandardApplicationId, overrides, i18nInstance })=>{
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

//# sourceMappingURL=resolve-page-layout-widget-title.util.js.map