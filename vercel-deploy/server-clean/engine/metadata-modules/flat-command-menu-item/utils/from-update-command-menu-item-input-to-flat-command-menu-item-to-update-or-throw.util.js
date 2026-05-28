"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateCommandMenuItemInputToFlatCommandMenuItemToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateCommandMenuItemInputToFlatCommandMenuItemToUpdateOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _commandmenuitemexception = require("../../command-menu-item/command-menu-item.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _flatcommandmenuitemeditablepropertiesconstant = require("../constants/flat-command-menu-item-editable-properties.constant");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateCommandMenuItemInputToFlatCommandMenuItemToUpdateOrThrow = ({ flatCommandMenuItemMaps, updateCommandMenuItemInput, flatObjectMetadataMaps, flatPageLayoutMaps })=>{
    const existingFlatCommandMenuItem = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: updateCommandMenuItemInput.id,
        flatEntityMaps: flatCommandMenuItemMaps
    });
    if (!(0, _utils.isDefined)(existingFlatCommandMenuItem)) {
        throw new _commandmenuitemexception.CommandMenuItemException('Command menu item not found', _commandmenuitemexception.CommandMenuItemExceptionCode.COMMAND_MENU_ITEM_NOT_FOUND);
    }
    const { id: _id, ...updates } = updateCommandMenuItemInput;
    const flatCommandMenuItemToUpdate = {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatCommandMenuItem,
            properties: [
                ..._flatcommandmenuitemeditablepropertiesconstant.FLAT_COMMAND_MENU_ITEM_EDITABLE_PROPERTIES
            ],
            update: updates
        }),
        updatedAt: new Date().toISOString()
    };
    if (updates.availabilityObjectMetadataId !== undefined) {
        const { availabilityObjectMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'commandMenuItem',
            foreignKeyValues: {
                availabilityObjectMetadataId: flatCommandMenuItemToUpdate.availabilityObjectMetadataId
            },
            flatEntityMaps: {
                flatObjectMetadataMaps
            }
        });
        flatCommandMenuItemToUpdate.availabilityObjectMetadataUniversalIdentifier = availabilityObjectMetadataUniversalIdentifier;
    }
    if (updates.pageLayoutId !== undefined) {
        const { pageLayoutUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'commandMenuItem',
            foreignKeyValues: {
                pageLayoutId: flatCommandMenuItemToUpdate.pageLayoutId
            },
            flatEntityMaps: {
                flatPageLayoutMaps
            }
        });
        flatCommandMenuItemToUpdate.pageLayoutUniversalIdentifier = pageLayoutUniversalIdentifier;
    }
    return flatCommandMenuItemToUpdate;
};

//# sourceMappingURL=from-update-command-menu-item-input-to-flat-command-menu-item-to-update-or-throw.util.js.map