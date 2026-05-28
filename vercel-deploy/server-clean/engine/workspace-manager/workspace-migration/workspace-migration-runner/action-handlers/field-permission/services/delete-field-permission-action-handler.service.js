"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteFieldPermissionActionHandlerService", {
    enumerable: true,
    get: function() {
        return DeleteFieldPermissionActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _fieldpermissionentity = require("../../../../../../metadata-modules/object-permission/field-permission/field-permission.entity");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DeleteFieldPermissionActionHandlerService = class DeleteFieldPermissionActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('delete', 'fieldPermission') {
    async transpileUniversalActionToFlatAction(context) {
        return this.transpileUniversalDeleteActionToFlatDeleteAction(context);
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const fieldPermissionRepository = queryRunner.manager.getRepository(_fieldpermissionentity.FieldPermissionEntity);
        await fieldPermissionRepository.delete({
            id: flatAction.entityId,
            workspaceId
        });
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
};
DeleteFieldPermissionActionHandlerService = _ts_decorate([
    (0, _common.Injectable)()
], DeleteFieldPermissionActionHandlerService);

//# sourceMappingURL=delete-field-permission-action-handler.service.js.map