"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateFrontComponentActionHandlerService", {
    enumerable: true,
    get: function() {
        return CreateFrontComponentActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _filestorageservice = require("../../../../../../core-modules/file-storage/file-storage.service");
const _frontcomponentexception = require("../../../../../../metadata-modules/front-component/front-component.exception");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../../../../universal-flat-entity/utils/reset-universal-flat-entity-foreign-key-aggregators.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateFrontComponentActionHandlerService = class CreateFrontComponentActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('create', 'frontComponent') {
    async transpileUniversalActionToFlatAction({ action, flatApplication, workspaceId }) {
        const emptyUniversalForeignKeyAggregators = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.getUniversalFlatEntityEmptyForeignKeyAggregators)({
            metadataName: 'frontComponent'
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
        const { flatAction, queryRunner, workspaceId, flatApplication } = context;
        const { flatEntity: frontComponent } = flatAction;
        const applicationUniversalIdentifier = flatApplication.universalIdentifier;
        if ((0, _utils.isDefined)(frontComponent.builtComponentChecksum)) {
            await this.verifySourceAndBuiltFilesExist({
                workspaceId,
                applicationUniversalIdentifier,
                builtComponentPath: frontComponent.builtComponentPath
            });
        }
        await this.insertFlatEntitiesInRepository({
            queryRunner,
            flatEntities: [
                frontComponent
            ]
        });
    }
    async verifySourceAndBuiltFilesExist({ workspaceId, applicationUniversalIdentifier, builtComponentPath }) {
        const builtExists = await this.fileStorageService.checkFileExists({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.BuiltFrontComponent,
            resourcePath: builtComponentPath
        });
        if (!builtExists) {
            throw new _frontcomponentexception.FrontComponentException(`Front component built file missing before create (built: ${builtExists})`, _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_CREATE_FAILED);
        }
    }
    async executeForWorkspaceSchema(_context) {
        return;
    }
    constructor(fileStorageService){
        super(), this.fileStorageService = fileStorageService;
    }
};
CreateFrontComponentActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService
    ])
], CreateFrontComponentActionHandlerService);

//# sourceMappingURL=create-front-component-action-handler.service.js.map