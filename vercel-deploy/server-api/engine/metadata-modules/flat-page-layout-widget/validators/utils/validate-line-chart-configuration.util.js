"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateLineChartConfiguration", {
    enumerable: true,
    get: function() {
        return validateLineChartConfiguration;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateLineChartConfiguration = ({ graphUniversalConfiguration, widgetTitle })=>{
    const errors = [];
    if (!(0, _utils.isDefined)(graphUniversalConfiguration.primaryAxisGroupByFieldMetadataUniversalIdentifier)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "v874L+",
                message: 'Primary axis group by field is required for line chart widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "SdXGbu",
                message: "Primary axis group by field is required for line chart"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-line-chart-configuration.util.js.map