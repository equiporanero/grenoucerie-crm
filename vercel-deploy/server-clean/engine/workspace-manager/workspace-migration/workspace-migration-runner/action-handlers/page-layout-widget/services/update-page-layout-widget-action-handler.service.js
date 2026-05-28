"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdatePageLayoutWidgetActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdatePageLayoutWidgetActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _pagelayoutwidgetentity = require("../../../../../../metadata-modules/page-layout-widget/entities/page-layout-widget.entity");
const _resolveuniversalupdaterelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-update-relation-identifiers-to-ids.util");
const _fromuniversalconfigurationtoflatpagelayoutwidgetconfigurationutil = require("./utils/from-universal-configuration-to-flat-page-layout-widget-configuration.util");
const _fromuniversaloverridestopagelayoutwidgetoverridesutil = require("./utils/from-universal-overrides-to-page-layout-widget-overrides.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdatePageLayoutWidgetActionHandlerService = class UpdatePageLayoutWidgetActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'pageLayoutWidget') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatPageLayoutWidget = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatPageLayoutWidgetMaps,
            universalIdentifier: action.universalIdentifier
        });
        const { universalConfiguration, universalOverrides, ...updateWithResolvedForeignKeys } = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'pageLayoutWidget',
            universalUpdate: action.update,
            allFlatEntityMaps
        });
        const updateWithConfiguration = universalConfiguration === undefined ? updateWithResolvedForeignKeys : {
            ...updateWithResolvedForeignKeys,
            configuration: (0, _fromuniversalconfigurationtoflatpagelayoutwidgetconfigurationutil.fromUniversalConfigurationToFlatPageLayoutWidgetConfiguration)({
                universalConfiguration,
                flatFieldMetadataMaps: allFlatEntityMaps.flatFieldMetadataMaps,
                flatFrontComponentMaps: allFlatEntityMaps.flatFrontComponentMaps,
                flatViewMaps: allFlatEntityMaps.flatViewMaps,
                flatViewFieldGroupMaps: allFlatEntityMaps.flatViewFieldGroupMaps
            })
        };
        const update = universalOverrides === undefined ? updateWithConfiguration : universalOverrides === null ? {
            ...updateWithConfiguration,
            overrides: null
        } : {
            ...updateWithConfiguration,
            overrides: (0, _fromuniversaloverridestopagelayoutwidgetoverridesutil.fromUniversalOverridesToPageLayoutWidgetOverrides)({
                universalOverrides,
                flatPageLayoutTabMaps: allFlatEntityMaps.flatPageLayoutTabMaps
            })
        };
        return {
            type: 'update',
            metadataName: 'pageLayoutWidget',
            entityId: flatPageLayoutWidget.id,
            update
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { entityId, update } = flatAction;
        const pageLayoutWidgetRepository = queryRunner.manager.getRepository(_pagelayoutwidgetentity.PageLayoutWidgetEntity);
        await pageLayoutWidgetRepository.update({
            id: entityId,
            workspaceId
        }, update);
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
    constructor(){
        super();
    }
};
UpdatePageLayoutWidgetActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], UpdatePageLayoutWidgetActionHandlerService);

//# sourceMappingURL=update-page-layout-widget-action-handler.service.js.map