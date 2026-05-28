"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutService", {
    enumerable: true,
    get: function() {
        return PageLayoutService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreatepagelayoutinputtoflatpagelayouttocreateutil = require("../../flat-page-layout/utils/from-create-page-layout-input-to-flat-page-layout-to-create.util");
const _fromdestroypagelayoutinputtoflatpagelayoutorthrowutil = require("../../flat-page-layout/utils/from-destroy-page-layout-input-to-flat-page-layout-or-throw.util");
const _fromupdatepagelayoutinputtoflatpagelayouttoupdateorthrowutil = require("../../flat-page-layout/utils/from-update-page-layout-input-to-flat-page-layout-to-update-or-throw.util");
const _reconstructflatpagelayoutwithtabsandwidgetsutil = require("../../flat-page-layout/utils/reconstruct-flat-page-layout-with-tabs-and-widgets.util");
const _pagelayouttypeenum = require("../enums/page-layout-type.enum");
const _pagelayoutexception = require("../exceptions/page-layout.exception");
const _fromflatpagelayouttopagelayoutdtoutil = require("../utils/from-flat-page-layout-to-page-layout-dto.util");
const _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil = require("../utils/from-flat-page-layout-with-tabs-and-widgets-to-page-layout-dto.util");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
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
let PageLayoutService = class PageLayoutService {
    async findByWorkspaceId(workspaceId) {
        const { flatPageLayoutMaps, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps } = await this.getPageLayoutFlatEntityMaps(workspaceId);
        const activeLayouts = Object.values(flatPageLayoutMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((layout)=>!(0, _utils.isDefined)(layout.deletedAt));
        return activeLayouts.map((layout)=>(0, _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil.fromFlatPageLayoutWithTabsAndWidgetsToPageLayoutDto)((0, _reconstructflatpagelayoutwithtabsandwidgetsutil.reconstructFlatPageLayoutWithTabsAndWidgets)({
                layout,
                flatPageLayoutTabMaps,
                flatPageLayoutWidgetMaps
            })));
    }
    async findBy({ workspaceId, filter: { objectMetadataId, pageLayoutType } }) {
        const { flatPageLayoutMaps, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps } = await this.getPageLayoutFlatEntityMaps(workspaceId);
        const activeLayouts = Object.values(flatPageLayoutMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((layout)=>{
            const isNotDeleted = !(0, _utils.isDefined)(layout.deletedAt);
            const matchesObjectMetadataId = (0, _guards.isNonEmptyString)(objectMetadataId) ? layout.objectMetadataId === objectMetadataId : true;
            const matchesPageLayoutType = (0, _utils.isDefined)(pageLayoutType) ? layout.type === pageLayoutType : true;
            return isNotDeleted && matchesObjectMetadataId && matchesPageLayoutType;
        });
        return activeLayouts.map((layout)=>(0, _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil.fromFlatPageLayoutWithTabsAndWidgetsToPageLayoutDto)((0, _reconstructflatpagelayoutwithtabsandwidgetsutil.reconstructFlatPageLayoutWithTabsAndWidgets)({
                layout,
                flatPageLayoutTabMaps,
                flatPageLayoutWidgetMaps
            })));
    }
    async findByIdOrThrow({ id, workspaceId }) {
        const { flatPageLayoutMaps, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps } = await this.getPageLayoutFlatEntityMaps(workspaceId);
        const flatLayout = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatPageLayoutMaps
        });
        const isLayoutNotFound = !(0, _utils.isDefined)(flatLayout) || (0, _utils.isDefined)(flatLayout.deletedAt);
        if (isLayoutNotFound) {
            throw new _pagelayoutexception.PageLayoutException((0, _pagelayoutexception.generatePageLayoutExceptionMessage)(_pagelayoutexception.PageLayoutExceptionMessageKey.PAGE_LAYOUT_NOT_FOUND, id), _pagelayoutexception.PageLayoutExceptionCode.PAGE_LAYOUT_NOT_FOUND);
        }
        return (0, _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil.fromFlatPageLayoutWithTabsAndWidgetsToPageLayoutDto)((0, _reconstructflatpagelayoutwithtabsandwidgetsutil.reconstructFlatPageLayoutWithTabsAndWidgets)({
            layout: flatLayout,
            flatPageLayoutTabMaps,
            flatPageLayoutWidgetMaps
        }));
    }
    async getPageLayoutFlatEntityMaps(workspaceId) {
        return this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps',
                'flatPageLayoutTabMaps',
                'flatPageLayoutWidgetMaps'
            ]
        });
    }
    async create({ createPageLayoutInput, workspaceId }) {
        if (!(0, _guards.isNonEmptyString)(createPageLayoutInput.name)) {
            throw new _pagelayoutexception.PageLayoutException((0, _pagelayoutexception.generatePageLayoutExceptionMessage)(_pagelayoutexception.PageLayoutExceptionMessageKey.NAME_REQUIRED), _pagelayoutexception.PageLayoutExceptionCode.INVALID_PAGE_LAYOUT_DATA);
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatObjectMetadataMaps: existingFlatObjectMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        const flatPageLayoutToCreate = (0, _fromcreatepagelayoutinputtoflatpagelayouttocreateutil.fromCreatePageLayoutInputToFlatPageLayoutToCreate)({
            createPageLayoutInput,
            workspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayout: {
                    flatEntityToCreate: [
                        flatPageLayoutToCreate
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
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating page layout');
        }
        const { flatPageLayoutMaps: recomputedFlatPageLayoutMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps'
            ]
        });
        return (0, _fromflatpagelayouttopagelayoutdtoutil.fromFlatPageLayoutToPageLayoutDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatPageLayoutToCreate.id,
            flatEntityMaps: recomputedFlatPageLayoutMaps
        }));
    }
    async update({ id, workspaceId, updateData }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPageLayoutMaps: existingFlatPageLayoutMaps, flatObjectMetadataMaps: existingFlatObjectMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps',
                'flatObjectMetadataMaps'
            ]
        });
        const updatePageLayoutInput = {
            id,
            update: updateData
        };
        const flatPageLayoutToUpdate = (0, _fromupdatepagelayoutinputtoflatpagelayouttoupdateorthrowutil.fromUpdatePageLayoutInputToFlatPageLayoutToUpdateOrThrow)({
            updatePageLayoutInput,
            flatPageLayoutMaps: existingFlatPageLayoutMaps,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayout: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatPageLayoutToUpdate
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating page layout');
        }
        const { flatPageLayoutMaps: recomputedFlatPageLayoutMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps'
            ]
        });
        const updatedLayout = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedFlatPageLayoutMaps
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByPageLayoutId({
            pageLayoutId: id,
            workspaceId,
            updatedAt: new Date(updatedLayout.updatedAt)
        });
        return (0, _fromflatpagelayouttopagelayoutdtoutil.fromFlatPageLayoutToPageLayoutDto)(updatedLayout);
    }
    async destroy({ id, workspaceId, isLinkedDashboardAlreadyDestroyed = false }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPageLayoutMaps: existingFlatPageLayoutMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps'
            ]
        });
        const flatPageLayoutToDestroy = (0, _fromdestroypagelayoutinputtoflatpagelayoutorthrowutil.fromDestroyPageLayoutInputToFlatPageLayoutOrThrow)({
            destroyPageLayoutInput: {
                id
            },
            flatPageLayoutMaps: existingFlatPageLayoutMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayout: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        flatPageLayoutToDestroy
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying page layout');
        }
        if (flatPageLayoutToDestroy.type === _pagelayouttypeenum.PageLayoutType.DASHBOARD && !isLinkedDashboardAlreadyDestroyed) {
            await this.destroyAssociatedDashboards({
                pageLayoutId: id,
                workspaceId
            });
        }
        return true;
    }
    async destroyMany({ ids, workspaceId }) {
        if (ids.length === 0) {
            return true;
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
        const flatPageLayoutsToDestroy = ids.map((id)=>(0, _fromdestroypagelayoutinputtoflatpagelayoutorthrowutil.fromDestroyPageLayoutInputToFlatPageLayoutOrThrow)({
                destroyPageLayoutInput: {
                    id
                },
                flatPageLayoutMaps: existingFlatPageLayoutMaps
            }));
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayout: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatPageLayoutsToDestroy,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying page layouts');
        }
        return true;
    }
    async destroyAssociatedDashboards({ pageLayoutId, workspaceId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const dashboardRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'dashboard', {
                shouldBypassPermissionChecks: true
            });
            const dashboards = await dashboardRepository.find({
                where: {
                    pageLayoutId
                }
            });
            for (const dashboard of dashboards){
                await dashboardRepository.delete(dashboard.id);
            }
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService, dashboardSyncService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.dashboardSyncService = dashboardSyncService;
    }
};
PageLayoutService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _dashboardsyncservice.DashboardSyncService === "undefined" ? Object : _dashboardsyncservice.DashboardSyncService
    ])
], PageLayoutService);

//# sourceMappingURL=page-layout.service.js.map