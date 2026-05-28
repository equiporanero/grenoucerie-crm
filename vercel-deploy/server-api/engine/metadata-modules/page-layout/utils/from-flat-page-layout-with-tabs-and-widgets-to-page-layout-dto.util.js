"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatPageLayoutWithTabsAndWidgetsToPageLayoutDto", {
    enumerable: true,
    get: function() {
        return fromFlatPageLayoutWithTabsAndWidgetsToPageLayoutDto;
    }
});
const _fromflatpagelayouttabwithwidgetstopagelayouttabdtoutil = require("../../page-layout-tab/utils/from-flat-page-layout-tab-with-widgets-to-page-layout-tab-dto.util");
const _fromflatpagelayouttopagelayoutdtoutil = require("./from-flat-page-layout-to-page-layout-dto.util");
const fromFlatPageLayoutWithTabsAndWidgetsToPageLayoutDto = (flatPageLayoutWithTabsAndWidgets)=>{
    const { tabs, ...flatPageLayout } = flatPageLayoutWithTabsAndWidgets;
    return {
        ...(0, _fromflatpagelayouttopagelayoutdtoutil.fromFlatPageLayoutToPageLayoutDto)(flatPageLayout),
        tabs: tabs.map(_fromflatpagelayouttabwithwidgetstopagelayouttabdtoutil.fromFlatPageLayoutTabWithWidgetsToPageLayoutTabDto)
    };
};

//# sourceMappingURL=from-flat-page-layout-with-tabs-and-widgets-to-page-layout-dto.util.js.map