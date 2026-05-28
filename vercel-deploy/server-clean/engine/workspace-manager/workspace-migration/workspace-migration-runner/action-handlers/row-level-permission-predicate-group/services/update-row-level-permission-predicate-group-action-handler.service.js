/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateRowLevelPermissionPredicateGroupActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateRowLevelPermissionPredicateGroupActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _rowlevelpermissionpredicategroupentity = require("../../../../../../metadata-modules/row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
const _resolveuniversalupdaterelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-update-relation-identifiers-to-ids.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UpdateRowLevelPermissionPredicateGroupActionHandlerService = class UpdateRowLevelPermissionPredicateGroupActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'rowLevelPermissionPredicateGroup') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatRowLevelPermissionPredicateGroup = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatRowLevelPermissionPredicateGroupMaps,
            universalIdentifier: action.universalIdentifier
        });
        const update = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'rowLevelPermissionPredicateGroup',
            universalUpdate: action.update,
            allFlatEntityMaps
        });
        return {
            type: 'update',
            metadataName: 'rowLevelPermissionPredicateGroup',
            entityId: flatRowLevelPermissionPredicateGroup.id,
            update
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { entityId, update } = flatAction;
        const repository = queryRunner.manager.getRepository(_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity);
        await repository.update({
            id: entityId,
            workspaceId
        }, update);
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
};
UpdateRowLevelPermissionPredicateGroupActionHandlerService = _ts_decorate([
    (0, _common.Injectable)()
], UpdateRowLevelPermissionPredicateGroupActionHandlerService);

//# sourceMappingURL=update-row-level-permission-predicate-group-action-handler.service.js.map