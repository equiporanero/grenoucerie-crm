"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "prefillWorkflowCommandMenuItems", {
    enumerable: true,
    get: function() {
        return prefillWorkflowCommandMenuItems;
    }
});
const _uuid = require("uuid");
const _utils = require("twenty-shared/utils");
const _commandmenuitemavailabilitytypeenum = require("../../../metadata-modules/command-menu-item/enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../../../metadata-modules/command-menu-item/enums/engine-component-key.enum");
const _prefillworkflowsutil = require("./prefill-workflows.util");
const QUICK_LEAD_COMMAND_MENU_ITEM_UNIVERSAL_IDENTIFIER = '5b389a80-345f-42b5-83fa-2e6b6ad95f01';
const prefillWorkflowCommandMenuItems = async ({ workspaceId, applicationService, flatEntityMapsCacheService, workspaceMigrationValidateBuildAndRunService })=>{
    const { workspaceCustomFlatApplication } = await applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
        workspaceId
    });
    const { flatCommandMenuItemMaps } = await flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
        workspaceId,
        flatMapsKeys: [
            'flatCommandMenuItemMaps'
        ]
    });
    const alreadyExists = (0, _utils.isDefined)(flatCommandMenuItemMaps.byUniversalIdentifier[QUICK_LEAD_COMMAND_MENU_ITEM_UNIVERSAL_IDENTIFIER]);
    if (alreadyExists) {
        return;
    }
    const now = new Date().toISOString();
    const quickLeadFlatCommandMenuItem = {
        id: (0, _uuid.v4)(),
        universalIdentifier: QUICK_LEAD_COMMAND_MENU_ITEM_UNIVERSAL_IDENTIFIER,
        applicationId: workspaceCustomFlatApplication.id,
        applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
        workspaceId,
        workflowVersionId: _prefillworkflowsutil.QUICK_LEAD_WORKFLOW_VERSION_ID,
        frontComponentId: null,
        frontComponentUniversalIdentifier: null,
        engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.TRIGGER_WORKFLOW_VERSION,
        label: 'Quick Lead',
        icon: 'IconUserPlus',
        shortLabel: 'Quick Lead',
        position: 100,
        isPinned: false,
        availabilityType: _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL,
        conditionalAvailabilityExpression: null,
        availabilityObjectMetadataId: null,
        availabilityObjectMetadataUniversalIdentifier: null,
        payload: null,
        hotKeys: null,
        pageLayoutId: null,
        pageLayoutUniversalIdentifier: null,
        createdAt: now,
        updatedAt: now
    };
    const result = await workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
        allFlatEntityOperationByMetadataName: {
            commandMenuItem: {
                flatEntityToCreate: [
                    quickLeadFlatCommandMenuItem
                ],
                flatEntityToDelete: [],
                flatEntityToUpdate: []
            }
        },
        workspaceId,
        applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
    });
    if (result.status === 'fail') {
        throw new Error(`Failed to create Quick Lead command menu item for workspace ${workspaceId}: ${JSON.stringify(result, null, 2)}`);
    }
};

//# sourceMappingURL=prefill-workflow-command-menu-items.util.js.map