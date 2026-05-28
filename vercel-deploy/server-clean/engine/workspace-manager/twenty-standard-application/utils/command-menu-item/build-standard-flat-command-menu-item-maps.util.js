"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatCommandMenuItemMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatCommandMenuItemMaps;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _buildnavigationflatcommandmenuitemutil = require("../../../../metadata-modules/flat-command-menu-item/utils/build-navigation-flat-command-menu-item.util");
const _seedcompareobjectmetadatafornavigationpositionutil = require("../../../../metadata-modules/flat-command-menu-item/utils/seed-compare-object-metadata-for-navigation-position.util");
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _standardcommandmenuitemconstant = require("../../constants/standard-command-menu-item.constant");
const _createstandardcommandmenuitemflatmetadatautil = require("./create-standard-command-menu-item-flat-metadata.util");
const _addflatentitytoflatentitymapsthroughmutationorthrowutil = require("../../../workspace-migration/utils/add-flat-entity-to-flat-entity-maps-through-mutation-or-throw.util");
const STANDARD_COMMAND_MENU_ITEM_NAMES = Object.keys(_standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS);
const buildStandardFlatCommandMenuItemMaps = ({ now, workspaceId, twentyStandardApplicationId, dependencyFlatEntityMaps: { flatObjectMetadataMaps } })=>{
    const flatCommandMenuItemMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const commandMenuItemName of STANDARD_COMMAND_MENU_ITEM_NAMES){
        const flatCommandMenuItem = (0, _createstandardcommandmenuitemflatmetadatautil.createStandardCommandMenuItemFlatMetadata)({
            commandMenuItemName,
            commandMenuItemId: (0, _uuid.v4)(),
            workspaceId,
            twentyStandardApplicationId,
            dependencyFlatEntityMaps: {
                flatObjectMetadataMaps
            },
            now
        });
        (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
            flatEntity: flatCommandMenuItem,
            flatEntityMapsToMutate: flatCommandMenuItemMaps
        });
    }
    const activeObjects = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((flatObject)=>flatObject.isActive).sort(_seedcompareobjectmetadatafornavigationpositionutil.seedCompareObjectMetadataForNavigationPosition);
    const maxStandardPosition = Object.values(flatCommandMenuItemMaps.byUniversalIdentifier).reduce((max, item)=>(0, _utils.isDefined)(item) ? Math.max(max, item.position) : max, -1);
    let nextPosition = maxStandardPosition + 1;
    for (const flatObject of activeObjects){
        const position = nextPosition++;
        const navigationItem = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)({
            objectMetadata: flatObject,
            commandMenuItemId: (0, _uuid.v4)(),
            applicationId: twentyStandardApplicationId,
            workspaceId,
            position,
            now
        });
        (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
            flatEntity: navigationItem,
            flatEntityMapsToMutate: flatCommandMenuItemMaps
        });
    }
    return flatCommandMenuItemMaps;
};

//# sourceMappingURL=build-standard-flat-command-menu-item-maps.util.js.map