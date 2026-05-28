"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateViewFilterGroupActionHandlerService", {
    enumerable: true,
    get: function() {
        return CreateViewFilterGroupActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _uuid = require("uuid");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../../../../universal-flat-entity/utils/reset-universal-flat-entity-foreign-key-aggregators.util");
const _resolveuniversalrelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-relation-identifiers-to-ids.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CreateViewFilterGroupActionHandlerService = class CreateViewFilterGroupActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('create', 'viewFilterGroup') {
    async transpileUniversalActionToFlatAction({ action, allFlatEntityMaps, flatApplication, workspaceId }) {
        const { parentViewFilterGroupId, viewId } = (0, _resolveuniversalrelationidentifierstoidsutil.resolveUniversalRelationIdentifiersToIds)({
            flatEntityMaps: allFlatEntityMaps,
            metadataName: action.metadataName,
            universalForeignKeyValues: action.flatEntity
        });
        const emptyUniversalForeignKeyAggregators = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.getUniversalFlatEntityEmptyForeignKeyAggregators)({
            metadataName: 'viewFilterGroup'
        });
        return {
            ...action,
            flatEntity: {
                ...action.flatEntity,
                parentViewFilterGroupId,
                viewId,
                id: action.id ?? (0, _uuid.v4)(),
                applicationId: flatApplication.id,
                workspaceId,
                childViewFilterGroupIds: [],
                viewFilterIds: [],
                ...emptyUniversalForeignKeyAggregators
            }
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner } = context;
        const { flatEntity } = flatAction;
        await this.insertFlatEntitiesInRepository({
            queryRunner,
            flatEntities: [
                flatEntity
            ]
        });
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
};
CreateViewFilterGroupActionHandlerService = _ts_decorate([
    (0, _common.Injectable)()
], CreateViewFilterGroupActionHandlerService);

//# sourceMappingURL=create-view-filter-group-action-handler.service.js.map