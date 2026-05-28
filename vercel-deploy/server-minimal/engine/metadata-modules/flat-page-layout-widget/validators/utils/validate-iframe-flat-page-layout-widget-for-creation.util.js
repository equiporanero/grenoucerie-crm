"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateIframeFlatPageLayoutWidgetForCreation", {
    enumerable: true,
    get: function() {
        return validateIframeFlatPageLayoutWidgetForCreation;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _validateiframeconfigurationtypeutil = require("./validate-iframe-configuration-type.util");
const _validateiframeurlutil = require("./validate-iframe-url.util");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateIframeFlatPageLayoutWidgetForCreation = (args)=>{
    const { flatEntityToValidate } = args;
    const { universalConfiguration, title: widgetTitle } = flatEntityToValidate;
    const errors = [];
    if (!(0, _utils.isDefined)(universalConfiguration)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "liZHXq",
                message: 'Configuration is required for iframe widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "heMezC",
                message: "Configuration is required for iframe widget"
            }
        });
        return errors;
    }
    const result = (0, _validateiframeconfigurationtypeutil.validateIframeConfigurationType)({
        universalConfiguration,
        widgetTitle
    });
    if (result.status === 'fail') {
        return [
            ...errors,
            ...result.errors
        ];
    }
    const { iframeUniversalConfiguration } = result;
    const urlErrors = (0, _validateiframeurlutil.validateIframeUrl)({
        iframeUniversalConfiguration,
        widgetTitle
    });
    errors.push(...urlErrors);
    return errors;
};

//# sourceMappingURL=validate-iframe-flat-page-layout-widget-for-creation.util.js.map