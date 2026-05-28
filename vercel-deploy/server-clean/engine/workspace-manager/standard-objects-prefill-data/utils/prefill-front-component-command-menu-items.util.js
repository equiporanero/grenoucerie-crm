"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "prefillFrontComponentCommandMenuItems", {
    enumerable: true,
    get: function() {
        return prefillFrontComponentCommandMenuItems;
    }
});
const _uuid = require("uuid");
const _utils = require("twenty-shared/utils");
const _commandmenuitemavailabilitytypeenum = require("../../../metadata-modules/command-menu-item/enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../../../metadata-modules/command-menu-item/enums/engine-component-key.enum");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _prefillfrontcomponentdefinitionsutil = require("./prefill-front-component-definitions.util");
const prefillFrontComponentCommandMenuItems = async ({ workspaceId, applicationService, flatEntityMapsCacheService, workspaceMigrationValidateBuildAndRunService })=>{
    const { helloWorldId } = (0, _prefillfrontcomponentdefinitionsutil.getSeedFrontComponentIds)(workspaceId);
    const { flatCommandMenuItemMaps, flatFrontComponentMaps } = await flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
        workspaceId,
        flatMapsKeys: [
            'flatCommandMenuItemMaps',
            'flatFrontComponentMaps'
        ]
    });
    const frontComponent = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: helloWorldId,
        flatEntityMaps: flatFrontComponentMaps
    });
    if (!(0, _utils.isDefined)(frontComponent)) {
        return;
    }
    const { workspaceCustomFlatApplication } = await applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
        workspaceId
    });
    const definitions = (0, _prefillfrontcomponentdefinitionsutil.getSeedFrontComponentCommandMenuItemDefinitions)(workspaceId);
    const now = new Date().toISOString();
    const flatCommandMenuItemsToCreate = definitions.filter((definition)=>!(0, _utils.isDefined)(flatCommandMenuItemMaps.byUniversalIdentifier[definition.universalIdentifier])).map((definition)=>{
        const definitionFrontComponent = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: definition.frontComponentId,
            flatEntityMaps: flatFrontComponentMaps
        });
        return {
            id: (0, _uuid.v4)(),
            universalIdentifier: definition.universalIdentifier,
            applicationId: frontComponent.applicationId,
            applicationUniversalIdentifier: frontComponent.applicationUniversalIdentifier,
            workspaceId,
            workflowVersionId: null,
            frontComponentId: definition.frontComponentId,
            frontComponentUniversalIdentifier: definitionFrontComponent?.universalIdentifier ?? null,
            engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.FRONT_COMPONENT_RENDERER,
            label: definition.label,
            icon: definition.icon,
            shortLabel: definition.label,
            position: definition.position,
            isPinned: definition.isPinned ?? false,
            availabilityType: _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL,
            conditionalAvailabilityExpression: null,
            availabilityObjectMetadataId: null,
            availabilityObjectMetadataUniversalIdentifier: null,
            payload: null,
            hotKeys: null,
            pageLayoutId: definition.pageLayoutId ?? null,
            pageLayoutUniversalIdentifier: definition.pageLayoutId ?? null,
            createdAt: now,
            updatedAt: now
        };
    });
    if (flatCommandMenuItemsToCreate.length === 0) {
        return;
    }
    const result = await workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
        allFlatEntityOperationByMetadataName: {
            commandMenuItem: {
                flatEntityToCreate: flatCommandMenuItemsToCreate,
                flatEntityToDelete: [],
                flatEntityToUpdate: []
            }
        },
        workspaceId,
        applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
    });
    if (result.status === 'fail') {
        throw new Error(`Failed to create front component command menu items for workspace ${workspaceId}: ${JSON.stringify(result, null, 2)}`);
    }
};

//# sourceMappingURL=prefill-front-component-command-menu-items.util.js.map