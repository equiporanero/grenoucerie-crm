"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateObjectPermissionActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateObjectPermissionActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _objectpermissionentity = require("../../../../../../metadata-modules/object-permission/object-permission.entity");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _resolveuniversalupdaterelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-update-relation-identifiers-to-ids.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateObjectPermissionActionHandlerService = class UpdateObjectPermissionActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'objectPermission') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatObjectPermission = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatObjectPermissionMaps,
            universalIdentifier: action.universalIdentifier
        });
        const update = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'objectPermission',
            universalUpdate: action.update,
            allFlatEntityMaps
        });
        return {
            type: 'update',
            metadataName: 'objectPermission',
            entityId: flatObjectPermission.id,
            update
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { entityId, update } = flatAction;
        const objectPermissionRepository = queryRunner.manager.getRepository(_objectpermissionentity.ObjectPermissionEntity);
        await objectPermissionRepository.update({
            id: entityId,
            workspaceId
        }, update);
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
    constructor(){
        super();
    }
};
UpdateObjectPermissionActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], UpdateObjectPermissionActionHandlerService);

//# sourceMappingURL=update-object-permission-action-handler.service.js.map