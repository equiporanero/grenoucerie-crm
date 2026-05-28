"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateLogicFunctionActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateLogicFunctionActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _filestorageservice = require("../../../../../../core-modules/file-storage/file-storage.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _logicfunctionentity = require("../../../../../../metadata-modules/logic-function/logic-function.entity");
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
let UpdateLogicFunctionActionHandlerService = class UpdateLogicFunctionActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'logicFunction') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatLogicFunction = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatLogicFunctionMaps,
            universalIdentifier: action.universalIdentifier
        });
        const update = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'logicFunction',
            universalUpdate: action.update,
            allFlatEntityMaps
        });
        return {
            type: 'update',
            metadataName: 'logicFunction',
            entityId: flatLogicFunction.id,
            update
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId, allFlatEntityMaps, flatApplication } = context;
        const { entityId, update } = flatAction;
        const existingLogicFunction = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatLogicFunctionMaps,
            flatEntityId: entityId
        });
        const applicationUniversalIdentifier = flatApplication.universalIdentifier;
        const builtPathChanged = (0, _utils.isDefined)(update.builtHandlerPath) && update.builtHandlerPath !== existingLogicFunction.builtHandlerPath;
        const logicFunctionRepository = queryRunner.manager.getRepository(_logicfunctionentity.LogicFunctionEntity);
        await logicFunctionRepository.update({
            id: entityId,
            workspaceId
        }, update);
        if (builtPathChanged) {
            await this.fileStorageService.deleteFile({
                workspaceId,
                applicationUniversalIdentifier,
                fileFolder: _types.FileFolder.BuiltLogicFunction,
                resourcePath: existingLogicFunction.builtHandlerPath
            });
        }
    }
    constructor(fileStorageService){
        super(), this.fileStorageService = fileStorageService;
    }
};
UpdateLogicFunctionActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService
    ])
], UpdateLogicFunctionActionHandlerService);

//# sourceMappingURL=update-logic-function-action-handler.service.js.map