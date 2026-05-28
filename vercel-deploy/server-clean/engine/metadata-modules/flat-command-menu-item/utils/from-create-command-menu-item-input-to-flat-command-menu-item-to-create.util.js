"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateCommandMenuItemInputToFlatCommandMenuItemToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateCommandMenuItemInputToFlatCommandMenuItemToCreate;
    }
});
const _uuid = require("uuid");
const _commandmenuitemavailabilitytypeenum = require("../../command-menu-item/enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../../command-menu-item/enums/engine-component-key.enum");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateCommandMenuItemInputToFlatCommandMenuItemToCreate = ({ createCommandMenuItemInput, workspaceId, flatApplication, flatObjectMetadataMaps, flatFrontComponentMaps, flatPageLayoutMaps })=>{
    const id = (0, _uuid.v4)();
    const now = new Date().toISOString();
    const { availabilityObjectMetadataUniversalIdentifier, frontComponentUniversalIdentifier, pageLayoutUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'commandMenuItem',
        foreignKeyValues: {
            availabilityObjectMetadataId: createCommandMenuItemInput.availabilityObjectMetadataId,
            frontComponentId: createCommandMenuItemInput.frontComponentId,
            pageLayoutId: createCommandMenuItemInput.pageLayoutId
        },
        flatEntityMaps: {
            flatObjectMetadataMaps,
            flatFrontComponentMaps,
            flatPageLayoutMaps
        }
    });
    return {
        id,
        universalIdentifier: id,
        workflowVersionId: createCommandMenuItemInput.workflowVersionId ?? null,
        frontComponentId: createCommandMenuItemInput.frontComponentId ?? null,
        frontComponentUniversalIdentifier,
        engineComponentKey: createCommandMenuItemInput.engineComponentKey,
        label: createCommandMenuItemInput.label,
        icon: createCommandMenuItemInput.icon ?? null,
        shortLabel: createCommandMenuItemInput.shortLabel ?? null,
        position: createCommandMenuItemInput.position ?? 0,
        isPinned: createCommandMenuItemInput.isPinned ?? false,
        payload: createCommandMenuItemInput.engineComponentKey === _enginecomponentkeyenum.EngineComponentKey.NAVIGATION ? createCommandMenuItemInput.payload ?? null : null,
        hotKeys: createCommandMenuItemInput.hotKeys ?? null,
        availabilityType: createCommandMenuItemInput.availabilityType ?? _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL,
        availabilityObjectMetadataId: createCommandMenuItemInput.availabilityObjectMetadataId ?? null,
        conditionalAvailabilityExpression: createCommandMenuItemInput.conditionalAvailabilityExpression ?? null,
        availabilityObjectMetadataUniversalIdentifier,
        pageLayoutId: createCommandMenuItemInput.pageLayoutId ?? null,
        pageLayoutUniversalIdentifier,
        workspaceId,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-create-command-menu-item-input-to-flat-command-menu-item-to-create.util.js.map