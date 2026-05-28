"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validatePieChartConfiguration", {
    enumerable: true,
    get: function() {
        return validatePieChartConfiguration;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validatePieChartConfiguration = ({ graphUniversalConfiguration, widgetTitle })=>{
    const errors = [];
    if (!(0, _utils.isDefined)(graphUniversalConfiguration.groupByFieldMetadataUniversalIdentifier)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "G5/lsy",
                message: 'Group by field is required for pie chart widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "7Arr+N",
                message: "Group by field is required for pie chart"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-pie-chart-configuration.util.js.map