"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "reconstructFlatPageLayoutWithTabsAndWidgets", {
    enumerable: true,
    get: function() {
        return reconstructFlatPageLayoutWithTabsAndWidgets;
    }
});
const _utils = require("twenty-shared/utils");
const _resolveoverridableentitypropertyutil = require("../../utils/resolve-overridable-entity-property.util");
const getResolvedPageLayoutTabId = (widget)=>(0, _resolveoverridableentitypropertyutil.resolveOverridableEntityProperty)(widget, 'pageLayoutTabId');
const reconstructFlatPageLayoutWithTabsAndWidgets = ({ layout, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps })=>{
    const tabs = Object.values(flatPageLayoutTabMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((tab)=>tab.pageLayoutId === layout.id && !(0, _utils.isDefined)(tab.deletedAt)).sort((a, b)=>(a.position ?? 0) - (b.position ?? 0));
    const tabsWithWidgets = tabs.map((tab)=>{
        const widgets = Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((widget)=>getResolvedPageLayoutTabId(widget) === tab.id && !(0, _utils.isDefined)(widget.deletedAt));
        return {
            ...tab,
            widgets,
            widgetIds: widgets.map((widget)=>widget.id)
        };
    });
    return {
        ...layout,
        tabs: tabsWithWidgets,
        tabIds: tabsWithWidgets.map((tab)=>tab.id)
    };
};

//# sourceMappingURL=reconstruct-flat-page-layout-with-tabs-and-widgets.util.js.map