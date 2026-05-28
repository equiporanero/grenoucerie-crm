/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteRowLevelPermissionPredicateActionHandlerService", {
    enumerable: true,
    get: function() {
        return DeleteRowLevelPermissionPredicateActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _rowlevelpermissionpredicateentity = require("../../../../../../metadata-modules/row-level-permission-predicate/entities/row-level-permission-predicate.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DeleteRowLevelPermissionPredicateActionHandlerService = class DeleteRowLevelPermissionPredicateActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('delete', 'rowLevelPermissionPredicate') {
    async transpileUniversalActionToFlatAction(context) {
        return this.transpileUniversalDeleteActionToFlatDeleteAction(context);
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const repository = queryRunner.manager.getRepository(_rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity);
        await repository.delete({
            id: flatAction.entityId,
            workspaceId
        });
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
};
DeleteRowLevelPermissionPredicateActionHandlerService = _ts_decorate([
    (0, _common.Injectable)()
], DeleteRowLevelPermissionPredicateActionHandlerService);

//# sourceMappingURL=delete-row-level-permission-predicate-action-handler.service.js.map