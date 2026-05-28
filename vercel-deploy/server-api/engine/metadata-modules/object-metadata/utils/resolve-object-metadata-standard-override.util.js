"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveObjectMetadataStandardOverride", {
    enumerable: true,
    get: function() {
        return resolveObjectMetadataStandardOverride;
    }
});
const _guards = require("@sniptt/guards");
const _translations = require("twenty-shared/translations");
const _utils = require("twenty-shared/utils");
const _generateMessageId = require("../../../core-modules/i18n/utils/generateMessageId");
const resolveObjectMetadataStandardOverride = (objectMetadata, labelKey, locale, i18nInstance)=>{
    const safeLocale = locale ?? _translations.SOURCE_LOCALE;
    if (objectMetadata.isCustom) {
        return objectMetadata[labelKey] ?? '';
    }
    if ((labelKey === 'icon' || labelKey === 'color') && (0, _utils.isDefined)(objectMetadata.standardOverrides?.[labelKey])) {
        return objectMetadata.standardOverrides[labelKey];
    }
    if ((0, _utils.isDefined)(objectMetadata.standardOverrides?.translations) && labelKey !== 'icon' && labelKey !== 'color') {
        const translationValue = objectMetadata.standardOverrides.translations[safeLocale]?.[labelKey];
        if ((0, _utils.isDefined)(translationValue)) {
            return translationValue;
        }
    }
    if ((0, _guards.isNonEmptyString)(objectMetadata.standardOverrides?.[labelKey])) {
        return objectMetadata.standardOverrides[labelKey] ?? '';
    }
    const messageId = (0, _generateMessageId.generateMessageId)(objectMetadata[labelKey] ?? '');
    const translatedMessage = i18nInstance._(messageId);
    if (translatedMessage === messageId) {
        return objectMetadata[labelKey] ?? '';
    }
    return translatedMessage;
};

//# sourceMappingURL=resolve-object-metadata-standard-override.util.js.map