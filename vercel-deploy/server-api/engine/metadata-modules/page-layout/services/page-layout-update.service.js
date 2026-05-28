"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutUpdateService", {
    enumerable: true,
    get: function() {
        return PageLayoutUpdateService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _addflatentitytoflatentitymapsorthrowutil = require("../../flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _splitentitiesbyremovalstrategyutil = require("../../flat-entity/utils/split-entities-by-removal-strategy.util");
const _flatpagelayouttabeditablepropertiesconstant = require("../../flat-page-layout-tab/constants/flat-page-layout-tab-editable-properties.constant");
const _flatpagelayoutwidgeteditablepropertiesconstant = require("../../flat-page-layout-widget/constants/flat-page-layout-widget-editable-properties.constant");
const _buildflatpagelayoutwidgetcommonpropertiesutil = require("../../flat-page-layout-widget/utils/build-flat-page-layout-widget-common-properties.util");
const _frompagelayoutwidgetconfigurationtouniversalconfigurationutil = require("../../flat-page-layout-widget/utils/from-page-layout-widget-configuration-to-universal-configuration.util");
const _frompagelayoutwidgetoverridestouniversaloverridesutil = require("../../flat-page-layout-widget/utils/from-page-layout-widget-overrides-to-universal-overrides.util");
const _reconstructflatpagelayoutwithtabsandwidgetsutil = require("../../flat-page-layout/utils/reconstruct-flat-page-layout-with-tabs-and-widgets.util");
const _widgetconfigurationtypetype = require("../../page-layout-widget/enums/widget-configuration-type.type");
const _validatechartconfigurationfieldreferencesutil = require("../../page-layout-widget/utils/validate-chart-configuration-field-references.util");
const _pagelayoutexception = require("../exceptions/page-layout.exception");
const _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil = require("../utils/from-flat-page-layout-with-tabs-and-widgets-to-page-layout-dto.util");
const _iscalleroverridingentityutil = require("../../utils/is-caller-overriding-entity.util");
const _resolveflatentityoverridablepropertiesutil = require("../../utils/resolve-flat-entity-overridable-properties.util");
const _sanitizeoverridableentityinpututil = require("../../utils/sanitize-overridable-entity-input.util");
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
let PageLayoutUpdateService = class PageLayoutUpdateService {
    async updatePageLayoutWithTabs({ id, workspaceId, input }) {
        const { flatPageLayoutMaps, flatPageLayoutTabMaps, flatPageLayoutWidgetMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps',
                'flatPageLayoutTabMaps',
                'flatPageLayoutWidgetMaps'
            ]
        });
        const existingPageLayout = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatPageLayoutMaps
        });
        // TODO move in validator
        if (!(0, _utils.isDefined)(existingPageLayout) || (0, _utils.isDefined)(existingPageLayout.deletedAt)) {
            throw new _pagelayoutexception.PageLayoutException((0, _pagelayoutexception.generatePageLayoutExceptionMessage)(_pagelayoutexception.PageLayoutExceptionMessageKey.PAGE_LAYOUT_NOT_FOUND, id), _pagelayoutexception.PageLayoutExceptionCode.PAGE_LAYOUT_NOT_FOUND);
        }
        ///
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { tabs, ...updateData } = input;
        const flatPageLayoutToUpdate = {
            ...existingPageLayout,
            name: updateData.name,
            type: updateData.type,
            objectMetadataId: updateData.objectMetadataId,
            updatedAt: new Date().toISOString()
        };
        const { tabsToCreate, tabsToUpdate, tabsToDelete } = this.computeTabOperations({
            existingPageLayout,
            tabs,
            flatPageLayoutTabMaps,
            workspaceId,
            workspaceCustomApplicationId: workspaceCustomFlatApplication.id,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewFieldGroupMaps, flatViewMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps',
                'flatFrontComponentMaps',
                'flatViewFieldGroupMaps',
                'flatViewMaps'
            ]
        });
        const optimisticFlatPageLayoutTabMaps = tabsToCreate.reduce((maps, tab)=>(0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: tab,
                flatEntityMaps: maps
            }), flatPageLayoutTabMaps);
        const { widgetsToCreate, widgetsToUpdate, widgetsToDelete } = this.computeWidgetOperationsForAllTabs({
            tabs,
            flatPageLayoutWidgetMaps,
            flatPageLayoutTabMaps: optimisticFlatPageLayoutTabMaps,
            flatObjectMetadataMaps,
            workspaceId,
            workspaceCustomApplicationId: workspaceCustomFlatApplication.id,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            flatFieldMetadataMaps,
            flatFrontComponentMaps,
            flatViewFieldGroupMaps,
            flatViewMaps
        });
        const orphanedViewIds = this.collectOrphanedViewIdsFromRemovedWidgets({
            widgetsToCreate,
            widgetsToUpdate,
            widgetsToDelete,
            tabsToUpdate,
            tabsToDelete,
            flatPageLayoutWidgetMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayout: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatPageLayoutToUpdate
                    ]
                },
                pageLayoutTab: {
                    flatEntityToCreate: tabsToCreate,
                    flatEntityToDelete: tabsToDelete,
                    flatEntityToUpdate: tabsToUpdate
                },
                pageLayoutWidget: {
                    flatEntityToCreate: widgetsToCreate,
                    flatEntityToDelete: widgetsToDelete,
                    flatEntityToUpdate: widgetsToUpdate
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating page layout with tabs');
        }
        const { flatPageLayoutMaps: recomputedFlatPageLayoutMaps, flatPageLayoutTabMaps: recomputedFlatPageLayoutTabMaps, flatPageLayoutWidgetMaps: recomputedFlatPageLayoutWidgetMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutMaps',
                'flatPageLayoutTabMaps',
                'flatPageLayoutWidgetMaps'
            ]
        });
        const flatLayout = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedFlatPageLayoutMaps
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByPageLayoutId({
            pageLayoutId: id,
            workspaceId,
            updatedAt: new Date(flatLayout.updatedAt)
        });
        await this.destroyOrphanedFieldsWidgetViews({
            viewIds: orphanedViewIds,
            workspaceId
        });
        return (0, _fromflatpagelayoutwithtabsandwidgetstopagelayoutdtoutil.fromFlatPageLayoutWithTabsAndWidgetsToPageLayoutDto)((0, _reconstructflatpagelayoutwithtabsandwidgetsutil.reconstructFlatPageLayoutWithTabsAndWidgets)({
            layout: flatLayout,
            flatPageLayoutTabMaps: recomputedFlatPageLayoutTabMaps,
            flatPageLayoutWidgetMaps: recomputedFlatPageLayoutWidgetMaps
        }));
    }
    computeTabOperations({ existingPageLayout, tabs, flatPageLayoutTabMaps, workspaceId, workspaceCustomApplicationId, workspaceCustomApplicationUniversalIdentifier }) {
        const existingTabs = Object.values(flatPageLayoutTabMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((tab)=>tab.pageLayoutId === existingPageLayout.id);
        const resolvedExistingTabs = existingTabs.map(_resolveflatentityoverridablepropertiesutil.resolveFlatEntityOverridableProperties);
        const { toCreate: entitiesToCreate, toUpdate: entitiesToUpdate, toRestoreAndUpdate: entitiesToRestoreAndUpdate, idsToRemove } = (0, _utils.computeDiffBetweenObjects)({
            existingObjects: resolvedExistingTabs,
            receivedObjects: tabs,
            propertiesToCompare: _flatpagelayouttabeditablepropertiesconstant.FLAT_PAGE_LAYOUT_TAB_EDITABLE_PROPERTIES,
            isEntityIncluded: (entity)=>entity.isActive
        });
        const now = new Date();
        const tabsToCreate = entitiesToCreate.map((tabInput)=>{
            const tabId = tabInput.id ?? (0, _uuid.v4)();
            return {
                id: tabId,
                title: tabInput.title,
                position: tabInput.position,
                pageLayoutId: existingPageLayout.id,
                pageLayoutUniversalIdentifier: existingPageLayout.universalIdentifier,
                workspaceId,
                createdAt: now.toISOString(),
                updatedAt: now.toISOString(),
                deletedAt: null,
                universalIdentifier: tabId,
                applicationId: workspaceCustomApplicationId,
                applicationUniversalIdentifier: workspaceCustomApplicationUniversalIdentifier,
                widgetIds: [],
                widgetUniversalIdentifiers: [],
                icon: null,
                layoutMode: tabInput.layoutMode ?? _types.PageLayoutTabLayoutMode.GRID,
                overrides: null,
                isActive: true
            };
        });
        const tabsToUpdate = entitiesToUpdate.map((tabInput)=>{
            const existingTab = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: tabInput.id,
                flatEntityMaps: flatPageLayoutTabMaps
            });
            const shouldOverride = (0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
                callerApplicationUniversalIdentifier: workspaceCustomApplicationUniversalIdentifier,
                entityApplicationUniversalIdentifier: existingTab.applicationUniversalIdentifier,
                workspaceCustomApplicationUniversalIdentifier
            });
            const editableProperties = {
                title: tabInput.title,
                position: tabInput.position,
                ...tabInput.icon !== undefined && {
                    icon: tabInput.icon
                },
                layoutMode: tabInput.layoutMode ?? existingTab.layoutMode
            };
            const { overrides, updatedEditableProperties } = (0, _sanitizeoverridableentityinpututil.sanitizeOverridableEntityInput)({
                metadataName: 'pageLayoutTab',
                existingFlatEntity: existingTab,
                updatedEditableProperties: editableProperties,
                shouldOverride
            });
            return {
                ...existingTab,
                ...updatedEditableProperties,
                overrides,
                updatedAt: now.toISOString()
            };
        });
        const tabsToRestoreAndUpdate = entitiesToRestoreAndUpdate.map((tabInput)=>{
            const existingTab = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: tabInput.id,
                flatEntityMaps: flatPageLayoutTabMaps
            });
            const shouldOverride = (0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
                callerApplicationUniversalIdentifier: workspaceCustomApplicationUniversalIdentifier,
                entityApplicationUniversalIdentifier: existingTab.applicationUniversalIdentifier,
                workspaceCustomApplicationUniversalIdentifier
            });
            const editableProperties = {
                title: tabInput.title,
                position: tabInput.position,
                ...tabInput.icon !== undefined && {
                    icon: tabInput.icon
                },
                layoutMode: tabInput.layoutMode ?? existingTab.layoutMode
            };
            const { overrides, updatedEditableProperties } = (0, _sanitizeoverridableentityinpututil.sanitizeOverridableEntityInput)({
                metadataName: 'pageLayoutTab',
                existingFlatEntity: existingTab,
                updatedEditableProperties: editableProperties,
                shouldOverride
            });
            return {
                ...existingTab,
                ...updatedEditableProperties,
                overrides,
                isActive: true,
                updatedAt: now.toISOString()
            };
        });
        const tabsToRemove = idsToRemove.map((tabId)=>(0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: tabId,
                flatEntityMaps: flatPageLayoutTabMaps
            })).filter(_utils.isDefined);
        const { toHardDelete, toDeactivate } = (0, _splitentitiesbyremovalstrategyutil.splitEntitiesByRemovalStrategy)({
            entitiesToRemove: tabsToRemove,
            workspaceCustomApplicationUniversalIdentifier,
            now: now.toISOString()
        });
        return {
            tabsToCreate,
            tabsToUpdate: [
                ...tabsToUpdate,
                ...tabsToRestoreAndUpdate,
                ...toDeactivate
            ],
            tabsToDelete: toHardDelete
        };
    }
    computeWidgetOperationsForAllTabs({ tabs, flatPageLayoutWidgetMaps, flatPageLayoutTabMaps, flatObjectMetadataMaps, workspaceId, workspaceCustomApplicationId, workspaceCustomApplicationUniversalIdentifier, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewFieldGroupMaps, flatViewMaps }) {
        const allWidgetsToCreate = [];
        const allWidgetsToUpdate = [];
        const allWidgetsToDelete = [];
        const widgetIdsAcrossAllTabs = new Set(tabs.flatMap((tab)=>tab.widgets.map((widget)=>widget.id)));
        for (const tabInput of tabs){
            const { widgetsToCreate, widgetsToUpdate, widgetsToDelete } = this.computeWidgetOperationsForTab({
                tabId: tabInput.id,
                widgets: tabInput.widgets,
                widgetIdsAcrossAllTabs,
                flatPageLayoutWidgetMaps,
                flatPageLayoutTabMaps,
                flatObjectMetadataMaps,
                workspaceId,
                workspaceCustomApplicationId,
                workspaceCustomApplicationUniversalIdentifier,
                flatFieldMetadataMaps,
                flatFrontComponentMaps,
                flatViewFieldGroupMaps,
                flatViewMaps
            });
            allWidgetsToCreate.push(...widgetsToCreate);
            allWidgetsToUpdate.push(...widgetsToUpdate);
            allWidgetsToDelete.push(...widgetsToDelete);
        }
        return {
            widgetsToCreate: allWidgetsToCreate,
            widgetsToUpdate: allWidgetsToUpdate,
            widgetsToDelete: allWidgetsToDelete
        };
    }
    computeWidgetOperationsForTab({ tabId, widgets, widgetIdsAcrossAllTabs, flatPageLayoutWidgetMaps, flatPageLayoutTabMaps, flatObjectMetadataMaps, workspaceId, workspaceCustomApplicationId, workspaceCustomApplicationUniversalIdentifier, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewFieldGroupMaps, flatViewMaps }) {
        for (const widgetInput of widgets){
            this.validateChartFieldReferences({
                widgetInput,
                flatFieldMetadataMaps,
                flatObjectMetadataMaps
            });
        }
        const widgetIdsInCurrentTabInput = new Set(widgets.map((widget)=>widget.id));
        const existingWidgets = this.findWidgetsInTabOrMovingToTab({
            tabId,
            widgetIdsInCurrentTabInput,
            flatPageLayoutWidgetMaps
        });
        const resolvedExistingWidgets = existingWidgets.map(_resolveflatentityoverridablepropertiesutil.resolveFlatEntityOverridableProperties);
        const { toCreate: entitiesToCreate, toUpdate: entitiesToUpdate, toRestoreAndUpdate: entitiesToRestoreAndUpdate, idsToRemove } = (0, _utils.computeDiffBetweenObjects)({
            existingObjects: resolvedExistingWidgets,
            receivedObjects: widgets,
            propertiesToCompare: _flatpagelayoutwidgeteditablepropertiesconstant.FLAT_PAGE_LAYOUT_WIDGET_EDITABLE_PROPERTIES,
            isEntityIncluded: (entity)=>entity.isActive
        });
        const now = new Date();
        const widgetsToCreate = entitiesToCreate.map((widgetInput)=>{
            const widgetId = widgetInput.id ?? (0, _uuid.v4)();
            return {
                id: widgetId,
                ...(0, _buildflatpagelayoutwidgetcommonpropertiesutil.buildFlatPageLayoutWidgetCommonProperties)({
                    widgetInput,
                    flatPageLayoutTabMaps,
                    flatObjectMetadataMaps
                }),
                configuration: widgetInput.configuration,
                workspaceId,
                createdAt: now.toISOString(),
                updatedAt: now.toISOString(),
                deletedAt: null,
                universalIdentifier: widgetId,
                applicationId: workspaceCustomApplicationId,
                applicationUniversalIdentifier: workspaceCustomApplicationUniversalIdentifier,
                conditionalDisplay: widgetInput.conditionalDisplay ?? null,
                conditionalAvailabilityExpression: widgetInput.conditionalAvailabilityExpression ?? null,
                overrides: null,
                universalOverrides: null,
                isActive: true,
                universalConfiguration: (0, _frompagelayoutwidgetconfigurationtouniversalconfigurationutil.fromPageLayoutWidgetConfigurationToUniversalConfiguration)({
                    configuration: widgetInput.configuration,
                    fieldMetadataUniversalIdentifierById: flatFieldMetadataMaps.universalIdentifierById,
                    frontComponentUniversalIdentifierById: flatFrontComponentMaps.universalIdentifierById,
                    viewFieldGroupUniversalIdentifierById: flatViewFieldGroupMaps.universalIdentifierById,
                    viewUniversalIdentifierById: flatViewMaps.universalIdentifierById
                })
            };
        });
        const widgetsToUpdate = entitiesToUpdate.map((widgetInput)=>this.buildUpdatedFlatPageLayoutWidget({
                widgetInput,
                flatPageLayoutWidgetMaps,
                flatPageLayoutTabMaps,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatFrontComponentMaps,
                flatViewFieldGroupMaps,
                flatViewMaps,
                workspaceCustomApplicationUniversalIdentifier,
                now
            }));
        const widgetsToRestoreAndUpdate = entitiesToRestoreAndUpdate.map((widgetInput)=>({
                ...this.buildUpdatedFlatPageLayoutWidget({
                    widgetInput,
                    flatPageLayoutWidgetMaps,
                    flatPageLayoutTabMaps,
                    flatObjectMetadataMaps,
                    flatFieldMetadataMaps,
                    flatFrontComponentMaps,
                    flatViewFieldGroupMaps,
                    flatViewMaps,
                    workspaceCustomApplicationUniversalIdentifier,
                    now
                }),
                isActive: true
            }));
        const widgetIdsToRemoveExcludingMovedToOtherTabs = this.excludeWidgetsMovedToOtherTabs({
            idsToRemove,
            widgetIdsAcrossAllTabs
        });
        const widgetsToRemove = widgetIdsToRemoveExcludingMovedToOtherTabs.map((widgetId)=>(0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: widgetId,
                flatEntityMaps: flatPageLayoutWidgetMaps
            })).filter(_utils.isDefined);
        const { toHardDelete, toDeactivate } = (0, _splitentitiesbyremovalstrategyutil.splitEntitiesByRemovalStrategy)({
            entitiesToRemove: widgetsToRemove,
            workspaceCustomApplicationUniversalIdentifier,
            now: now.toISOString()
        });
        return {
            widgetsToCreate,
            widgetsToUpdate: [
                ...widgetsToUpdate,
                ...widgetsToRestoreAndUpdate,
                ...toDeactivate
            ],
            widgetsToDelete: toHardDelete
        };
    }
    buildUpdatedFlatPageLayoutWidget({ widgetInput, flatPageLayoutWidgetMaps, flatPageLayoutTabMaps, flatObjectMetadataMaps, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewFieldGroupMaps, flatViewMaps, workspaceCustomApplicationUniversalIdentifier, now }) {
        const existingWidget = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: widgetInput.id,
            flatEntityMaps: flatPageLayoutWidgetMaps
        });
        const shouldOverride = (0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
            callerApplicationUniversalIdentifier: workspaceCustomApplicationUniversalIdentifier,
            entityApplicationUniversalIdentifier: existingWidget.applicationUniversalIdentifier,
            workspaceCustomApplicationUniversalIdentifier
        });
        const configuration = widgetInput.configuration ?? null;
        const editableProperties = {
            title: widgetInput.title,
            type: widgetInput.type,
            objectMetadataId: widgetInput.objectMetadataId ?? null,
            gridPosition: widgetInput.gridPosition,
            position: widgetInput.position ?? null,
            configuration,
            pageLayoutTabId: widgetInput.pageLayoutTabId
        };
        if (widgetInput.conditionalDisplay !== undefined) {
            editableProperties.conditionalDisplay = widgetInput.conditionalDisplay ?? null;
        }
        if (widgetInput.conditionalAvailabilityExpression !== undefined) {
            editableProperties.conditionalAvailabilityExpression = widgetInput.conditionalAvailabilityExpression ?? null;
        }
        const { overrides, updatedEditableProperties } = (0, _sanitizeoverridableentityinpututil.sanitizeOverridableEntityInput)({
            metadataName: 'pageLayoutWidget',
            existingFlatEntity: existingWidget,
            updatedEditableProperties: editableProperties,
            shouldOverride
        });
        const updatedWidget = {
            ...existingWidget,
            ...updatedEditableProperties,
            overrides,
            updatedAt: now.toISOString()
        };
        if (updatedEditableProperties.pageLayoutTabId !== undefined) {
            const { pageLayoutTabUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                metadataName: 'pageLayoutWidget',
                foreignKeyValues: {
                    pageLayoutTabId: updatedWidget.pageLayoutTabId
                },
                flatEntityMaps: {
                    flatPageLayoutTabMaps
                }
            });
            updatedWidget.pageLayoutTabUniversalIdentifier = pageLayoutTabUniversalIdentifier;
        }
        if (updatedEditableProperties.objectMetadataId !== undefined) {
            const { objectMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                metadataName: 'pageLayoutWidget',
                foreignKeyValues: {
                    objectMetadataId: updatedWidget.objectMetadataId
                },
                flatEntityMaps: {
                    flatObjectMetadataMaps
                }
            });
            updatedWidget.objectMetadataUniversalIdentifier = objectMetadataUniversalIdentifier;
        }
        if ((0, _utils.isDefined)(overrides)) {
            updatedWidget.universalOverrides = (0, _frompagelayoutwidgetoverridestouniversaloverridesutil.fromPageLayoutWidgetOverridesToUniversalOverrides)({
                overrides,
                pageLayoutTabUniversalIdentifierById: flatPageLayoutTabMaps.universalIdentifierById
            });
        } else {
            updatedWidget.universalOverrides = null;
        }
        if ((0, _utils.isDefined)(configuration)) {
            updatedWidget.universalConfiguration = (0, _frompagelayoutwidgetconfigurationtouniversalconfigurationutil.fromPageLayoutWidgetConfigurationToUniversalConfiguration)({
                configuration,
                fieldMetadataUniversalIdentifierById: flatFieldMetadataMaps.universalIdentifierById,
                frontComponentUniversalIdentifierById: flatFrontComponentMaps.universalIdentifierById,
                viewFieldGroupUniversalIdentifierById: flatViewFieldGroupMaps.universalIdentifierById,
                viewUniversalIdentifierById: flatViewMaps.universalIdentifierById
            });
        }
        return updatedWidget;
    }
    findWidgetsInTabOrMovingToTab({ tabId, widgetIdsInCurrentTabInput, flatPageLayoutWidgetMaps }) {
        return Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((widget)=>widget.pageLayoutTabId === tabId || widgetIdsInCurrentTabInput.has(widget.id));
    }
    excludeWidgetsMovedToOtherTabs({ idsToRemove, widgetIdsAcrossAllTabs }) {
        return idsToRemove.filter((widgetId)=>!widgetIdsAcrossAllTabs.has(widgetId));
    }
    validateChartFieldReferences({ widgetInput, flatFieldMetadataMaps, flatObjectMetadataMaps }) {
        if (!(0, _utils.isDefined)(widgetInput.configuration)) {
            return;
        }
        (0, _validatechartconfigurationfieldreferencesutil.validateChartConfigurationFieldReferencesOrThrow)({
            widgetConfiguration: widgetInput.configuration,
            widgetObjectMetadataId: widgetInput.objectMetadataId,
            widgetTitle: widgetInput.title,
            flatFieldMetadataMaps,
            flatObjectMetadataMaps
        });
    }
    collectOrphanedViewIdsFromRemovedWidgets({ widgetsToCreate, widgetsToUpdate, widgetsToDelete, tabsToUpdate, tabsToDelete, flatPageLayoutWidgetMaps }) {
        const viewIdsToDelete = new Set();
        const directlyRemovedWidgetIds = new Set();
        for (const widget of widgetsToDelete){
            directlyRemovedWidgetIds.add(widget.id);
            const viewId = this.getViewIdFromFieldsWidget(widget);
            if ((0, _utils.isDefined)(viewId)) {
                viewIdsToDelete.add(viewId);
            }
        }
        for (const widget of widgetsToUpdate){
            if (!widget.isActive) {
                directlyRemovedWidgetIds.add(widget.id);
            }
        }
        const removedTabIds = new Set([
            ...tabsToUpdate.filter((tab)=>!tab.isActive).map((tab)=>tab.id),
            ...tabsToDelete.map((tab)=>tab.id)
        ]);
        const allExistingWidgets = Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined);
        for (const widget of allExistingWidgets){
            if (widget.isActive && removedTabIds.has(widget.pageLayoutTabId)) {
                const viewId = this.getViewIdFromFieldsWidget(widget);
                if ((0, _utils.isDefined)(viewId)) {
                    viewIdsToDelete.add(viewId);
                }
            }
        }
        for (const widget of allExistingWidgets){
            if (widget.isActive && !directlyRemovedWidgetIds.has(widget.id) && !removedTabIds.has(widget.pageLayoutTabId)) {
                const viewId = this.getViewIdFromFieldsWidget(widget);
                if ((0, _utils.isDefined)(viewId)) {
                    viewIdsToDelete.delete(viewId);
                }
            }
        }
        for (const widget of widgetsToCreate){
            const viewId = this.getViewIdFromFieldsWidget(widget);
            if ((0, _utils.isDefined)(viewId)) {
                viewIdsToDelete.delete(viewId);
            }
        }
        return [
            ...viewIdsToDelete
        ];
    }
    getViewIdFromFieldsWidget(widget) {
        if (widget.configuration.configurationType !== _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS) {
            return undefined;
        }
        const viewId = widget.configuration.viewId;
        return typeof viewId === 'string' ? viewId : undefined;
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
                this.logger.warn(`Failed to destroy view ${viewId} after Fields widget deletion: ${error}`);
            }
        }
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService, dashboardSyncService, viewService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.dashboardSyncService = dashboardSyncService;
        this.viewService = viewService;
        this.logger = new _common.Logger(PageLayoutUpdateService.name);
    }
};
PageLayoutUpdateService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _dashboardsyncservice.DashboardSyncService === "undefined" ? Object : _dashboardsyncservice.DashboardSyncService,
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService
    ])
], PageLayoutUpdateService);

//# sourceMappingURL=page-layout-update.service.js.map