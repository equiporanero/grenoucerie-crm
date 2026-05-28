"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateViewFieldActionHandlerService", {
    enumerable: true,
    get: function() {
        return CreateViewFieldActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _uuid = require("uuid");
const _utils = require("twenty-shared/utils");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../../../../universal-flat-entity/utils/reset-universal-flat-entity-foreign-key-aggregators.util");
const _resolveuniversalrelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-relation-identifiers-to-ids.util");
const _fromuniversaloverridestoviewfieldoverridesutil = require("./utils/from-universal-overrides-to-view-field-overrides.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateViewFieldActionHandlerService = class CreateViewFieldActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('create', 'viewField') {
    async transpileUniversalActionToFlatAction({ action, allFlatEntityMaps, flatApplication, workspaceId }) {
        const { fieldMetadataId, viewId, viewFieldGroupId } = (0, _resolveuniversalrelationidentifierstoidsutil.resolveUniversalRelationIdentifiersToIds)({
            flatEntityMaps: allFlatEntityMaps,
            metadataName: action.metadataName,
            universalForeignKeyValues: action.flatEntity
        });
        const overrides = (0, _utils.isDefined)(action.flatEntity.universalOverrides) ? (0, _fromuniversaloverridestoviewfieldoverridesutil.fromUniversalOverridesToViewFieldOverrides)({
            universalOverrides: action.flatEntity.universalOverrides,
            flatViewFieldGroupMaps: allFlatEntityMaps.flatViewFieldGroupMaps
        }) : null;
        const emptyUniversalForeignKeyAggregators = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.getUniversalFlatEntityEmptyForeignKeyAggregators)({
            metadataName: 'viewField'
        });
        return {
            ...action,
            flatEntity: {
                ...action.flatEntity,
                fieldMetadataId,
                viewId,
                viewFieldGroupId,
                overrides,
                id: action.id ?? (0, _uuid.v4)(),
                applicationId: flatApplication.id,
                workspaceId,
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
    constructor(){
        super();
    }
};
CreateViewFieldActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], CreateViewFieldActionHandlerService);

//# sourceMappingURL=create-view-field-action-handler.service.js.map