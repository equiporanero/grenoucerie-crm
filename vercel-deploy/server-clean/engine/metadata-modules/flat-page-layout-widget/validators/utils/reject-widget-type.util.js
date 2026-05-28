"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "rejectWidgetType", {
    enumerable: true,
    get: function() {
        return rejectWidgetType;
    }
});
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const _iscallertwentystandardapputil = require("../../../utils/is-caller-twenty-standard-app.util");
const rejectWidgetType = (widgetType, message, userFriendlyMessage)=>{
    return (args)=>{
        if ((0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(args.buildOptions)) {
            return [];
        }
        return [
            {
                code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                message,
                value: widgetType,
                userFriendlyMessage
            }
        ];
    };
};

//# sourceMappingURL=reject-widget-type.util.js.map