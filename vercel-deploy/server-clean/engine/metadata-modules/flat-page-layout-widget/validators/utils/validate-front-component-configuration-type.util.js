"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFrontComponentConfigurationType", {
    enumerable: true,
    get: function() {
        return validateFrontComponentConfigurationType;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _widgetconfigurationtypetype = require("../../../page-layout-widget/enums/widget-configuration-type.type");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateFrontComponentConfigurationType = ({ universalConfiguration, title })=>{
    const errors = [];
    if (!(0, _utils.isDefined)(universalConfiguration.configurationType)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "TsoT/4",
                message: 'Configuration type is required for widget "{title}"',
                values: {
                    title: title
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "oH0/eJ",
                message: "Configuration type is required"
            }
        });
        return errors;
    }
    if (universalConfiguration.configurationType !== _widgetconfigurationtypetype.WidgetConfigurationType.FRONT_COMPONENT) {
        const configurationTypeString = String(universalConfiguration.configurationType);
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "8G4vdK",
                message: 'Invalid configuration type for front component widget "{title}". Expected FRONT_COMPONENT, got {configurationTypeString}',
                values: {
                    title: title,
                    configurationTypeString: configurationTypeString
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "/xPxQo",
                message: "Invalid configuration type for front component widget"
            },
            value: universalConfiguration.configurationType
        });
    }
    return errors;
};

//# sourceMappingURL=validate-front-component-configuration-type.util.js.map