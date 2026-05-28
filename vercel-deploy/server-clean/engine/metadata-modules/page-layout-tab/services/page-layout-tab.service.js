"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutTabService", {
    enumerable: true,
    get: function() {
        return PageLayoutTabService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _fromcreatepagelayouttabinputtoflatpagelayouttabtocreateutil = require("../../flat-page-layout-tab/utils/from-create-page-layout-tab-input-to-flat-page-layout-tab-to-create.util");
const _fromdestroypagelayouttabinputtoflatpagelayouttaborthrowutil = require("../../flat-page-layout-tab/utils/from-destroy-page-layout-tab-input-to-flat-page-layout-tab-or-throw.util");
const _fromupdatepagelayouttabinputtoflatpagelayouttabtoupdateorthrowutil = require("../../flat-page-layout-tab/utils/from-update-page-layout-tab-input-to-flat-page-layout-tab-to-update-or-throw.util");
const _reconstructflatpagelayouttabwithwidgetsutil = require("../../flat-page-layout-tab/utils/reconstruct-flat-page-layout-tab-with-widgets.util");
const _pagelayouttabexception = require("../exceptions/page-layout-tab.exception");
const _fromflatpagelayouttabtopagelayouttabdtoutil = require("../utils/from-flat-page-layout-tab-to-page-layout-tab-dto.util");
const _fromflatpagelayouttabwithwidgetstopagelayouttabdtoutil = require("../utils/from-flat-page-layout-tab-with-widgets-to-page-layout-tab-dto.util");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
const _dashboardsyncservice = require("../../../../modules/dashboard-sync/services/dashboard-sync.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PageLayoutTabService = class PageLayoutTabService {
    async findByPageLayoutId({ workspaceId, pageLayoutId }) {
        const { flatPageLayoutTabMaps, flatPageLayoutWidgetMaps } = await this.getPageLayoutTabFlatEntityMaps(workspaceId);
        return Object.values(flatPageLayoutTabMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((tab)=>tab.pageLayoutId === pageLayoutId && !(0, _utils.isDefined)(tab.deletedAt)).sort((a, b)=>(a.position ?? 0) - (b.position ?? 0)).map((tab)=>(0, _fromflatpagelayouttabwithwidgetstopagelayouttabdtoutil.fromFlatPageLayoutTabWithWidgetsToPageLayoutTabDto)((0, _reconstructflatpagelayouttabwithwidgetsutil.reconstructFlatPageLayoutTabWithWidgets)({
                tab,
                flatPageLayoutWidgetMaps
            })));
    }
    async findByIdOrThrow({ id, workspaceId }) {
        const { flatPageLayoutTabMaps, flatPageLayoutWidgetMaps } = await this.getPageLayoutTabFlatEntityMaps(workspaceId);
        const flatTab = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatPageLayoutTabMaps
        });
        if (!(0, _utils.isDefined)(flatTab) || (0, _utils.isDefined)(flatTab.deletedAt)) {
            throw new _pagelayouttabexception.PageLayoutTabException((0, _pagelayouttabexception.generatePageLayoutTabExceptionMessage)(_pagelayouttabexception.PageLayoutTabExceptionMessageKey.PAGE_LAYOUT_TAB_NOT_FOUND, id), _pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND);
        }
        return (0, _fromflatpagelayouttabwithwidgetstopagelayouttabdtoutil.fromFlatPageLayoutTabWithWidgetsToPageLayoutTabDto)((0, _reconstructflatpagelayouttabwithwidgetsutil.reconstructFlatPageLayoutTabWithWidgets)({
            tab: flatTab,
            flatPageLayoutWidgetMaps
        }));
    }
    async getPageLayoutTabFlatEntityMaps(workspaceId) {
        return this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutTabMaps',
                'flatPageLayoutWidgetMaps'
            ]
        });
    }
    async create({ createPageLayoutTabInput, workspaceId }) {
        if (!(0, _utils.isDefined)(createPageLayoutTabInput.title)) {
            throw new _pagelayouttabexception.PageLayoutTabException((0, _pagelayouttabexception.generatePageLayoutTabExceptionMessage)(_pagelayouttabexception.PageLayoutTabExceptionMessageKey.TITLE_REQUIRED), _pagelayouttabexception.PageLayoutTabExceptionCode.INVALID_PAGE_LAYOUT_TAB_DATA);
        }
        if (!(0, _utils.isDefined)(createPageLayoutTabInput.pageLayoutId)) {
            throw new _pagelayouttabexception.PageLayoutTabException((0, _pagelayouttabexception.generatePageLayoutTabExceptionMessage)(_pagelayouttabexception.PageLayoutTabExceptionMessageKey.PAGE_LAYOUT_ID_REQUIRED), _pagelayouttabexception.PageLayoutTabExceptionCode.INVALID_PAGE_LAYOUT_TAB_DATA);
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPageLayoutMaps: existingFlatPageLayoutMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps'
            ]
        });
        const flatPageLayoutTabToCreate = (0, _fromcreatepagelayouttabinputtoflatpagelayouttabtocreateutil.fromCreatePageLayoutTabInputToFlatPageLayoutTabToCreate)({
            createPageLayoutTabInput,
            workspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatPageLayoutMaps: existingFlatPageLayoutMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayoutTab: {
                    flatEntityToCreate: [
                        flatPageLayoutTabToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating page layout tab');
        }
        const { flatPageLayoutTabMaps: recomputedFlatPageLayoutTabMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutTabMaps'
            ]
        });
        const createdTab = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatPageLayoutTabToCreate.id,
            flatEntityMaps: recomputedFlatPageLayoutTabMaps
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByTabId({
            tabId: flatPageLayoutTabToCreate.id,
            workspaceId,
            updatedAt: new Date(createdTab.updatedAt)
        });
        return (0, _fromflatpagelayouttabtopagelayouttabdtoutil.fromFlatPageLayoutTabToPageLayoutTabDto)(createdTab);
    }
    async update({ id, workspaceId, updateData }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPageLayoutTabMaps: existingFlatPageLayoutTabMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutTabMaps'
            ]
        });
        const updatePageLayoutTabInput = {
            id,
            update: updateData
        };
        const flatPageLayoutTabToUpdate = (0, _fromupdatepagelayouttabinputtoflatpagelayouttabtoupdateorthrowutil.fromUpdatePageLayoutTabInputToFlatPageLayoutTabToUpdateOrThrow)({
            updatePageLayoutTabInput,
            flatPageLayoutTabMaps: existingFlatPageLayoutTabMaps,
            callerApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayoutTab: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatPageLayoutTabToUpdate
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating page layout tab');
        }
        const { flatPageLayoutTabMaps: recomputedFlatPageLayoutTabMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutTabMaps'
            ]
        });
        const updatedTab = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedFlatPageLayoutTabMaps
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByTabId({
            tabId: id,
            workspaceId,
            updatedAt: new Date(updatedTab.updatedAt)
        });
        return (0, _fromflatpagelayouttabtopagelayouttabdtoutil.fromFlatPageLayoutTabToPageLayoutTabDto)(updatedTab);
    }
    async destroy({ id, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPageLayoutTabMaps: existingFlatPageLayoutTabMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutTabMaps'
            ]
        });
        const flatPageLayoutTabToDestroy = (0, _fromdestroypagelayouttabinputtoflatpagelayouttaborthrowutil.fromDestroyPageLayoutTabInputToFlatPageLayoutTabOrThrow)({
            destroyPageLayoutTabInput: {
                id
            },
            flatPageLayoutTabMaps: existingFlatPageLayoutTabMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayoutTab: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        flatPageLayoutTabToDestroy
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying page layout tab');
        }
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByTabId({
            tabId: id,
            workspaceId,
            updatedAt: new Date()
        });
        return true;
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService, dashboardSyncService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.dashboardSyncService = dashboardSyncService;
    }
};
PageLayoutTabService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _dashboardsyncservice.DashboardSyncService === "undefined" ? Object : _dashboardsyncservice.DashboardSyncService
    ])
], PageLayoutTabService);

//# sourceMappingURL=page-layout-tab.service.js.map