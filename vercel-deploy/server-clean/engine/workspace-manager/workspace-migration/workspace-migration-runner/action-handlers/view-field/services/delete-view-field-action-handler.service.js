"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteViewFieldActionHandlerService", {
    enumerable: true,
    get: function() {
        return DeleteViewFieldActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _viewfieldentity = require("../../../../../../metadata-modules/view-field/entities/view-field.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeleteViewFieldActionHandlerService = class DeleteViewFieldActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('delete', 'viewField') {
    async transpileUniversalActionToFlatAction(context) {
        return this.transpileUniversalDeleteActionToFlatDeleteAction(context);
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const viewFieldRepository = queryRunner.manager.getRepository(_viewfieldentity.ViewFieldEntity);
        await viewFieldRepository.delete({
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
DeleteViewFieldActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], DeleteViewFieldActionHandlerService);

//# sourceMappingURL=delete-view-field-action-handler.service.js.map