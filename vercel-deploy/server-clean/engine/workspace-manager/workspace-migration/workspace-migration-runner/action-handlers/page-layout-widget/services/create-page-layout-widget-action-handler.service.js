"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreatePageLayoutWidgetActionHandlerService", {
    enumerable: true,
    get: function() {
        return CreatePageLayoutWidgetActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../../../../universal-flat-entity/utils/reset-universal-flat-entity-foreign-key-aggregators.util");
const _resolveuniversalrelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-relation-identifiers-to-ids.util");
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
let CreatePageLayoutWidgetActionHandlerService = class CreatePageLayoutWidgetActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('create', 'pageLayoutWidget') {
    async transpileUniversalActionToFlatAction({ action, allFlatEntityMaps, flatApplication, workspaceId }) {
        const { pageLayoutTabId, objectMetadataId } = (0, _resolveuniversalrelationidentifierstoidsutil.resolveUniversalRelationIdentifiersToIds)({
            flatEntityMaps: allFlatEntityMaps,
            metadataName: action.metadataName,
            universalForeignKeyValues: action.flatEntity
        });
        const configuration = (0, _fromuniversalconfigurationtoflatpagelayoutwidgetconfigurationutil.fromUniversalConfigurationToFlatPageLayoutWidgetConfiguration)({
            universalConfiguration: action.flatEntity.universalConfiguration,
            flatFieldMetadataMaps: allFlatEntityMaps.flatFieldMetadataMaps,
            flatFrontComponentMaps: allFlatEntityMaps.flatFrontComponentMaps,
            flatViewMaps: allFlatEntityMaps.flatViewMaps,
            flatViewFieldGroupMaps: allFlatEntityMaps.flatViewFieldGroupMaps
        });
        const overrides = (0, _utils.isDefined)(action.flatEntity.universalOverrides) ? (0, _fromuniversaloverridestopagelayoutwidgetoverridesutil.fromUniversalOverridesToPageLayoutWidgetOverrides)({
            universalOverrides: action.flatEntity.universalOverrides,
            flatPageLayoutTabMaps: allFlatEntityMaps.flatPageLayoutTabMaps
        }) : null;
        const emptyUniversalForeignKeyAggregators = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.getUniversalFlatEntityEmptyForeignKeyAggregators)({
            metadataName: 'pageLayoutWidget'
        });
        return {
            ...action,
            flatEntity: {
                ...action.flatEntity,
                configuration,
                overrides,
                pageLayoutTabId,
                objectMetadataId,
                applicationId: flatApplication.id,
                id: action.id ?? (0, _uuid.v4)(),
                workspaceId,
                ...emptyUniversalForeignKeyAggregators
            }
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner } = context;
        const { flatEntity } = flatAction;
        await this.insertFlatEntitiesInRepository({
            queryRunner,
            flatEntities: [
                flatEntity
            ]
        });
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
    constructor(){
        super();
    }
};
CreatePageLayoutWidgetActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], CreatePageLayoutWidgetActionHandlerService);

//# sourceMappingURL=create-page-layout-widget-action-handler.service.js.map