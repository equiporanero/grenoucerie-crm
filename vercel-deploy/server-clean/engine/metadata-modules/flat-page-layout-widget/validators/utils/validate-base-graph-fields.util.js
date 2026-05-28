"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateBaseGraphFields", {
    enumerable: true,
    get: function() {
        return validateBaseGraphFields;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateBaseGraphFields = ({ graphUniversalConfiguration, widgetTitle })=>{
    const errors = [];
    if (!(0, _utils.isDefined)(graphUniversalConfiguration.aggregateFieldMetadataUniversalIdentifier)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "/Z4Wk1",
                message: 'Aggregate field metadata is required for graph widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "wqJIjz",
                message: "Aggregate field is required for graph widget"
            }
        });
    }
    if (!(0, _utils.isDefined)(graphUniversalConfiguration.aggregateOperation)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "YCzwBK",
                message: 'Aggregate operation is required for graph widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "uhRAsd",
                message: "Aggregate operation is required for graph widget"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-base-graph-fields.util.js.map