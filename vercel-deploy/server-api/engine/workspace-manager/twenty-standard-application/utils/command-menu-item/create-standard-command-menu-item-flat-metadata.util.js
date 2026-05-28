"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardCommandMenuItemFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardCommandMenuItemFlatMetadata;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _standardcommandmenuitemconstant = require("../../constants/standard-command-menu-item.constant");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardCommandMenuItemFlatMetadata = ({ commandMenuItemName, commandMenuItemId, workspaceId, twentyStandardApplicationId, dependencyFlatEntityMaps: { flatObjectMetadataMaps }, now })=>{
    const definition = _standardcommandmenuitemconstant.STANDARD_COMMAND_MENU_ITEMS[commandMenuItemName];
    let resolvedObjectMetadataId = null;
    let resolvedObjectMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(definition.availabilityObjectMetadataUniversalIdentifier)) {
        const flatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatObjectMetadataMaps,
            universalIdentifier: definition.availabilityObjectMetadataUniversalIdentifier
        });
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            throw new Error(`Object metadata not found for universal identifier ${definition.availabilityObjectMetadataUniversalIdentifier}`);
        }
        resolvedObjectMetadataId = flatObjectMetadata.id;
        resolvedObjectMetadataUniversalIdentifier = flatObjectMetadata.universalIdentifier;
    }
    return {
        id: commandMenuItemId,
        universalIdentifier: definition.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        label: definition.label,
        shortLabel: definition.shortLabel,
        icon: definition.icon,
        position: definition.position,
        isPinned: definition.isPinned,
        availabilityType: definition.availabilityType,
        conditionalAvailabilityExpression: definition.conditionalAvailabilityExpression ?? null,
        frontComponentId: null,
        frontComponentUniversalIdentifier: null,
        engineComponentKey: definition.engineComponentKey,
        payload: 'payload' in definition && (0, _utils.isDefined)(definition.payload) ? {
            ...definition.payload
        } : null,
        hotKeys: definition.hotKeys ? [
            ...definition.hotKeys
        ] : null,
        workflowVersionId: null,
        availabilityObjectMetadataId: resolvedObjectMetadataId,
        availabilityObjectMetadataUniversalIdentifier: resolvedObjectMetadataUniversalIdentifier,
        pageLayoutId: null,
        pageLayoutUniversalIdentifier: null,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=create-standard-command-menu-item-flat-metadata.util.js.map