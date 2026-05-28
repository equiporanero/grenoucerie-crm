"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutWidgetService", {
    enumerable: true,
    get: function() {
        return PageLayoutWidgetService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _transformrichtextutil = require("../../../core-modules/record-transformer/utils/transform-rich-text.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreatepagelayoutwidgetinputtoflatpagelayoutwidgettocreateutil = require("../../flat-page-layout-widget/utils/from-create-page-layout-widget-input-to-flat-page-layout-widget-to-create.util");
const _fromdestroypagelayoutwidgetinputtoflatpagelayoutwidgetorthrowutil = require("../../flat-page-layout-widget/utils/from-destroy-page-layout-widget-input-to-flat-page-layout-widget-or-throw.util");
const _fromupdatepagelayoutwidgetinputtoflatpagelayoutwidgettoupdateorthrowutil = require("../../flat-page-layout-widget/utils/from-update-page-layout-widget-input-to-flat-page-layout-widget-to-update-or-throw.util");
const _resolveoverridableentitypropertyutil = require("../../utils/resolve-overridable-entity-property.util");
const _widgetconfigurationtypetype = require("../enums/widget-configuration-type.type");
const _pagelayoutwidgetexception = require("../exceptions/page-layout-widget.exception");
const _fromflatpagelayoutwidgettopagelayoutwidgetdtoutil = require("../utils/from-flat-page-layout-widget-to-page-layout-widget-dto.util");
const _validatechartconfigurationfieldreferencesutil = require("../utils/validate-chart-configuration-field-references.util");
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
let PageLayoutWidgetService = class PageLayoutWidgetService {
    async getFlatPageLayoutWidgetMaps(workspaceId) {
        const { flatPageLayoutWidgetMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutWidgetMaps'
            ]
        });
        return flatPageLayoutWidgetMaps;
    }
    async validateAndRunWidgetMigration({ workspaceId, operations, errorMessage }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                pageLayoutWidget: operations
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, errorMessage);
        }
    }
    async enrichRichTextConfigurationBody(configuration) {
        if (configuration.configurationType !== _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT) {
            return configuration;
        }
        if (!(0, _utils.isDefined)(configuration.body)) {
            return configuration;
        }
        try {
            return {
                ...configuration,
                body: await (0, _transformrichtextutil.transformRichTextValue)(configuration.body)
            };
        } catch  {
            return configuration;
        }
    }
    async validateChartFieldReferences({ configuration, objectMetadataId, widgetTitle, workspaceId }) {
        const { flatFieldMetadataMaps, flatObjectMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps',
                'flatObjectMetadataMaps'
            ]
        });
        (0, _validatechartconfigurationfieldreferencesutil.validateChartConfigurationFieldReferencesOrThrow)({
            widgetConfiguration: configuration,
            widgetObjectMetadataId: objectMetadataId,
            widgetTitle,
            flatFieldMetadataMaps,
            flatObjectMetadataMaps
        });
    }
    async findByPageLayoutTabId({ workspaceId, pageLayoutTabId }) {
        const flatPageLayoutWidgetMaps = await this.getFlatPageLayoutWidgetMaps(workspaceId);
        return Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((widget)=>(0, _resolveoverridableentitypropertyutil.resolveOverridableEntityProperty)(widget, 'pageLayoutTabId') === pageLayoutTabId && !(0, _utils.isDefined)(widget.deletedAt)).sort((widgetA, widgetB)=>new Date(widgetA.createdAt).getTime() - new Date(widgetB.createdAt).getTime()).map(_fromflatpagelayoutwidgettopagelayoutwidgetdtoutil.fromFlatPageLayoutWidgetToPageLayoutWidgetDto);
    }
    async findByIdOrThrow({ id, workspaceId }) {
        const flatPageLayoutWidgetMaps = await this.getFlatPageLayoutWidgetMaps(workspaceId);
        const flatWidget = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatPageLayoutWidgetMaps
        });
        if (!(0, _utils.isDefined)(flatWidget) || (0, _utils.isDefined)(flatWidget.deletedAt)) {
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException((0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.PAGE_LAYOUT_WIDGET_NOT_FOUND, id), _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.PAGE_LAYOUT_WIDGET_NOT_FOUND);
        }
        return (0, _fromflatpagelayoutwidgettopagelayoutwidgetdtoutil.fromFlatPageLayoutWidgetToPageLayoutWidgetDto)(flatWidget);
    }
    async create({ input, workspaceId }) {
        const createInput = (0, _utils.isDefined)(input.configuration) ? {
            ...input,
            configuration: await this.enrichRichTextConfigurationBody(input.configuration)
        } : input;
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPageLayoutTabMaps, flatObjectMetadataMaps, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewFieldGroupMaps, flatViewMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutTabMaps',
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps',
                'flatFrontComponentMaps',
                'flatViewFieldGroupMaps',
                'flatViewMaps'
            ]
        });
        const flatPageLayoutWidgetToCreate = (0, _fromcreatepagelayoutwidgetinputtoflatpagelayoutwidgettocreateutil.fromCreatePageLayoutWidgetInputToFlatPageLayoutWidgetToCreate)({
            createPageLayoutWidgetInput: createInput,
            workspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatPageLayoutTabMaps,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            flatFrontComponentMaps,
            flatViewFieldGroupMaps,
            flatViewMaps
        });
        if ((0, _utils.isDefined)(createInput.configuration)) {
            await this.validateChartFieldReferences({
                configuration: createInput.configuration,
                objectMetadataId: createInput.objectMetadataId ?? null,
                widgetTitle: createInput.title,
                workspaceId
            });
        }
        await this.validateAndRunWidgetMigration({
            workspaceId,
            operations: {
                flatEntityToCreate: [
                    flatPageLayoutWidgetToCreate
                ],
                flatEntityToUpdate: [],
                flatEntityToDelete: []
            },
            errorMessage: 'Multiple validation errors occurred while creating page layout widget'
        });
        const recomputedMaps = await this.getFlatPageLayoutWidgetMaps(workspaceId);
        const createdWidget = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatPageLayoutWidgetToCreate.id,
            flatEntityMaps: recomputedMaps
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByWidgetId({
            widgetId: flatPageLayoutWidgetToCreate.id,
            workspaceId,
            updatedAt: new Date(createdWidget.updatedAt)
        });
        return (0, _fromflatpagelayoutwidgettopagelayoutwidgetdtoutil.fromFlatPageLayoutWidgetToPageLayoutWidgetDto)(createdWidget);
    }
    async update({ id, workspaceId, updateData }) {
        const existingFlatPageLayoutWidgetMaps = await this.getFlatPageLayoutWidgetMaps(workspaceId);
        const existingWidget = this.getExistingWidgetOrThrow(id, existingFlatPageLayoutWidgetMaps);
        const [{ flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatFrontComponentMaps: existingFlatFrontComponentMaps, flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps, flatViewMaps: existingFlatViewMaps, flatPageLayoutTabMaps: existingFlatPageLayoutTabMaps }, { workspaceCustomFlatApplication }] = await Promise.all([
            this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatObjectMetadataMaps',
                    'flatFieldMetadataMaps',
                    'flatFrontComponentMaps',
                    'flatViewFieldGroupMaps',
                    'flatViewMaps',
                    'flatPageLayoutTabMaps'
                ]
            }),
            this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
                workspaceId
            })
        ]);
        const isConfigurationBeingUpdated = Object.prototype.hasOwnProperty.call(updateData, 'configuration');
        const processedUpdateData = isConfigurationBeingUpdated && (0, _utils.isDefined)(updateData.configuration) ? {
            ...updateData,
            configuration: await this.enrichRichTextConfigurationBody(updateData.configuration)
        } : updateData;
        const updatePageLayoutWidgetInput = {
            id,
            update: {
                ...processedUpdateData
            }
        };
        const flatPageLayoutWidgetToUpdate = (0, _fromupdatepagelayoutwidgetinputtoflatpagelayoutwidgettoupdateorthrowutil.fromUpdatePageLayoutWidgetInputToFlatPageLayoutWidgetToUpdateOrThrow)({
            updatePageLayoutWidgetInput,
            flatPageLayoutWidgetMaps: existingFlatPageLayoutWidgetMaps,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps,
            flatFieldMetadataMaps: existingFlatFieldMetadataMaps,
            flatFrontComponentMaps: existingFlatFrontComponentMaps,
            flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps,
            flatViewMaps: existingFlatViewMaps,
            flatPageLayoutTabMaps: existingFlatPageLayoutTabMaps,
            callerApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        const shouldValidateChartFields = isConfigurationBeingUpdated || Object.prototype.hasOwnProperty.call(updateData, 'objectMetadataId') || Object.prototype.hasOwnProperty.call(updateData, 'type');
        if (shouldValidateChartFields) {
            const isObjectMetadataIdBeingUpdated = Object.prototype.hasOwnProperty.call(updateData, 'objectMetadataId');
            const effectiveConfiguration = isConfigurationBeingUpdated ? processedUpdateData.configuration : existingWidget.configuration;
            const effectiveObjectMetadataId = isObjectMetadataIdBeingUpdated ? processedUpdateData.objectMetadataId : existingWidget.objectMetadataId;
            const effectiveWidgetTitle = processedUpdateData.title ?? existingWidget.title;
            if ((0, _utils.isDefined)(effectiveConfiguration)) {
                await this.validateChartFieldReferences({
                    configuration: effectiveConfiguration,
                    objectMetadataId: effectiveObjectMetadataId,
                    widgetTitle: effectiveWidgetTitle,
                    workspaceId
                });
            }
        }
        await this.validateAndRunWidgetMigration({
            workspaceId,
            operations: {
                flatEntityToCreate: [],
                flatEntityToUpdate: [
                    flatPageLayoutWidgetToUpdate
                ],
                flatEntityToDelete: []
            },
            errorMessage: 'Multiple validation errors occurred while updating page layout widget'
        });
        const recomputedMaps = await this.getFlatPageLayoutWidgetMaps(workspaceId);
        const updatedWidget = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedMaps
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByWidgetId({
            widgetId: id,
            workspaceId,
            updatedAt: new Date(updatedWidget.updatedAt)
        });
        return (0, _fromflatpagelayoutwidgettopagelayoutwidgetdtoutil.fromFlatPageLayoutWidgetToPageLayoutWidgetDto)(updatedWidget);
    }
    getExistingWidgetOrThrow(id, flatPageLayoutWidgetMaps) {
        const existingWidget = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatPageLayoutWidgetMaps
        });
        if (!(0, _utils.isDefined)(existingWidget) || (0, _utils.isDefined)(existingWidget.deletedAt)) {
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException((0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.PAGE_LAYOUT_WIDGET_NOT_FOUND, id), _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.PAGE_LAYOUT_WIDGET_NOT_FOUND);
        }
        return existingWidget;
    }
    async destroy({ id, workspaceId }) {
        const existingFlatPageLayoutWidgetMaps = await this.getFlatPageLayoutWidgetMaps(workspaceId);
        const flatPageLayoutWidgetToDestroy = (0, _fromdestroypagelayoutwidgetinputtoflatpagelayoutwidgetorthrowutil.fromDestroyPageLayoutWidgetInputToFlatPageLayoutWidgetOrThrow)({
            destroyPageLayoutWidgetInput: {
                id
            },
            flatPageLayoutWidgetMaps: existingFlatPageLayoutWidgetMaps
        });
        await this.validateAndRunWidgetMigration({
            workspaceId,
            operations: {
                flatEntityToCreate: [],
                flatEntityToUpdate: [],
                flatEntityToDelete: [
                    flatPageLayoutWidgetToDestroy
                ]
            },
            errorMessage: 'Multiple validation errors occurred while destroying page layout widget'
        });
        await this.dashboardSyncService.updateLinkedDashboardsUpdatedAtByWidgetId({
            widgetId: id,
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
PageLayoutWidgetService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _dashboardsyncservice.DashboardSyncService === "undefined" ? Object : _dashboardsyncservice.DashboardSyncService
    ])
], PageLayoutWidgetService);

//# sourceMappingURL=page-layout-widget.service.js.map