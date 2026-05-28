"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteRolePermissionFlagActionHandlerService", {
    enumerable: true,
    get: function() {
        return DeleteRolePermissionFlagActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _rolepermissionflagentity = require("../../../../../../metadata-modules/role-permission-flag/role-permission-flag.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeleteRolePermissionFlagActionHandlerService = class DeleteRolePermissionFlagActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('delete', 'rolePermissionFlag') {
    async transpileUniversalActionToFlatAction(context) {
        return this.transpileUniversalDeleteActionToFlatDeleteAction(context);
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const rolePermissionFlagRepository = queryRunner.manager.getRepository(_rolepermissionflagentity.RolePermissionFlagEntity);
        await rolePermissionFlagRepository.delete({
            id: flatAction.entityId,
            workspaceId
        });
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
    constructor(){
        super();
    }
};
DeleteRolePermissionFlagActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], DeleteRolePermissionFlagActionHandlerService);

//# sourceMappingURL=delete-role-permission-flag-action-handler.service.js.map