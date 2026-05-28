"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateIframeConfigurationType", {
    enumerable: true,
    get: function() {
        return validateIframeConfigurationType;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _widgetconfigurationtypetype = require("../../../page-layout-widget/enums/widget-configuration-type.type");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateIframeConfigurationType = ({ universalConfiguration, widgetTitle })=>{
    if (!(0, _utils.isDefined)(universalConfiguration.configurationType)) {
        return {
            errors: [
                {
                    code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "SlSmjG",
                        message: 'Configuration type is required for widget "{widgetTitle}"',
                        values: {
                            widgetTitle: widgetTitle
                        }
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "oH0/eJ",
                        message: "Configuration type is required"
                    }
                }
            ],
            status: 'fail'
        };
    }
    if (universalConfiguration.configurationType !== _widgetconfigurationtypetype.WidgetConfigurationType.IFRAME) {
        const configurationTypeString = universalConfiguration.configurationType.toString();
        return {
            errors: [
                {
                    code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "SKoxDC",
                        message: 'Invalid configuration type for iframe widget "{widgetTitle}". Expected IFRAME, got {configurationTypeString}',
                        values: {
                            widgetTitle: widgetTitle,
                            configurationTypeString: configurationTypeString
                        }
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "KZhbBk",
                        message: "Invalid configuration type for iframe widget"
                    },
                    value: universalConfiguration.configurationType
                }
            ],
            status: 'fail'
        };
    }
    return {
        status: 'success',
        iframeUniversalConfiguration: universalConfiguration
    };
};

//# sourceMappingURL=validate-iframe-configuration-type.util.js.map