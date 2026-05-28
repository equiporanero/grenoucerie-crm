"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateStandaloneRichTextBody", {
    enumerable: true,
    get: function() {
        return validateStandaloneRichTextBody;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateStandaloneRichTextBody = ({ standaloneRichTextUniversalConfiguration, widgetTitle })=>{
    const errors = [];
    if (!(0, _utils.isDefined)(standaloneRichTextUniversalConfiguration.body)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "I6oEwz",
                message: 'Body is required for standalone rich text widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "Ara8xP",
                message: "Body is required for standalone rich text widget"
            }
        });
        return errors;
    }
    if (typeof standaloneRichTextUniversalConfiguration.body !== 'object' || Array.isArray(standaloneRichTextUniversalConfiguration.body)) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "TaToDK",
                message: 'Body must be an object for widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "YCGofH",
                message: "Body must be an object"
            },
            value: standaloneRichTextUniversalConfiguration.body
        });
    }
    return errors;
};

//# sourceMappingURL=validate-standalone-rich-text-body.util.js.map