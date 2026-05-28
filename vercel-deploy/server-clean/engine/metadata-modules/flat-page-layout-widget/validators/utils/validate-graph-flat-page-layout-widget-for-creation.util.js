"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateGraphFlatPageLayoutWidgetForCreation", {
    enumerable: true,
    get: function() {
        return validateGraphFlatPageLayoutWidgetForCreation;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _validatebasegraphfieldsutil = require("./validate-base-graph-fields.util");
const _validategraphconfigurationbytypeutil = require("./validate-graph-configuration-by-type.util");
const _validategraphconfigurationtypeutil = require("./validate-graph-configuration-type.util");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateGraphFlatPageLayoutWidgetForCreation = (args)=>{
    const { flatEntityToValidate } = args;
    const { universalConfiguration, title: widgetTitle } = flatEntityToValidate;
    const errors = [];
    if (!(0, _utils.isDefined)(universalConfiguration)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "9fX6Jd",
                message: 'Configuration is required for graph widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "wOVBIH",
                message: "Configuration is required for graph widget"
            }
        });
        return errors;
    }
    const result = (0, _validategraphconfigurationtypeutil.validateGraphConfigurationType)({
        universalConfiguration,
        widgetTitle
    });
    if (result.status === 'fail') {
        return [
            ...errors,
            ...result.errors
        ];
    }
    const { graphUniversalConfiguration } = result;
    const baseFieldErrors = (0, _validatebasegraphfieldsutil.validateBaseGraphFields)({
        graphUniversalConfiguration,
        widgetTitle
    });
    errors.push(...baseFieldErrors);
    const typeSpecificErrors = (0, _validategraphconfigurationbytypeutil.validateGraphConfigurationByType)({
        graphUniversalConfiguration,
        widgetTitle
    });
    errors.push(...typeSpecificErrors);
    return errors;
};

//# sourceMappingURL=validate-graph-flat-page-layout-widget-for-creation.util.js.map