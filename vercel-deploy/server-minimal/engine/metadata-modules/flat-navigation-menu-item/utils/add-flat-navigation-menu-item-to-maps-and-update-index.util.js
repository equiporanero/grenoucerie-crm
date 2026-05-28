"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addFlatNavigationMenuItemToMapsAndUpdateIndex", {
    enumerable: true,
    get: function() {
        return addFlatNavigationMenuItemToMapsAndUpdateIndex;
    }
});
const _addflatentitytoflatentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/utils/add-flat-entity-to-flat-entity-maps-through-mutation-or-throw.util");
const addFlatNavigationMenuItemToMapsAndUpdateIndex = ({ flatNavigationMenuItem, flatNavigationMenuItemMaps })=>{
    (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
        flatEntity: flatNavigationMenuItem,
        flatEntityMapsToMutate: flatNavigationMenuItemMaps
    });
    const userWorkspaceIdKey = flatNavigationMenuItem.userWorkspaceId ?? 'null';
    const folderIdKey = flatNavigationMenuItem.folderId ?? 'null';
    if (!flatNavigationMenuItemMaps.byUserWorkspaceIdAndFolderId[userWorkspaceIdKey]) {
        flatNavigationMenuItemMaps.byUserWorkspaceIdAndFolderId[userWorkspaceIdKey] = {};
    }
    if (!flatNavigationMenuItemMaps.byUserWorkspaceIdAndFolderId[userWorkspaceIdKey][folderIdKey]) {
        flatNavigationMenuItemMaps.byUserWorkspaceIdAndFolderId[userWorkspaceIdKey][folderIdKey] = [];
    }
    flatNavigationMenuItemMaps.byUserWorkspaceIdAndFolderId[userWorkspaceIdKey][folderIdKey].push(flatNavigationMenuItem);
};

//# sourceMappingURL=add-flat-navigation-menu-item-to-maps-and-update-index.util.js.map