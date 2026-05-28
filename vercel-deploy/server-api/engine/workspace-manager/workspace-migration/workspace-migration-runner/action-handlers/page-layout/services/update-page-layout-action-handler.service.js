"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdatePageLayoutActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdatePageLayoutActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _flatentitymapsexception = require("../../../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findflatentitybyuniversalidentifierutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _pagelayoutentity = require("../../../../../../metadata-modules/page-layout/entities/page-layout.entity");
const _resolveuniversalupdaterelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-update-relation-identifiers-to-ids.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UpdatePageLayoutActionHandlerService = class UpdatePageLayoutActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'pageLayout') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatPageLayout = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatPageLayoutMaps,
            universalIdentifier: action.universalIdentifier
        });
        const { defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier, ...restUpdate } = action.update;
        const transpiledUpdate = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'pageLayout',
            universalUpdate: restUpdate,
            allFlatEntityMaps
        });
        if ((0, _utils.isDefined)(defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier)) {
            const flatPageLayoutTab = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                flatEntityMaps: allFlatEntityMaps.flatPageLayoutTabMaps,
                universalIdentifier: defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier
            });
            if (!(0, _utils.isDefined)(flatPageLayoutTab)) {
                throw new _flatentitymapsexception.FlatEntityMapsException(`Could not resolve defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier to defaultTabToFocusOnMobileAndSidePanelId: no pageLayoutTab found for universal identifier ${defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
            }
            transpiledUpdate.defaultTabToFocusOnMobileAndSidePanelId = flatPageLayoutTab.id;
        }
        return {
            type: 'update',
            metadataName: 'pageLayout',
            entityId: flatPageLayout.id,
            update: transpiledUpdate
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { entityId, update } = flatAction;
        const pageLayoutRepository = queryRunner.manager.getRepository(_pagelayoutentity.PageLayoutEntity);
        await pageLayoutRepository.update({
            id: entityId,
            workspaceId
        }, update);
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
};
UpdatePageLayoutActionHandlerService = _ts_decorate([
    (0, _common.Injectable)()
], UpdatePageLayoutActionHandlerService);

//# sourceMappingURL=update-page-layout-action-handler.service.js.map