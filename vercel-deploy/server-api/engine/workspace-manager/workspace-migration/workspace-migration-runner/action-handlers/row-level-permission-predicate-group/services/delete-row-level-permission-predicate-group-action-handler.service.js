/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteRowLevelPermissionPredicateGroupActionHandlerService", {
    enumerable: true,
    get: function() {
        return DeleteRowLevelPermissionPredicateGroupActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _rowlevelpermissionpredicategroupentity = require("../../../../../../metadata-modules/row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DeleteRowLevelPermissionPredicateGroupActionHandlerService = class DeleteRowLevelPermissionPredicateGroupActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('delete', 'rowLevelPermissionPredicateGroup') {
    async transpileUniversalActionToFlatAction(context) {
        return this.transpileUniversalDeleteActionToFlatDeleteAction(context);
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const repository = queryRunner.manager.getRepository(_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity);
        await repository.delete({
            id: flatAction.entityId,
            workspaceId
        });
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
};
DeleteRowLevelPermissionPredicateGroupActionHandlerService = _ts_decorate([
    (0, _common.Injectable)()
], DeleteRowLevelPermissionPredicateGroupActionHandlerService);

//# sourceMappingURL=delete-row-level-permission-predicate-group-action-handler.service.js.map