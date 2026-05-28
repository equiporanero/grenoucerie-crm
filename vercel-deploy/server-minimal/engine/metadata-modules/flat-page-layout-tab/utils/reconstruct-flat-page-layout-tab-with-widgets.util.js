"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "reconstructFlatPageLayoutTabWithWidgets", {
    enumerable: true,
    get: function() {
        return reconstructFlatPageLayoutTabWithWidgets;
    }
});
const _utils = require("twenty-shared/utils");
const reconstructFlatPageLayoutTabWithWidgets = ({ tab, flatPageLayoutWidgetMaps })=>{
    const widgets = Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier).filter((widget)=>(0, _utils.isDefined)(widget) && widget.pageLayoutTabId === tab.id && !(0, _utils.isDefined)(widget.deletedAt));
    return {
        ...tab,
        widgets,
        widgetIds: widgets.map((widget)=>widget.id)
    };
};

//# sourceMappingURL=reconstruct-flat-page-layout-tab-with-widgets.util.js.map