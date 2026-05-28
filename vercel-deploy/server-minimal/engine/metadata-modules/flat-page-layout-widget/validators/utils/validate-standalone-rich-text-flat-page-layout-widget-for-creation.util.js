"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateStandaloneRichTextFlatPageLayoutWidgetForCreation", {
    enumerable: true,
    get: function() {
        return validateStandaloneRichTextFlatPageLayoutWidgetForCreation;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _validatestandalonerichtextbodyutil = require("./validate-standalone-rich-text-body.util");
const _validatestandalonerichtextconfigurationtypeutil = require("./validate-standalone-rich-text-configuration-type.util");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateStandaloneRichTextFlatPageLayoutWidgetForCreation = (args)=>{
    const { flatEntityToValidate } = args;
    const { universalConfiguration, title: widgetTitle } = flatEntityToValidate;
    const errors = [];
    if (!(0, _utils.isDefined)(universalConfiguration)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "rVKk74",
                message: 'Configuration is required for standalone rich text widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "viS7/+",
                message: "Configuration is required for standalone rich text widget"
            }
        });
        return errors;
    }
    const result = (0, _validatestandalonerichtextconfigurationtypeutil.validateStandaloneRichTextConfigurationType)({
        universalConfiguration,
        widgetTitle
    });
    if (result.status === 'fail') {
        return [
            ...errors,
            ...result.errors
        ];
    }
    const { standaloneRichTextUniversalConfiguration } = result;
    const bodyErrors = (0, _validatestandalonerichtextbodyutil.validateStandaloneRichTextBody)({
        standaloneRichTextUniversalConfiguration,
        widgetTitle
    });
    errors.push(...bodyErrors);
    return errors;
};

//# sourceMappingURL=validate-standalone-rich-text-flat-page-layout-widget-for-creation.util.js.map