"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateStandaloneRichTextConfigurationType", {
    enumerable: true,
    get: function() {
        return validateStandaloneRichTextConfigurationType;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _widgetconfigurationtypetype = require("../../../page-layout-widget/enums/widget-configuration-type.type");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateStandaloneRichTextConfigurationType = ({ universalConfiguration, widgetTitle })=>{
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
    if (universalConfiguration.configurationType !== _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT) {
        const configurationTypeString = universalConfiguration.configurationType.toString();
        return {
            errors: [
                {
                    code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "9uz7OL",
                        message: 'Invalid configuration type for standalone rich text widget "{widgetTitle}". Expected STANDALONE_RICH_TEXT, got {configurationTypeString}',
                        values: {
                            widgetTitle: widgetTitle,
                            configurationTypeString: configurationTypeString
                        }
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "JmuFK8",
                        message: "Invalid configuration type for standalone rich text widget"
                    },
                    value: universalConfiguration.configurationType
                }
            ],
            status: 'fail'
        };
    }
    return {
        status: 'success',
        standaloneRichTextUniversalConfiguration: universalConfiguration
    };
};

//# sourceMappingURL=validate-standalone-rich-text-configuration-type.util.js.map