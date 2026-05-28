"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatPageLayoutTabMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatPageLayoutTabMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _standardpagelayoutconstant = require("../../constants/standard-page-layout.constant");
const _createstandardpagelayouttabflatmetadatautil = require("./create-standard-page-layout-tab-flat-metadata.util");
const buildStandardFlatPageLayoutTabMetadataMaps = ({ now, workspaceId, twentyStandardApplicationId, standardPageLayoutMetadataRelatedEntityIds })=>{
    const allPageLayoutTabMetadatas = [];
    for (const layoutName of Object.keys(_standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS)){
        const layout = _standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS[layoutName];
        for (const tabTitle of Object.keys(layout.tabs)){
            const tab = layout.tabs[tabTitle];
            allPageLayoutTabMetadatas.push((0, _createstandardpagelayouttabflatmetadatautil.createStandardPageLayoutTabFlatMetadata)({
                now,
                workspaceId,
                twentyStandardApplicationId,
                standardPageLayoutMetadataRelatedEntityIds,
                context: {
                    layoutName,
                    tabTitle,
                    title: tab.title,
                    position: tab.position,
                    icon: tab.icon,
                    layoutMode: tab.layoutMode
                }
            }));
        }
    }
    let flatPageLayoutTabMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const pageLayoutTabMetadata of allPageLayoutTabMetadatas){
        flatPageLayoutTabMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: pageLayoutTabMetadata,
            flatEntityMaps: flatPageLayoutTabMaps
        });
    }
    return flatPageLayoutTabMaps;
};

//# sourceMappingURL=build-standard-flat-page-layout-tab-metadata-maps.util.js.map