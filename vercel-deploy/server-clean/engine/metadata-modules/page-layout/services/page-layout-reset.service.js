"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutResetService", {
    enumerable: true,
    get: function() {
        return PageLayoutResetService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _splitentitiesbyresetstrategyutil = require("../../flat-entity/utils/split-entities-by-reset-strategy.util");
const _isflatpagelayoutwidgetconfigurationoftypeutil = require("../../flat-page-layout-widget/utils/is-flat-page-layout-widget-configuration-of-type.util");
const _reconstructflatpagelayoutwithtabsandwidgetsutil = require("../../flat-page-layout/utils/reconstruct-flat-page-layout-with-tabs-and-widgets.util");
const _pagelayouttabexception = require("../../page-layout-tab/exceptions/page-layout-tab.exception");
const _fromflatpagelayouttabtopagelayouttabdtoutil = require("../../page-layout-tab/utils/from-flat-page-layout-tab-to-page-layout-tab-dto.util");
const _widgetconfigurationtypetype = require("../../page-layout-widget/enums/widget-configuration-type.type");
const _pagelayoutwidgetexception = require("../../page-layout-widget/exceptions/page-layout-widget.exception");
const _fromflatpagelayoutwidgettopagelayoutwidgetdtoutil = require("../../page-layout-widget/utils/from-flat-page-layout-widget-to-page-layout-widget-dto.util");
const _pagelayoutexception = require("../exceptions/page-layout.exception");
const _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil = require("../utils/from-flat-page-layout-with-tabs-and-widgets-to-page-layout-dto.util");
const _viewservice = require("../../view/services/view.service");
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
let PageLayoutResetService = class PageLayoutResetService {
    async resetPageLayoutWidgetToDefault({ id, workspaceId }) {
        const { flatPageLayoutWidgetMaps, flatViewFieldGroupMaps, flatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutWidgetMaps',
                'flatViewFieldGroupMaps',
                'flatViewFieldMaps'
            ]
        });
        const widget = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatPageLayoutWidgetMaps
        });
        if (!(0, _utils.isDefined)(widget) || (0, _utils.isDefined)(widget.deletedAt)) {
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException((0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.PAGE_LAYOUT_WIDGET_NOT_FOUND, id), _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.PAGE_LAYOUT_WIDGET_NOT_FOUND);
        }
        if (!(0, _isflatpagelayoutwidgetconfigurationoftypeutil.isFlatPageLayoutWidgetConfigurationOfType)(widget, _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS)) {
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException(`Widget "${id}" is not a FIELDS widget and cannot be reset to default`, _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        if (widget.applicationUniversalIdentifier === workspaceCustomFlatApplication.universalIdentifier) {
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException(`Custom widget "${id}" cannot be reset to default`, _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        }
        const now = new Date().toISOString();
        const widgetToUpdate = {
            ...widget,
            overrides: null,
            universalOverrides: null,
            updatedAt: now
        };
        const viewId = widget.configuration.viewId;
        const { viewFieldGroupsToUpdate, viewFieldGroupsToDelete, viewFieldsToUpdate, viewFieldsToDelete } = (0, _utils.isDefined)(viewId) ? this.computeFieldsWidgetChildResetOperations({
            viewId,
            flatViewFieldGroupMaps,
            flatViewFieldMaps,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            now
        }) : {
            viewFieldGroupsToUpdate: [],
            viewFieldGroupsToDelete: [],
            viewFieldsToUpdate: [],
            viewFieldsToDelete: []
        };
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayoutWidget: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: [
                        widgetToUpdate
                    ],
                    flatEntityToDelete: []
                },
                viewFieldGroup: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: viewFieldGroupsToUpdate,
                    flatEntityToDelete: viewFieldGroupsToDelete
                },
                viewField: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: viewFieldsToUpdate,
                    flatEntityToDelete: viewFieldsToDelete
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while resetting page layout widget to default');
        }
        const { flatPageLayoutWidgetMaps: recomputedWidgetMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutWidgetMaps'
            ]
        });
        const updatedWidget = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedWidgetMaps
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByWidgetId({
            widgetId: id,
            workspaceId,
            updatedAt: new Date(now)
        });
        return (0, _fromflatpagelayoutwidgettopagelayoutwidgetdtoutil.fromFlatPageLayoutWidgetToPageLayoutWidgetDto)(updatedWidget);
    }
    async resetPageLayoutTabToDefault({ id, workspaceId }) {
        const { flatPageLayoutTabMaps, flatPageLayoutWidgetMaps, flatViewFieldGroupMaps, flatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutTabMaps',
                'flatPageLayoutWidgetMaps',
                'flatViewFieldGroupMaps',
                'flatViewFieldMaps'
            ]
        });
        const tab = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatPageLayoutTabMaps
        });
        if (!(0, _utils.isDefined)(tab) || (0, _utils.isDefined)(tab.deletedAt)) {
            throw new _pagelayouttabexception.PageLayoutTabException((0, _pagelayouttabexception.generatePageLayoutTabExceptionMessage)(_pagelayouttabexception.PageLayoutTabExceptionMessageKey.PAGE_LAYOUT_TAB_NOT_FOUND, id), _pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND);
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        if (tab.applicationUniversalIdentifier === workspaceCustomFlatApplication.universalIdentifier) {
            throw new _pagelayouttabexception.PageLayoutTabException(`Custom tab "${id}" cannot be reset to default`, _pagelayouttabexception.PageLayoutTabExceptionCode.INVALID_PAGE_LAYOUT_TAB_DATA);
        }
        const now = new Date().toISOString();
        const tabToUpdate = {
            ...tab,
            overrides: null,
            updatedAt: now
        };
        const { widgetsToUpdate, widgetsToDelete, viewFieldGroupsToUpdate, viewFieldGroupsToDelete, viewFieldsToUpdate, viewFieldsToDelete, orphanedViewIds } = this.computeTabChildResetOperations({
            tabId: id,
            flatPageLayoutWidgetMaps,
            flatViewFieldGroupMaps,
            flatViewFieldMaps,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            now
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayoutTab: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: [
                        tabToUpdate
                    ],
                    flatEntityToDelete: []
                },
                pageLayoutWidget: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: widgetsToUpdate,
                    flatEntityToDelete: widgetsToDelete
                },
                viewFieldGroup: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: viewFieldGroupsToUpdate,
                    flatEntityToDelete: viewFieldGroupsToDelete
                },
                viewField: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: viewFieldsToUpdate,
                    flatEntityToDelete: viewFieldsToDelete
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while resetting page layout tab to default');
        }
        await this.destroyOrphanedFieldsWidgetViews({
            viewIds: orphanedViewIds,
            workspaceId
        });
        const { flatPageLayoutTabMaps: recomputedTabMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutTabMaps'
            ]
        });
        const updatedTab = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedTabMaps
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByTabId({
            tabId: id,
            workspaceId,
            updatedAt: new Date(now)
        });
        return (0, _fromflatpagelayouttabtopagelayouttabdtoutil.fromFlatPageLayoutTabToPageLayoutTabDto)(updatedTab);
    }
    async resetPageLayoutToDefault({ id, workspaceId }) {
        const { flatPageLayoutMaps, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps, flatViewFieldGroupMaps, flatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps',
                'flatPageLayoutTabMaps',
                'flatPageLayoutWidgetMaps',
                'flatViewFieldGroupMaps',
                'flatViewFieldMaps'
            ]
        });
        const layout = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatPageLayoutMaps
        });
        if (!(0, _utils.isDefined)(layout) || (0, _utils.isDefined)(layout.deletedAt)) {
            throw new _pagelayoutexception.PageLayoutException((0, _pagelayoutexception.generatePageLayoutExceptionMessage)(_pagelayoutexception.PageLayoutExceptionMessageKey.PAGE_LAYOUT_NOT_FOUND, id), _pagelayoutexception.PageLayoutExceptionCode.PAGE_LAYOUT_NOT_FOUND);
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        if (layout.applicationUniversalIdentifier === workspaceCustomFlatApplication.universalIdentifier) {
            throw new _pagelayoutexception.PageLayoutException(`Custom page layout "${id}" cannot be reset to default`, _pagelayoutexception.PageLayoutExceptionCode.INVALID_PAGE_LAYOUT_DATA);
        }
        const now = new Date().toISOString();
        const existingTabs = Object.values(flatPageLayoutTabMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((tab)=>tab.pageLayoutId === id && !(0, _utils.isDefined)(tab.deletedAt));
        const { toHardDelete: tabsToDelete, toReset: tabsToReset } = (0, _splitentitiesbyresetstrategyutil.splitEntitiesByResetStrategy)({
            entities: existingTabs,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            now
        });
        let allWidgetsToUpdate = [];
        let allWidgetsToDelete = [];
        let allViewFieldGroupsToUpdate = [];
        let allViewFieldGroupsToDelete = [];
        let allViewFieldsToUpdate = [];
        let allViewFieldsToDelete = [];
        let allOrphanedViewIds = [];
        for (const tab of [
            ...tabsToReset,
            ...tabsToDelete
        ]){
            const { widgetsToUpdate, widgetsToDelete, viewFieldGroupsToUpdate, viewFieldGroupsToDelete, viewFieldsToUpdate, viewFieldsToDelete, orphanedViewIds } = this.computeTabChildResetOperations({
                tabId: tab.id,
                flatPageLayoutWidgetMaps,
                flatViewFieldGroupMaps,
                flatViewFieldMaps,
                workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
                now
            });
            allWidgetsToUpdate = [
                ...allWidgetsToUpdate,
                ...widgetsToUpdate
            ];
            allWidgetsToDelete = [
                ...allWidgetsToDelete,
                ...widgetsToDelete
            ];
            allViewFieldGroupsToUpdate = [
                ...allViewFieldGroupsToUpdate,
                ...viewFieldGroupsToUpdate
            ];
            allViewFieldGroupsToDelete = [
                ...allViewFieldGroupsToDelete,
                ...viewFieldGroupsToDelete
            ];
            allViewFieldsToUpdate = [
                ...allViewFieldsToUpdate,
                ...viewFieldsToUpdate
            ];
            allViewFieldsToDelete = [
                ...allViewFieldsToDelete,
                ...viewFieldsToDelete
            ];
            allOrphanedViewIds = [
                ...allOrphanedViewIds,
                ...orphanedViewIds
            ];
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayoutTab: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: tabsToReset,
                    flatEntityToDelete: tabsToDelete
                },
                pageLayoutWidget: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: allWidgetsToUpdate,
                    flatEntityToDelete: allWidgetsToDelete
                },
                viewFieldGroup: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: allViewFieldGroupsToUpdate,
                    flatEntityToDelete: allViewFieldGroupsToDelete
                },
                viewField: {
                    flatEntityToCreate: [],
                    flatEntityToUpdate: allViewFieldsToUpdate,
                    flatEntityToDelete: allViewFieldsToDelete
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while resetting page layout to default');
        }
        await this.destroyOrphanedFieldsWidgetViews({
            viewIds: allOrphanedViewIds,
            workspaceId
        });
        const { flatPageLayoutMaps: recomputedLayoutMaps, flatPageLayoutTabMaps: recomputedTabMaps, flatPageLayoutWidgetMaps: recomputedWidgetMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps',
                'flatPageLayoutTabMaps',
                'flatPageLayoutWidgetMaps'
            ]
        });
        const updatedLayout = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedLayoutMaps
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByPageLayoutId({
            pageLayoutId: id,
            workspaceId,
            updatedAt: new Date(now)
        });
        return (0, _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil.fromFlatPageLayoutWithTabsAndWidgetsToPageLayoutDto)((0, _reconstructflatpagelayoutwithtabsandwidgetsutil.reconstructFlatPageLayoutWithTabsAndWidgets)({
            layout: updatedLayout,
            flatPageLayoutTabMaps: recomputedTabMaps,
            flatPageLayoutWidgetMaps: recomputedWidgetMaps
        }));
    }
    computeTabChildResetOperations({ tabId, flatPageLayoutWidgetMaps, flatViewFieldGroupMaps, flatViewFieldMaps, workspaceCustomApplicationUniversalIdentifier, now }) {
        const existingWidgets = Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((widget)=>widget.pageLayoutTabId === tabId && !(0, _utils.isDefined)(widget.deletedAt));
        const { toHardDelete: widgetsToDelete, toReset: widgetsToReset } = (0, _splitentitiesbyresetstrategyutil.splitEntitiesByResetStrategy)({
            entities: existingWidgets,
            workspaceCustomApplicationUniversalIdentifier,
            now
        });
        let allViewFieldGroupsToUpdate = [];
        let allViewFieldGroupsToDelete = [];
        let allViewFieldsToUpdate = [];
        let allViewFieldsToDelete = [];
        for (const widget of widgetsToReset){
            if (!(0, _isflatpagelayoutwidgetconfigurationoftypeutil.isFlatPageLayoutWidgetConfigurationOfType)(widget, _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS)) {
                continue;
            }
            const viewId = widget.configuration.viewId;
            if (!(0, _utils.isDefined)(viewId)) {
                continue;
            }
            const { viewFieldGroupsToUpdate, viewFieldGroupsToDelete, viewFieldsToUpdate, viewFieldsToDelete } = this.computeFieldsWidgetChildResetOperations({
                viewId,
                flatViewFieldGroupMaps,
                flatViewFieldMaps,
                workspaceCustomApplicationUniversalIdentifier,
                now
            });
            allViewFieldGroupsToUpdate = [
                ...allViewFieldGroupsToUpdate,
                ...viewFieldGroupsToUpdate
            ];
            allViewFieldGroupsToDelete = [
                ...allViewFieldGroupsToDelete,
                ...viewFieldGroupsToDelete
            ];
            allViewFieldsToUpdate = [
                ...allViewFieldsToUpdate,
                ...viewFieldsToUpdate
            ];
            allViewFieldsToDelete = [
                ...allViewFieldsToDelete,
                ...viewFieldsToDelete
            ];
        }
        const orphanedViewIds = this.collectOrphanedViewIdsFromDeletedWidgets(widgetsToDelete);
        return {
            widgetsToUpdate: widgetsToReset,
            widgetsToDelete,
            viewFieldGroupsToUpdate: allViewFieldGroupsToUpdate,
            viewFieldGroupsToDelete: allViewFieldGroupsToDelete,
            viewFieldsToUpdate: allViewFieldsToUpdate,
            viewFieldsToDelete: allViewFieldsToDelete,
            orphanedViewIds
        };
    }
    collectOrphanedViewIdsFromDeletedWidgets(widgets) {
        const viewIds = [];
        for (const widget of widgets){
            if (widget.configuration.configurationType !== _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS) {
                continue;
            }
            const viewId = widget.configuration.viewId;
            if (typeof viewId === 'string') {
                viewIds.push(viewId);
            }
        }
        return viewIds;
    }
    async destroyOrphanedFieldsWidgetViews({ viewIds, workspaceId }) {
        for (const viewId of viewIds){
            try {
                await this.viewService.destroyOne({
                    destroyViewInput: {
                        id: viewId
                    },
                    workspaceId
                });
            } catch (error) {
                this.logger.warn(`Failed to destroy orphaned view ${viewId} during tab reset: ${error}`);
            }
        }
    }
    computeFieldsWidgetChildResetOperations({ viewId, flatViewFieldGroupMaps, flatViewFieldMaps, workspaceCustomApplicationUniversalIdentifier, now }) {
        const existingGroups = Object.values(flatViewFieldGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((group)=>group.viewId === viewId && !(0, _utils.isDefined)(group.deletedAt));
        const existingFields = Object.values(flatViewFieldMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((field)=>field.viewId === viewId && !(0, _utils.isDefined)(field.deletedAt));
        const { toHardDelete: groupsToDelete, toReset: groupsToReset } = (0, _splitentitiesbyresetstrategyutil.splitEntitiesByResetStrategy)({
            entities: existingGroups,
            workspaceCustomApplicationUniversalIdentifier,
            now
        });
        const { toHardDelete: fieldsToDelete, toReset: fieldsToReset } = (0, _splitentitiesbyresetstrategyutil.splitEntitiesByResetStrategy)({
            entities: existingFields,
            workspaceCustomApplicationUniversalIdentifier,
            now
        });
        return {
            viewFieldGroupsToUpdate: groupsToReset,
            viewFieldGroupsToDelete: groupsToDelete,
            viewFieldsToUpdate: fieldsToReset,
            viewFieldsToDelete: fieldsToDelete
        };
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService, dashboardSyncService, viewService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.dashboardSyncService = dashboardSyncService;
        this.viewService = viewService;
        this.logger = new _common.Logger(PageLayoutResetService.name);
    }
};
PageLayoutResetService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _dashboardsyncservice.DashboardSyncService === "undefined" ? Object : _dashboardsyncservice.DashboardSyncService,
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService
    ])
], PageLayoutResetService);

//# sourceMappingURL=page-layout-reset.service.js.map