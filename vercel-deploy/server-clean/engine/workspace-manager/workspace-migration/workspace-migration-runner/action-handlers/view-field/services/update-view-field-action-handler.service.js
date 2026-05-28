"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateViewFieldActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateViewFieldActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _viewfieldentity = require("../../../../../../metadata-modules/view-field/entities/view-field.entity");
const _resolveuniversalupdaterelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-update-relation-identifiers-to-ids.util");
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
let UpdateViewFieldActionHandlerService = class UpdateViewFieldActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'viewField') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatViewField = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatViewFieldMaps,
            universalIdentifier: action.universalIdentifier
        });
        const { universalOverrides, ...updateWithResolvedForeignKeys } = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'viewField',
            universalUpdate: action.update,
            allFlatEntityMaps
        });
        const update = universalOverrides === undefined ? updateWithResolvedForeignKeys : universalOverrides === null ? {
            ...updateWithResolvedForeignKeys,
            overrides: null
        } : {
            ...updateWithResolvedForeignKeys,
            overrides: (0, _fromuniversaloverridestoviewfieldoverridesutil.fromUniversalOverridesToViewFieldOverrides)({
                universalOverrides,
                flatViewFieldGroupMaps: allFlatEntityMaps.flatViewFieldGroupMaps
            })
        };
        return {
            type: 'update',
            metadataName: 'viewField',
            entityId: flatViewField.id,
            update
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { entityId, update } = flatAction;
        const viewFieldRepository = queryRunner.manager.getRepository(_viewfieldentity.ViewFieldEntity);
        await viewFieldRepository.update({
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
UpdateViewFieldActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], UpdateViewFieldActionHandlerService);

//# sourceMappingURL=update-view-field-action-handler.service.js.map