"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateSimpleRecordPageWidgetForCreation", {
    enumerable: true,
    get: function() {
        return validateSimpleRecordPageWidgetForCreation;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateSimpleRecordPageWidgetForCreation = (expectedConfigurationType)=>(args)=>{
        const { flatEntityToValidate } = args;
        const { universalConfiguration, title: widgetTitle } = flatEntityToValidate;
        const errors = [];
        if (!(0, _utils.isDefined)(universalConfiguration)) {
            errors.push({
                code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "FCKoEz",
                    message: 'Configuration is required for widget "{widgetTitle}"',
                    values: {
                        widgetTitle: widgetTitle
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "XZ4djQ",
                    message: "Configuration is required for widget"
                }
            });
            return errors;
        }
        if (universalConfiguration.configurationType !== expectedConfigurationType) {
            const expectedString = expectedConfigurationType.toString();
            const actualString = universalConfiguration.configurationType?.toString() ?? 'undefined';
            errors.push({
                code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "nFIvYZ",
                    message: 'Invalid configuration type for widget "{widgetTitle}". Expected {expectedString}, got {actualString}',
                    values: {
                        widgetTitle: widgetTitle,
                        expectedString: expectedString,
                        actualString: actualString
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "IptMRL",
                    message: "Invalid configuration type for widget"
                },
                value: universalConfiguration.configurationType
            });
        }
        return errors;
    };

//# sourceMappingURL=validate-simple-record-page-widget-for-creation.util.js.map