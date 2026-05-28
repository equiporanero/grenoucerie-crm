"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildNavigationInterpolationContext", {
    enumerable: true,
    get: function() {
        return buildNavigationInterpolationContext;
    }
});
const _resolveobjectmetadatastandardoverrideutil = require("../../object-metadata/utils/resolve-object-metadata-standard-override.util");
const buildNavigationInterpolationContext = ({ objectMetadata, locale, i18nInstance })=>{
    const overrideInput = {
        labelPlural: objectMetadata.labelPlural,
        labelSingular: objectMetadata.labelSingular,
        description: objectMetadata.description ?? undefined,
        icon: objectMetadata.icon ?? undefined,
        isCustom: objectMetadata.isCustom,
        standardOverrides: objectMetadata.standardOverrides ?? undefined
    };
    const resolvedLabelPlural = (0, _resolveobjectmetadatastandardoverrideutil.resolveObjectMetadataStandardOverride)(overrideInput, 'labelPlural', locale, i18nInstance);
    const resolvedIcon = (0, _resolveobjectmetadatastandardoverrideutil.resolveObjectMetadataStandardOverride)(overrideInput, 'icon', locale, i18nInstance);
    return {
        navigateToObjectMetadataItem: {
            labelPlural: resolvedLabelPlural,
            icon: resolvedIcon
        }
    };
};

//# sourceMappingURL=build-navigation-interpolation-context.util.js.map