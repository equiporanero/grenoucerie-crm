"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getStandardPageLayoutMetadataRelatedEntityIds", {
    enumerable: true,
    get: function() {
        return getStandardPageLayoutMetadataRelatedEntityIds;
    }
});
const _uuid = require("uuid");
const _standardpagelayoutconstant = require("../constants/standard-page-layout.constant");
const computeWidgetIds = (widgets)=>{
    const widgetIds = {};
    for (const widgetName of Object.keys(widgets)){
        widgetIds[widgetName] = {
            id: (0, _uuid.v4)()
        };
    }
    return widgetIds;
};
const computeTabIds = (tabs)=>{
    const tabIds = {};
    for (const tabTitle of Object.keys(tabs)){
        tabIds[tabTitle] = {
            id: (0, _uuid.v4)(),
            widgets: computeWidgetIds(tabs[tabTitle].widgets)
        };
    }
    return tabIds;
};
const getStandardPageLayoutMetadataRelatedEntityIds = ()=>{
    const result = {};
    for (const layoutName of Object.keys(_standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS)){
        const layout = _standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS[layoutName];
        result[layoutName] = {
            id: (0, _uuid.v4)(),
            tabs: computeTabIds(layout.tabs)
        };
    }
    return result;
};

//# sourceMappingURL=get-standard-page-layout-metadata-related-entity-ids.util.js.map