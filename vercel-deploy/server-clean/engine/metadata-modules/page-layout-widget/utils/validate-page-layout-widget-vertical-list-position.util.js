"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validatePageLayoutWidgetVerticalListPosition", {
    enumerable: true,
    get: function() {
        return validatePageLayoutWidgetVerticalListPosition;
    }
});
const _pagelayoutwidgetexception = require("../exceptions/page-layout-widget.exception");
const validatePageLayoutWidgetVerticalListPosition = (position, widgetTitle)=>{
    const errors = [];
    if (position.index < 0) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: (0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.INVALID_WIDGET_POSITION, widgetTitle, undefined, `index ${position.index} must be a non-negative integer`),
            userFriendlyMessage: /*i18n*/ {
                id: "+9R1ka",
                message: "Widget index must be a non-negative integer"
            }
        });
    }
    if (!Number.isInteger(position.index)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: (0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.INVALID_WIDGET_POSITION, widgetTitle, undefined, `index ${position.index} must be an integer`),
            userFriendlyMessage: /*i18n*/ {
                id: "znCTbL",
                message: "Widget index must be an integer"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-page-layout-widget-vertical-list-position.util.js.map