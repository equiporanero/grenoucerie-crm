"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatPageLayoutTabWithWidgetsToPageLayoutTabDto", {
    enumerable: true,
    get: function() {
        return fromFlatPageLayoutTabWithWidgetsToPageLayoutTabDto;
    }
});
const _fromflatpagelayouttabtopagelayouttabdtoutil = require("./from-flat-page-layout-tab-to-page-layout-tab-dto.util");
const _fromflatpagelayoutwidgettopagelayoutwidgetdtoutil = require("../../page-layout-widget/utils/from-flat-page-layout-widget-to-page-layout-widget-dto.util");
const fromFlatPageLayoutTabWithWidgetsToPageLayoutTabDto = (flatPageLayoutTabWithWidgets)=>{
    const { widgets, ...flatPageLayoutTab } = flatPageLayoutTabWithWidgets;
    return {
        ...(0, _fromflatpagelayouttabtopagelayouttabdtoutil.fromFlatPageLayoutTabToPageLayoutTabDto)(flatPageLayoutTab),
        widgets: widgets.map(_fromflatpagelayoutwidgettopagelayoutwidgetdtoutil.fromFlatPageLayoutWidgetToPageLayoutWidgetDto)
    };
};

//# sourceMappingURL=from-flat-page-layout-tab-with-widgets-to-page-layout-tab-dto.util.js.map