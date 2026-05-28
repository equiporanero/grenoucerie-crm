"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFieldsFlatPageLayoutWidgetForCreation", {
    enumerable: true,
    get: function() {
        return validateFieldsFlatPageLayoutWidgetForCreation;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _widgetconfigurationtypetype = require("../../../page-layout-widget/enums/widget-configuration-type.type");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateFieldsFlatPageLayoutWidgetForCreation = (args)=>{
    const { flatEntityToValidate } = args;
    const { universalConfiguration, title: widgetTitle } = flatEntityToValidate;
    const errors = [];
    if (!(0, _utils.isDefined)(universalConfiguration)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "tj1Qu0",
                message: 'Configuration is required for fields widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "yU57/s",
                message: "Configuration is required for fields widget"
            }
        });
        return errors;
    }
    if (universalConfiguration.configurationType !== _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS) {
        const actualString = universalConfiguration.configurationType?.toString() ?? 'undefined';
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "luyinP",
                message: 'Invalid configuration type for fields widget "{widgetTitle}". Expected FIELDS, got {actualString}',
                values: {
                    widgetTitle: widgetTitle,
                    actualString: actualString
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "wJMQQx",
                message: "Invalid configuration type for fields widget"
            },
            value: universalConfiguration.configurationType
        });
        return errors;
    }
    const viewUniversalIdentifier = universalConfiguration.viewUniversalIdentifier;
    if ((0, _utils.isDefined)(viewUniversalIdentifier) && viewUniversalIdentifier !== null) {
        if (typeof viewUniversalIdentifier !== 'string' || !(0, _uuid.validate)(viewUniversalIdentifier)) {
            errors.push({
                code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "Bj1WZ+",
                    message: 'Invalid viewUniversalIdentifier for fields widget "{widgetTitle}". Expected a valid UUID',
                    values: {
                        widgetTitle: widgetTitle
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "UV7Pll",
                    message: "Invalid viewUniversalIdentifier for fields widget"
                },
                value: viewUniversalIdentifier
            });
        }
    }
    return errors;
};

//# sourceMappingURL=validate-fields-flat-page-layout-widget-for-creation.util.js.map