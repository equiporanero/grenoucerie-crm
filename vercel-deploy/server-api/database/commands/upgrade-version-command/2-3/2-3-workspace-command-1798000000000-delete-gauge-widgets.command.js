"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteGaugeWidgetsCommand", {
    enumerable: true,
    get: function() {
        return DeleteGaugeWidgetsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _widgetconfigurationtypetype = require("../../../../engine/metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeleteGaugeWidgetsCommand = class DeleteGaugeWidgetsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        const { flatPageLayoutWidgetMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatPageLayoutWidgetMaps'
        ]);
        // Some legacy widgets have configurations with no recognized configurationType
        // (e.g., not backfilled by the 1.15 widget configuration migration), which
        // makes universalConfiguration undefined after cache recomputation. Skip them
        // since they cannot be gauge widgets, but log them for visibility.
        const widgets = Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined);
        const widgetsWithMissingUniversalConfiguration = widgets.filter((widget)=>!(0, _utils.isDefined)(widget.universalConfiguration));
        if (widgetsWithMissingUniversalConfiguration.length > 0) {
            this.logger.warn(`Found ${widgetsWithMissingUniversalConfiguration.length} widget(s) with missing universalConfiguration in workspace ${workspaceId}, skipping them: ${widgetsWithMissingUniversalConfiguration.map((widget)=>widget.id).join(', ')}`);
        }
        const gaugeWidgets = widgets.filter((widget)=>widget.universalConfiguration?.configurationType === _widgetconfigurationtypetype.WidgetConfigurationType.GAUGE_CHART);
        if (gaugeWidgets.length === 0) {
            this.logger.log(`No gauge widgets in workspace ${workspaceId}`);
            return;
        }
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would delete ${gaugeWidgets.length} gauge widget(s) in workspace ${workspaceId}`);
            return;
        }
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const result = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayoutWidget: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: gaugeWidgets,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (result.status === 'fail') {
            this.logger.error(`Failed to delete gauge widgets in workspace ${workspaceId}:\n${JSON.stringify(result, null, 2)}`);
            throw new Error(`Failed to delete gauge widgets for workspace ${workspaceId}`);
        }
        this.logger.log(`Deleted ${gaugeWidgets.length} gauge widget(s) for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceCacheService, workspaceMigrationValidateBuildAndRunService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceCacheService = workspaceCacheService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
DeleteGaugeWidgetsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.3.0', 1798000000000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-3:delete-gauge-widgets',
        description: 'Delete all GAUGE_CHART page layout widgets — gauge support has been removed'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], DeleteGaugeWidgetsCommand);

//# sourceMappingURL=2-3-workspace-command-1798000000000-delete-gauge-widgets.command.js.map