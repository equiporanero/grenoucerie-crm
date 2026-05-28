"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteNavigationMenuItemInputToFlatNavigationMenuItemOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteNavigationMenuItemInputToFlatNavigationMenuItemOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _navigationmenuitemexception = require("../../navigation-menu-item/navigation-menu-item.exception");
const fromDeleteNavigationMenuItemInputToFlatNavigationMenuItemOrThrow = ({ flatNavigationMenuItemMaps, navigationMenuItemId })=>{
    const existingFlatNavigationMenuItem = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: navigationMenuItemId,
        flatEntityMaps: flatNavigationMenuItemMaps
    });
    if (!(0, _utils.isDefined)(existingFlatNavigationMenuItem)) {
        throw new _navigationmenuitemexception.NavigationMenuItemException('Navigation menu item not found', _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND);
    }
    return existingFlatNavigationMenuItem;
};

//# sourceMappingURL=from-delete-navigation-menu-item-input-to-flat-navigation-menu-item-or-throw.util.js.map