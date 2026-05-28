"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateLogicFunctionActionHandlerService", {
    enumerable: true,
    get: function() {
        return CreateLogicFunctionActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _uuid = require("uuid");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../../../../universal-flat-entity/utils/reset-universal-flat-entity-foreign-key-aggregators.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CreateLogicFunctionActionHandlerService = class CreateLogicFunctionActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('create', 'logicFunction') {
    async transpileUniversalActionToFlatAction({ action, flatApplication, workspaceId }) {
        const emptyUniversalForeignKeyAggregators = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.getUniversalFlatEntityEmptyForeignKeyAggregators)({
            metadataName: 'logicFunction'
        });
        return {
            ...action,
            flatEntity: {
                ...action.flatEntity,
                applicationId: flatApplication.id,
                id: action.id ?? (0, _uuid.v4)(),
                workspaceId,
                ...emptyUniversalForeignKeyAggregators
            }
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner } = context;
        const { flatEntity: logicFunction } = flatAction;
        await this.insertFlatEntitiesInRepository({
            queryRunner,
            flatEntities: [
                logicFunction
            ]
        });
    }
    async rollbackForMetadata(_context) {
        // Nothing to rollback for now
        return;
    }
};
CreateLogicFunctionActionHandlerService = _ts_decorate([
    (0, _common.Injectable)()
], CreateLogicFunctionActionHandlerService);

//# sourceMappingURL=create-logic-function-action-handler.service.js.map