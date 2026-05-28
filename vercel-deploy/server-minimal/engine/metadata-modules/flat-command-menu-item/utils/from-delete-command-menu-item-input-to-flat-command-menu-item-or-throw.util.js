"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteCommandMenuItemInputToFlatCommandMenuItemOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteCommandMenuItemInputToFlatCommandMenuItemOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _commandmenuitemexception = require("../../command-menu-item/command-menu-item.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const fromDeleteCommandMenuItemInputToFlatCommandMenuItemOrThrow = ({ flatCommandMenuItemMaps, commandMenuItemId })=>{
    const existingFlatCommandMenuItem = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: commandMenuItemId,
        flatEntityMaps: flatCommandMenuItemMaps
    });
    if (!(0, _utils.isDefined)(existingFlatCommandMenuItem)) {
        throw new _commandmenuitemexception.CommandMenuItemException('Command menu item not found', _commandmenuitemexception.CommandMenuItemExceptionCode.COMMAND_MENU_ITEM_NOT_FOUND);
    }
    return existingFlatCommandMenuItem;
};

//# sourceMappingURL=from-delete-command-menu-item-input-to-flat-command-menu-item-or-throw.util.js.map