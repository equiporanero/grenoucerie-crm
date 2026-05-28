"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateGraphConfigurationType", {
    enumerable: true,
    get: function() {
        return validateGraphConfigurationType;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _validgraphconfigurationtypesconstant = require("../constants/valid-graph-configuration-types.constant");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateGraphConfigurationType = ({ universalConfiguration, widgetTitle })=>{
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
    const isValidGraphConfigurationType = _validgraphconfigurationtypesconstant.VALID_GRAPH_CONFIGURATION_TYPES.includes(universalConfiguration.configurationType);
    if (!isValidGraphConfigurationType) {
        const expectedConfigurationTypes = _validgraphconfigurationtypesconstant.VALID_GRAPH_CONFIGURATION_TYPES.map((type)=>type.toString()).join(', ');
        const configurationTypeString = universalConfiguration.configurationType.toString();
        return {
            errors: [
                {
                    code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "g4PB8S",
                        message: 'Invalid configuration type for graph widget "{widgetTitle}". Expected one of {expectedConfigurationTypes}, got {configurationTypeString}',
                        values: {
                            widgetTitle: widgetTitle,
                            expectedConfigurationTypes: expectedConfigurationTypes,
                            configurationTypeString: configurationTypeString
                        }
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "PXgd1R",
                        message: "Invalid configuration type for graph widget"
                    },
                    value: universalConfiguration.configurationType
                }
            ],
            status: 'fail'
        };
    }
    return {
        status: 'success',
        graphUniversalConfiguration: universalConfiguration
    };
};

//# sourceMappingURL=validate-graph-configuration-type.util.js.map