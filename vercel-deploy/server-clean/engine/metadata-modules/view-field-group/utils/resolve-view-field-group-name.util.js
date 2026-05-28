"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveViewFieldGroupName", {
    enumerable: true,
    get: function() {
        return resolveViewFieldGroupName;
    }
});
const _utils = require("twenty-shared/utils");
const _generateMessageId = require("../../../core-modules/i18n/utils/generateMessageId");
const resolveViewFieldGroupName = ({ name, applicationId, twentyStandardApplicationId, overrides, i18nInstance })=>{
    if (applicationId !== twentyStandardApplicationId) {
        return name;
    }
    if ((0, _utils.isDefined)(overrides?.name)) {
        return name;
    }
    const messageId = (0, _generateMessageId.generateMessageId)(name);
    const translatedMessage = i18nInstance._(messageId);
    if (translatedMessage === messageId) {
        return name;
    }
    return translatedMessage;
};

//# sourceMappingURL=resolve-view-field-group-name.util.js.map