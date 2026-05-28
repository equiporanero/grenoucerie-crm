"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateSkillActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateSkillActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _skillentity = require("../../../../../../metadata-modules/skill/entities/skill.entity");
const _resolveuniversalupdaterelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-update-relation-identifiers-to-ids.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UpdateSkillActionHandlerService = class UpdateSkillActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'skill') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatSkill = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatSkillMaps,
            universalIdentifier: action.universalIdentifier
        });
        const update = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'skill',
            universalUpdate: action.update,
            allFlatEntityMaps
        });
        return {
            type: 'update',
            metadataName: 'skill',
            entityId: flatSkill.id,
            update
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { entityId, update } = flatAction;
        const skillRepository = queryRunner.manager.getRepository(_skillentity.SkillEntity);
        await skillRepository.update({
            id: entityId,
            workspaceId
        }, update);
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
};
UpdateSkillActionHandlerService = _ts_decorate([
    (0, _common.Injectable)()
], UpdateSkillActionHandlerService);

//# sourceMappingURL=update-skill-action-handler.service.js.map