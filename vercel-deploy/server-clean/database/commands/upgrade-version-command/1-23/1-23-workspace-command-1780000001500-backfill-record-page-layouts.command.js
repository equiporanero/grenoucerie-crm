"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillRecordPageLayoutsCommand", {
    enumerable: true,
    get: function() {
        return BackfillRecordPageLayoutsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _featureflagservice = require("../../../../engine/core-modules/feature-flag/services/feature-flag.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _computeflatdefaultrecordpagelayouttocreateutil = require("../../../../engine/metadata-modules/object-metadata/utils/compute-flat-default-record-page-layout-to-create.util");
const _computeflatrecordpagefieldsviewtocreateutil = require("../../../../engine/metadata-modules/object-metadata/utils/compute-flat-record-page-fields-view-to-create.util");
const _computeflatviewfieldstocreateutil = require("../../../../engine/metadata-modules/object-metadata/utils/compute-flat-view-fields-to-create.util");
const _widgetconfigurationtypetype = require("../../../../engine/metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _pagelayouttypeenum = require("../../../../engine/metadata-modules/page-layout/enums/page-layout-type.enum");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _twentystandardapplicationallflatentitymapsconstant = require("../../../../engine/workspace-manager/twenty-standard-application/utils/twenty-standard-application-all-flat-entity-maps.constant");
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
let BackfillRecordPageLayoutsCommand = class BackfillRecordPageLayoutsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        const isAlreadyEnabled = await this.featureFlagService.isFeatureEnabled('IS_RECORD_PAGE_LAYOUT_EDITING_ENABLED', workspaceId);
        if (isAlreadyEnabled) {
            this.logger.log(`IS_RECORD_PAGE_LAYOUT_EDITING_ENABLED already enabled for workspace ${workspaceId}, skipping`);
            return;
        }
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would recreate all record page layouts and enable feature flag for workspace ${workspaceId}`);
            return;
        }
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        await this.deleteAllRecordPageLayoutEntities({
            workspaceId,
            twentyStandardFlatApplication
        });
        await this.createStandardRecordPageLayouts({
            workspaceId,
            twentyStandardFlatApplication
        });
        await this.createCustomObjectPageLayouts({
            workspaceId,
            twentyStandardFlatApplication
        });
        await this.featureFlagService.enableFeatureFlags([
            'IS_RECORD_PAGE_LAYOUT_EDITING_ENABLED'
        ], workspaceId);
        await this.featureFlagService.enableFeatureFlags([
            'IS_RECORD_PAGE_LAYOUT_GLOBAL_EDITION_ENABLED'
        ], workspaceId);
        this.logger.log(`Successfully backfilled record page layouts for workspace ${workspaceId}`);
    }
    async deleteAllRecordPageLayoutEntities({ workspaceId, twentyStandardFlatApplication }) {
        const { flatPageLayoutMaps, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps, flatViewMaps, flatViewFieldMaps, flatViewFieldGroupMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatPageLayoutMaps',
            'flatPageLayoutTabMaps',
            'flatPageLayoutWidgetMaps',
            'flatViewMaps',
            'flatViewFieldMaps',
            'flatViewFieldGroupMaps'
        ]);
        const recordPageLayouts = Object.values(flatPageLayoutMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((layout)=>layout.type === _pagelayouttypeenum.PageLayoutType.RECORD_PAGE);
        const recordPageLayoutIds = new Set(recordPageLayouts.map((layout)=>layout.id));
        const tabs = Object.values(flatPageLayoutTabMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((tab)=>recordPageLayoutIds.has(tab.pageLayoutId));
        const tabIds = new Set(tabs.map((tab)=>tab.id));
        const widgets = Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((widget)=>tabIds.has(widget.pageLayoutTabId));
        const fieldsWidgetViews = Object.values(flatViewMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((view)=>view.type === _types.ViewType.FIELDS_WIDGET);
        const fieldsWidgetViewUniversalIdentifiers = new Set(fieldsWidgetViews.map((view)=>view.universalIdentifier));
        const viewFields = Object.values(flatViewFieldMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((viewField)=>fieldsWidgetViewUniversalIdentifiers.has(viewField.viewUniversalIdentifier));
        const viewFieldGroups = Object.values(flatViewFieldGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((viewFieldGroup)=>fieldsWidgetViewUniversalIdentifiers.has(viewFieldGroup.viewUniversalIdentifier));
        if (recordPageLayouts.length === 0 && fieldsWidgetViews.length === 0) {
            return;
        }
        this.logger.log(`Deleting ${recordPageLayouts.length} page layouts, ${tabs.length} tabs, ${widgets.length} widgets, ${fieldsWidgetViews.length} views, ${viewFields.length} view fields, ${viewFieldGroups.length} view field groups for workspace ${workspaceId}`);
        const result = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewField: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: viewFields,
                    flatEntityToUpdate: []
                },
                viewFieldGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: viewFieldGroups,
                    flatEntityToUpdate: []
                },
                view: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: fieldsWidgetViews,
                    flatEntityToUpdate: []
                },
                pageLayoutWidget: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: widgets,
                    flatEntityToUpdate: []
                },
                pageLayoutTab: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: tabs,
                    flatEntityToUpdate: []
                },
                pageLayout: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: recordPageLayouts,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (result.status === 'fail') {
            this.logger.error(`Failed to delete record page layout entities:\n${JSON.stringify(result, null, 2)}`);
            throw new Error(`Failed to delete record page layout entities for workspace ${workspaceId}`);
        }
    }
    async createStandardRecordPageLayouts({ workspaceId, twentyStandardFlatApplication }) {
        const { allFlatEntityMaps: standardMaps } = (0, _twentystandardapplicationallflatentitymapsconstant.computeTwentyStandardApplicationAllFlatEntityMaps)({
            now: new Date().toISOString(),
            workspaceId,
            twentyStandardApplicationId: twentyStandardFlatApplication.id
        });
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps'
        ]);
        const existingObjectMetadataUniversalIdentifiers = new Set(Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).map((objectMetadata)=>objectMetadata.universalIdentifier));
        const recordPageLayoutUniversalIdentifiers = new Set();
        const pageLayouts = Object.values(standardMaps.flatPageLayoutMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((pageLayout)=>{
            if (pageLayout.type !== _pagelayouttypeenum.PageLayoutType.RECORD_PAGE) {
                return false;
            }
            if ((0, _utils.isDefined)(pageLayout.objectMetadataUniversalIdentifier) && !existingObjectMetadataUniversalIdentifiers.has(pageLayout.objectMetadataUniversalIdentifier)) {
                this.logger.log(`Skipping standard record page layout ${pageLayout.universalIdentifier} for workspace ${workspaceId}: associated object ${pageLayout.objectMetadataUniversalIdentifier} does not exist`);
                return false;
            }
            recordPageLayoutUniversalIdentifiers.add(pageLayout.universalIdentifier);
            return true;
        });
        const tabUniversalIdentifiers = new Set();
        const tabs = Object.values(standardMaps.flatPageLayoutTabMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((tab)=>{
            if (!recordPageLayoutUniversalIdentifiers.has(tab.pageLayoutUniversalIdentifier)) {
                return false;
            }
            tabUniversalIdentifiers.add(tab.universalIdentifier);
            return true;
        });
        const widgets = Object.values(standardMaps.flatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((widget)=>{
            if (!tabUniversalIdentifiers.has(widget.pageLayoutTabUniversalIdentifier)) {
                return false;
            }
            if (widget.universalConfiguration.configurationType === _widgetconfigurationtypetype.WidgetConfigurationType.FIELD) {
                const fieldMetadataUniversalIdentifier = widget.universalConfiguration.fieldMetadataId;
                if (!(0, _utils.isDefined)(flatFieldMetadataMaps.byUniversalIdentifier[fieldMetadataUniversalIdentifier])) {
                    this.logger.log(`Skipping standard widget ${widget.universalIdentifier} for workspace ${workspaceId}: field metadata ${fieldMetadataUniversalIdentifier} not found`);
                    return false;
                }
            }
            return true;
        });
        const fieldsWidgetViewUniversalIdentifiers = new Set();
        const views = Object.values(standardMaps.flatViewMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((view)=>{
            if (view.type !== _types.ViewType.FIELDS_WIDGET) {
                return false;
            }
            if ((0, _utils.isDefined)(view.objectMetadataUniversalIdentifier) && !existingObjectMetadataUniversalIdentifiers.has(view.objectMetadataUniversalIdentifier)) {
                return false;
            }
            fieldsWidgetViewUniversalIdentifiers.add(view.universalIdentifier);
            return true;
        });
        const viewFields = Object.values(standardMaps.flatViewFieldMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((viewField)=>fieldsWidgetViewUniversalIdentifiers.has(viewField.viewUniversalIdentifier)).filter((viewField)=>(0, _utils.isDefined)(flatFieldMetadataMaps.byUniversalIdentifier[viewField.fieldMetadataUniversalIdentifier]));
        const viewFieldGroups = Object.values(standardMaps.flatViewFieldGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((viewFieldGroup)=>fieldsWidgetViewUniversalIdentifiers.has(viewFieldGroup.viewUniversalIdentifier));
        this.logger.log(`Creating ${pageLayouts.length} standard page layouts, ${views.length} views, ${viewFields.length} view fields for workspace ${workspaceId}`);
        const result = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayout: {
                    flatEntityToCreate: pageLayouts,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                pageLayoutTab: {
                    flatEntityToCreate: tabs,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                pageLayoutWidget: {
                    flatEntityToCreate: widgets,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                view: {
                    flatEntityToCreate: views,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                viewField: {
                    flatEntityToCreate: viewFields,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                viewFieldGroup: {
                    flatEntityToCreate: viewFieldGroups,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (result.status === 'fail') {
            this.logger.error(`Failed to create standard record page layouts:\n${JSON.stringify(result, null, 2)}`);
            throw new Error(`Failed to create standard record page layouts for workspace ${workspaceId}`);
        }
    }
    async createCustomObjectPageLayouts({ workspaceId, twentyStandardFlatApplication }) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatPageLayoutMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps',
            'flatPageLayoutMaps'
        ]);
        const objectIdsWithRecordPageLayout = new Set(Object.values(flatPageLayoutMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((layout)=>layout.type === _pagelayouttypeenum.PageLayoutType.RECORD_PAGE && (0, _utils.isDefined)(layout.objectMetadataId)).map((layout)=>layout.objectMetadataId));
        const customObjectsWithoutPageLayout = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((objectMetadata)=>objectMetadata.isCustom && !objectMetadata.isRemote && !objectIdsWithRecordPageLayout.has(objectMetadata.id));
        if (customObjectsWithoutPageLayout.length === 0) {
            this.logger.log(`No custom objects without page layouts found for workspace ${workspaceId}`);
            return;
        }
        this.logger.log(`Creating page layouts for ${customObjectsWithoutPageLayout.length} custom object(s) in workspace ${workspaceId}`);
        const allPageLayouts = [];
        const allTabs = [];
        const allWidgets = [];
        const allViews = [];
        const allViewFields = [];
        for (const customObject of customObjectsWithoutPageLayout){
            const fieldsView = (0, _computeflatrecordpagefieldsviewtocreateutil.computeFlatRecordPageFieldsViewToCreate)({
                objectMetadata: customObject,
                flatApplication: twentyStandardFlatApplication
            });
            const objectFieldMetadatas = Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((field)=>field.objectMetadataId === customObject.id);
            const viewFields = (0, _computeflatviewfieldstocreateutil.computeFlatViewFieldsToCreate)({
                objectFlatFieldMetadatas: objectFieldMetadatas,
                viewUniversalIdentifier: fieldsView.universalIdentifier,
                flatApplication: twentyStandardFlatApplication,
                labelIdentifierFieldMetadataUniversalIdentifier: customObject.labelIdentifierFieldMetadataUniversalIdentifier,
                excludeLabelIdentifier: true
            });
            const { pageLayouts, pageLayoutTabs, pageLayoutWidgets } = (0, _computeflatdefaultrecordpagelayouttocreateutil.computeFlatDefaultRecordPageLayoutToCreate)({
                objectMetadata: customObject,
                flatApplication: twentyStandardFlatApplication,
                recordPageFieldsView: fieldsView,
                workspaceId
            });
            allPageLayouts.push(...pageLayouts);
            allTabs.push(...pageLayoutTabs);
            allWidgets.push(...pageLayoutWidgets);
            allViews.push(fieldsView);
            allViewFields.push(...viewFields);
        }
        const result = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayout: {
                    flatEntityToCreate: allPageLayouts,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                pageLayoutTab: {
                    flatEntityToCreate: allTabs,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                pageLayoutWidget: {
                    flatEntityToCreate: allWidgets,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                view: {
                    flatEntityToCreate: allViews,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                viewField: {
                    flatEntityToCreate: allViewFields,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (result.status === 'fail') {
            this.logger.error(`Failed to create custom object page layouts:\n${JSON.stringify(result, null, 2)}`);
            throw new Error(`Failed to create custom object page layouts for workspace ${workspaceId}`);
        }
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, featureFlagService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.featureFlagService = featureFlagService, this.workspaceCacheService = workspaceCacheService;
    }
};
BackfillRecordPageLayoutsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.23.0', 1780000001500),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-23:backfill-record-page-layouts',
        description: 'Delete and recreate all record page layouts from standard config, backfill custom objects, and enable IS_RECORD_PAGE_LAYOUT_EDITING_ENABLED'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], BackfillRecordPageLayoutsCommand);

//# sourceMappingURL=1-23-workspace-command-1780000001500-backfill-record-page-layouts.command.js.map