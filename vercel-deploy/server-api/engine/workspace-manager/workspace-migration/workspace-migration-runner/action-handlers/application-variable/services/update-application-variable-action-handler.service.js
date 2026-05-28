"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateApplicationVariableActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateApplicationVariableActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _applicationvariableentity = require("../../../../../../core-modules/application/application-variable/application-variable.entity");
const _secretencryptionservice = require("../../../../../../core-modules/secret-encryption/secret-encryption.service");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
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
let UpdateApplicationVariableActionHandlerService = class UpdateApplicationVariableActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'applicationVariable') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatApplicationVariable = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatApplicationVariableMaps,
            universalIdentifier: action.universalIdentifier
        });
        const update = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'applicationVariable',
            universalUpdate: action.update,
            allFlatEntityMaps
        });
        return {
            type: 'update',
            metadataName: 'applicationVariable',
            entityId: flatApplicationVariable.id,
            update
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { entityId, update } = flatAction;
        const applicationVariableRepository = queryRunner.manager.getRepository(_applicationvariableentity.ApplicationVariableEntity);
        const existing = await applicationVariableRepository.findOne({
            where: {
                id: entityId,
                workspaceId
            }
        });
        if (update.isSecret !== undefined && update.isSecret && existing && !existing.isSecret) {
            update.value = this.secretEncryptionService.encryptVersioned(existing.value, {
                workspaceId
            });
        }
        if (update.isSecret !== undefined && !update.isSecret && existing && existing.isSecret) {
            update.value = this.secretEncryptionService.decryptVersioned(existing.value, {
                workspaceId
            });
        }
        await applicationVariableRepository.update({
            id: entityId,
            workspaceId
        }, update);
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
    constructor(secretEncryptionService){
        super(), this.secretEncryptionService = secretEncryptionService;
    }
};
UpdateApplicationVariableActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], UpdateApplicationVariableActionHandlerService);

//# sourceMappingURL=update-application-variable-action-handler.service.js.map