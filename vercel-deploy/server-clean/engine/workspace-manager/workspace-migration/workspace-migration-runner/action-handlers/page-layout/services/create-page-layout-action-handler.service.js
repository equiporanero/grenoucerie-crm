"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreatePageLayoutActionHandlerService", {
    enumerable: true,
    get: function() {
        return CreatePageLayoutActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _flatentitymapsexception = require("../../../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../../../../universal-flat-entity/utils/reset-universal-flat-entity-foreign-key-aggregators.util");
const _resolveuniversalrelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-relation-identifiers-to-ids.util");
const _findpagelayouttabidincreatepagelayoutcontextutil = require("./utils/find-page-layout-tab-id-in-create-page-layout-context.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreatePageLayoutActionHandlerService = class CreatePageLayoutActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('create', 'pageLayout') {
    async transpileUniversalActionToFlatAction({ action, allFlatEntityMaps, flatApplication, workspaceId }) {
        const { objectMetadataId } = (0, _resolveuniversalrelationidentifierstoidsutil.resolveUniversalRelationIdentifiersToIds)({
            flatEntityMaps: allFlatEntityMaps,
            metadataName: 'pageLayout',
            universalForeignKeyValues: {
                objectMetadataUniversalIdentifier: action.flatEntity.objectMetadataUniversalIdentifier
            }
        });
        let defaultTabToFocusOnMobileAndSidePanelId = null;
        const defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier = action.flatEntity.defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier;
        if ((0, _utils.isDefined)(defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier)) {
            defaultTabToFocusOnMobileAndSidePanelId = (0, _findpagelayouttabidincreatepagelayoutcontextutil.findPageLayoutTabIdInCreatePageLayoutContext)({
                universalIdentifier: defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier,
                tabIdByUniversalIdentifier: action.tabIdByUniversalIdentifier,
                flatPageLayoutTabMaps: allFlatEntityMaps.flatPageLayoutTabMaps
            });
            if (!(0, _utils.isDefined)(defaultTabToFocusOnMobileAndSidePanelId)) {
                throw new _flatentitymapsexception.FlatEntityMapsException(`Could not resolve defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier to defaultTabToFocusOnMobileAndSidePanelId: no pageLayoutTab found for universal identifier ${defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
            }
        }
        const emptyUniversalForeignKeyAggregators = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.getUniversalFlatEntityEmptyForeignKeyAggregators)({
            metadataName: 'pageLayout'
        });
        return {
            ...action,
            flatEntity: {
                ...action.flatEntity,
                objectMetadataId,
                defaultTabToFocusOnMobileAndSidePanelId,
                applicationId: flatApplication.id,
                id: action.id ?? (0, _uuid.v4)(),
                workspaceId,
                tabIds: [],
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
CreatePageLayoutActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], CreatePageLayoutActionHandlerService);

//# sourceMappingURL=create-page-layout-action-handler.service.js.map