"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateBarChartConfiguration", {
    enumerable: true,
    get: function() {
        return validateBarChartConfiguration;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateBarChartConfiguration = ({ graphUniversalConfiguration, widgetTitle })=>{
    const errors = [];
    if (!(0, _utils.isDefined)(graphUniversalConfiguration.primaryAxisGroupByFieldMetadataUniversalIdentifier)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "CV1zCG",
                message: 'Primary axis group by field is required for bar chart widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "+DJKfQ",
                message: "Primary axis group by field is required for bar chart"
            }
        });
    }
    if (!(0, _utils.isDefined)(graphUniversalConfiguration.layout)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "qBrKIA",
                message: 'Layout is required for bar chart widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "0x2TQ/",
                message: "Layout is required for bar chart"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-bar-chart-configuration.util.js.map