"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardNavigationMenuItemFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardNavigationMenuItemFlatMetadata;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _navigationmenuitemtypeenum = require("../../../../metadata-modules/navigation-menu-item/enums/navigation-menu-item-type.enum");
const _standardnavigationmenuitemconstant = require("../../constants/standard-navigation-menu-item.constant");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardNavigationMenuItemFlatMetadata = ({ workspaceId, navigationMenuItemName, viewUniversalIdentifier, position, navigationMenuItemId, dependencyFlatEntityMaps: { flatViewMaps }, twentyStandardApplicationId, now })=>{
    const navigationMenuItemDefinition = _standardnavigationmenuitemconstant.STANDARD_NAVIGATION_MENU_ITEMS[navigationMenuItemName];
    if (!(0, _utils.isDefined)(navigationMenuItemDefinition)) {
        throw new Error(`Invalid navigation menu item configuration ${navigationMenuItemName}`);
    }
    const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        flatEntityMaps: flatViewMaps,
        universalIdentifier: viewUniversalIdentifier
    });
    if (!(0, _utils.isDefined)(flatView)) {
        throw new Error(`View not found for universal identifier ${viewUniversalIdentifier}`);
    }
    const isObjectType = navigationMenuItemDefinition.type === _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT;
    return {
        id: navigationMenuItemId,
        type: navigationMenuItemDefinition.type,
        universalIdentifier: navigationMenuItemDefinition.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        userWorkspaceId: null,
        targetRecordId: null,
        targetObjectMetadataId: isObjectType ? flatView.objectMetadataId : null,
        targetObjectMetadataUniversalIdentifier: isObjectType ? flatView.objectMetadataUniversalIdentifier : null,
        viewId: isObjectType ? null : flatView.id,
        viewUniversalIdentifier: isObjectType ? null : flatView.universalIdentifier,
        folderId: null,
        folderUniversalIdentifier: null,
        pageLayoutId: null,
        pageLayoutUniversalIdentifier: null,
        name: null,
        link: null,
        icon: null,
        color: _standardnavigationmenuitemconstant.STANDARD_NAVIGATION_MENU_ITEM_DEFAULT_COLORS[navigationMenuItemName] ?? null,
        position,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=create-standard-navigation-menu-item-flat-metadata.util.js.map