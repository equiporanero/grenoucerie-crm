"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateCommandMenuItemActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateCommandMenuItemActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _commandmenuitementity = require("../../../../../../metadata-modules/command-menu-item/entities/command-menu-item.entity");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _resolveuniversalupdaterelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-update-relation-identifiers-to-ids.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UpdateCommandMenuItemActionHandlerService = class UpdateCommandMenuItemActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'commandMenuItem') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatCommandMenuItem = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatCommandMenuItemMaps,
            universalIdentifier: action.universalIdentifier
        });
        const update = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'commandMenuItem',
            universalUpdate: action.update,
            allFlatEntityMaps
        });
        return {
            type: 'update',
            metadataName: 'commandMenuItem',
            entityId: flatCommandMenuItem.id,
            update
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { entityId, update } = flatAction;
        const commandMenuItemRepository = queryRunner.manager.getRepository(_commandmenuitementity.CommandMenuItemEntity);
        await commandMenuItemRepository.update({
            id: entityId,
            workspaceId
        }, update);
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
};
UpdateCommandMenuItemActionHandlerService = _ts_decorate([
    (0, _common.Injectable)()
], UpdateCommandMenuItemActionHandlerService);

//# sourceMappingURL=update-command-menu-item-action-handler.service.js.map