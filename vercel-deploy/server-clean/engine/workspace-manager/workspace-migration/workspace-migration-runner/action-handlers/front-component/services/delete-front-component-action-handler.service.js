"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteFrontComponentActionHandlerService", {
    enumerable: true,
    get: function() {
        return DeleteFrontComponentActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _frontcomponententity = require("../../../../../../metadata-modules/front-component/entities/front-component.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeleteFrontComponentActionHandlerService = class DeleteFrontComponentActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('delete', 'frontComponent') {
    async transpileUniversalActionToFlatAction(context) {
        return this.transpileUniversalDeleteActionToFlatDeleteAction(context);
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const frontComponentRepository = queryRunner.manager.getRepository(_frontcomponententity.FrontComponentEntity);
        await frontComponentRepository.delete({
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
DeleteFrontComponentActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], DeleteFrontComponentActionHandlerService);

//# sourceMappingURL=delete-front-component-action-handler.service.js.map