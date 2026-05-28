"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateNavigationMenuItemInputToFlatNavigationMenuItemToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateNavigationMenuItemInputToFlatNavigationMenuItemToUpdateOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _flatnavigationmenuitemeditablepropertiesconstant = require("../constants/flat-navigation-menu-item-editable-properties.constant");
const _navigationmenuitemexception = require("../../navigation-menu-item/navigation-menu-item.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateNavigationMenuItemInputToFlatNavigationMenuItemToUpdateOrThrow = ({ flatNavigationMenuItemMaps, flatPageLayoutMaps, updateNavigationMenuItemInput })=>{
    const existingFlatNavigationMenuItem = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: updateNavigationMenuItemInput.id,
        flatEntityMaps: flatNavigationMenuItemMaps
    });
    if (!(0, _utils.isDefined)(existingFlatNavigationMenuItem)) {
        throw new _navigationmenuitemexception.NavigationMenuItemException('Navigation menu item not found', _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND);
    }
    const { id: _id, ...updates } = updateNavigationMenuItemInput;
    const flatNavigationMenuItemToUpdate = {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatNavigationMenuItem,
            properties: [
                ..._flatnavigationmenuitemeditablepropertiesconstant.FLAT_NAVIGATION_MENU_ITEM_EDITABLE_PROPERTIES
            ],
            update: updates
        }),
        updatedAt: new Date().toISOString()
    };
    if (updates.folderId !== undefined) {
        const { folderUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'navigationMenuItem',
            foreignKeyValues: {
                folderId: flatNavigationMenuItemToUpdate.folderId
            },
            flatEntityMaps: {
                flatNavigationMenuItemMaps
            }
        });
        flatNavigationMenuItemToUpdate.folderUniversalIdentifier = folderUniversalIdentifier;
    }
    if (updates.pageLayoutId !== undefined) {
        const { pageLayoutUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'navigationMenuItem',
            foreignKeyValues: {
                pageLayoutId: flatNavigationMenuItemToUpdate.pageLayoutId
            },
            flatEntityMaps: {
                flatPageLayoutMaps
            }
        });
        flatNavigationMenuItemToUpdate.pageLayoutUniversalIdentifier = pageLayoutUniversalIdentifier;
    }
    return flatNavigationMenuItemToUpdate;
};

//# sourceMappingURL=from-update-navigation-menu-item-input-to-flat-navigation-menu-item-to-update-or-throw.util.js.map