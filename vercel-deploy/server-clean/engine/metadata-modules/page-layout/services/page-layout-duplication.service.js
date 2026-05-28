"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutDuplicationService", {
    enumerable: true,
    get: function() {
        return PageLayoutDuplicationService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _addflatentitytoflatentitymapsorthrowutil = require("../../flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreatepagelayouttabinputtoflatpagelayouttabtocreateutil = require("../../flat-page-layout-tab/utils/from-create-page-layout-tab-input-to-flat-page-layout-tab-to-create.util");
const _fromcreatepagelayoutwidgetinputtoflatpagelayoutwidgettocreateutil = require("../../flat-page-layout-widget/utils/from-create-page-layout-widget-input-to-flat-page-layout-widget-to-create.util");
const _fromcreatepagelayoutinputtoflatpagelayouttocreateutil = require("../../flat-page-layout/utils/from-create-page-layout-input-to-flat-page-layout-to-create.util");
const _reconstructflatpagelayoutwithtabsandwidgetsutil = require("../../flat-page-layout/utils/reconstruct-flat-page-layout-with-tabs-and-widgets.util");
const _pagelayoutexception = require("../exceptions/page-layout.exception");
const _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil = require("../utils/from-flat-page-layout-with-tabs-and-widgets-to-page-layout-dto.util");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PageLayoutDuplicationService = class PageLayoutDuplicationService {
    async duplicate({ pageLayoutId, workspaceId }) {
        const { flatPageLayoutMaps, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps, flatObjectMetadataMaps, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewFieldGroupMaps, flatViewMaps } = await this.getPageLayoutFlatEntityMaps(workspaceId);
        const originalFlatLayout = this.findOriginalLayoutOrThrow(pageLayoutId, flatPageLayoutMaps);
        const originalTabsWithWidgets = this.getOriginalTabsWithWidgets(originalFlatLayout, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps);
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const newFlatPageLayout = (0, _fromcreatepagelayoutinputtoflatpagelayouttocreateutil.fromCreatePageLayoutInputToFlatPageLayoutToCreate)({
            createPageLayoutInput: {
                name: originalFlatLayout.name,
                type: originalFlatLayout.type,
                objectMetadataId: originalFlatLayout.objectMetadataId
            },
            workspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatObjectMetadataMaps
        });
        const optimisticFlatPageLayoutMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: newFlatPageLayout,
            flatEntityMaps: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)()
        });
        const { newFlatTabs, originalTabIdToNewTabIdMap } = this.createDuplicatedTabs({
            originalTabs: originalTabsWithWidgets.map(({ tab })=>tab),
            newPageLayoutId: newFlatPageLayout.id,
            workspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatPageLayoutMaps: optimisticFlatPageLayoutMaps
        });
        const optimisticFlatPageLayoutTabMaps = newFlatTabs.reduce((maps, flatTab)=>(0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: flatTab,
                flatEntityMaps: maps
            }), (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)());
        const newFlatWidgets = this.createDuplicatedWidgets({
            originalTabsWithWidgets,
            originalTabIdToNewTabIdMap,
            workspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatPageLayoutTabMaps: optimisticFlatPageLayoutTabMaps,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            flatFrontComponentMaps,
            flatViewFieldGroupMaps,
            flatViewMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayout: {
                    flatEntityToCreate: [
                        newFlatPageLayout
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                pageLayoutTab: {
                    flatEntityToCreate: newFlatTabs,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                pageLayoutWidget: {
                    flatEntityToCreate: newFlatWidgets,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while duplicating page layout');
        }
        const { flatPageLayoutMaps: recomputedFlatPageLayoutMaps, flatPageLayoutTabMaps: recomputedFlatPageLayoutTabMaps, flatPageLayoutWidgetMaps: recomputedFlatPageLayoutWidgetMaps } = await this.getPageLayoutFlatEntityMaps(workspaceId);
        const newFlatLayoutWithTabsAndWidgets = (0, _reconstructflatpagelayoutwithtabsandwidgetsutil.reconstructFlatPageLayoutWithTabsAndWidgets)({
            layout: (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: newFlatPageLayout.id,
                flatEntityMaps: recomputedFlatPageLayoutMaps
            }),
            flatPageLayoutTabMaps: recomputedFlatPageLayoutTabMaps,
            flatPageLayoutWidgetMaps: recomputedFlatPageLayoutWidgetMaps
        });
        return (0, _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil.fromFlatPageLayoutWithTabsAndWidgetsToPageLayoutDto)(newFlatLayoutWithTabsAndWidgets);
    }
    async getPageLayoutFlatEntityMaps(workspaceId) {
        return this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps',
                'flatPageLayoutTabMaps',
                'flatPageLayoutWidgetMaps',
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps',
                'flatFrontComponentMaps',
                'flatViewFieldGroupMaps',
                'flatViewMaps'
            ]
        });
    }
    findOriginalLayoutOrThrow(pageLayoutId, flatPageLayoutMaps) {
        const flatLayout = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: pageLayoutId,
            flatEntityMaps: flatPageLayoutMaps
        });
        if (!(0, _utils.isDefined)(flatLayout) || (0, _utils.isDefined)(flatLayout.deletedAt)) {
            throw new _pagelayoutexception.PageLayoutException((0, _pagelayoutexception.generatePageLayoutExceptionMessage)(_pagelayoutexception.PageLayoutExceptionMessageKey.PAGE_LAYOUT_NOT_FOUND, pageLayoutId), _pagelayoutexception.PageLayoutExceptionCode.PAGE_LAYOUT_NOT_FOUND);
        }
        return flatLayout;
    }
    getOriginalTabsWithWidgets(originalFlatLayout, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps) {
        const widgetsByTabId = new Map();
        for (const widget of Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier)){
            if (!(0, _utils.isDefined)(widget) || (0, _utils.isDefined)(widget.deletedAt)) {
                continue;
            }
            const existingWidgets = widgetsByTabId.get(widget.pageLayoutTabId) ?? [];
            existingWidgets.push(widget);
            widgetsByTabId.set(widget.pageLayoutTabId, existingWidgets);
        }
        const tabs = Object.values(flatPageLayoutTabMaps.byUniversalIdentifier).filter((tab)=>(0, _utils.isDefined)(tab) && tab.pageLayoutId === originalFlatLayout.id && !(0, _utils.isDefined)(tab.deletedAt)).sort((tabA, tabB)=>(tabA.position ?? 0) - (tabB.position ?? 0));
        return tabs.map((tab)=>({
                tab,
                widgets: widgetsByTabId.get(tab.id) ?? []
            }));
    }
    createDuplicatedTabs({ originalTabs, newPageLayoutId, workspaceId, flatApplication, flatPageLayoutMaps }) {
        const originalTabIdToNewTabIdMap = new Map();
        const newFlatTabs = originalTabs.map((originalTab)=>{
            const newFlatTab = (0, _fromcreatepagelayouttabinputtoflatpagelayouttabtocreateutil.fromCreatePageLayoutTabInputToFlatPageLayoutTabToCreate)({
                createPageLayoutTabInput: {
                    title: originalTab.title,
                    position: originalTab.position,
                    pageLayoutId: newPageLayoutId
                },
                workspaceId,
                flatApplication,
                flatPageLayoutMaps
            });
            originalTabIdToNewTabIdMap.set(originalTab.id, newFlatTab.id);
            return newFlatTab;
        });
        return {
            newFlatTabs,
            originalTabIdToNewTabIdMap
        };
    }
    createDuplicatedWidgets({ originalTabsWithWidgets, originalTabIdToNewTabIdMap, workspaceId, flatApplication, flatPageLayoutTabMaps, flatObjectMetadataMaps, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewFieldGroupMaps, flatViewMaps }) {
        return originalTabsWithWidgets.flatMap(({ tab, widgets })=>{
            const newTabId = originalTabIdToNewTabIdMap.get(tab.id);
            return widgets.map((originalWidget)=>(0, _fromcreatepagelayoutwidgetinputtoflatpagelayoutwidgettocreateutil.fromCreatePageLayoutWidgetInputToFlatPageLayoutWidgetToCreate)({
                    createPageLayoutWidgetInput: {
                        title: originalWidget.title,
                        gridPosition: originalWidget.gridPosition,
                        position: originalWidget.position ?? undefined,
                        type: originalWidget.type,
                        objectMetadataId: originalWidget.objectMetadataId,
                        configuration: originalWidget.configuration,
                        pageLayoutTabId: newTabId
                    },
                    workspaceId,
                    flatApplication,
                    flatPageLayoutTabMaps,
                    flatObjectMetadataMaps,
                    flatFieldMetadataMaps,
                    flatFrontComponentMaps,
                    flatViewFieldGroupMaps,
                    flatViewMaps
                }));
        });
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
PageLayoutDuplicationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], PageLayoutDuplicationService);

//# sourceMappingURL=page-layout-duplication.service.js.map