"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateIframeUrl", {
    enumerable: true,
    get: function() {
        return validateIframeUrl;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateIframeUrl = ({ iframeUniversalConfiguration, widgetTitle })=>{
    const errors = [];
    if ((0, _utils.isDefined)(iframeUniversalConfiguration.url) && typeof iframeUniversalConfiguration.url !== 'string') {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "yV6160",
                message: 'URL must be a string for widget "{widgetTitle}"',
                values: {
                    widgetTitle: widgetTitle
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "Gjk0so",
                message: "URL must be a string"
            },
            value: iframeUniversalConfiguration.url
        });
    }
    return errors;
};

//# sourceMappingURL=validate-iframe-url.util.js.map