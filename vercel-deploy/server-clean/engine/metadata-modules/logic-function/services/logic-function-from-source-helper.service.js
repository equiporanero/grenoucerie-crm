"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionFromSourceHelperService", {
    enumerable: true,
    get: function() {
        return LogicFunctionFromSourceHelperService;
    }
});
const _common = require("@nestjs/common");
const _path = require("path");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _handlercontant = require("../constants/handler.contant");
const _findflatlogicfunctionorthrowutil = require("../utils/find-flat-logic-function-or-throw.util");
const _getlogicfunctionsubfolderforfromsource = require("../utils/get-logic-function-subfolder-for-from-source");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LogicFunctionFromSourceHelperService = class LogicFunctionFromSourceHelperService {
    async findLogicFunctionAndApplicationOrThrow({ id, workspaceId }) {
        const [{ flatLogicFunctionMaps }, { workspaceCustomFlatApplication }] = await Promise.all([
            this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatLogicFunctionMaps'
                ]
            }),
            this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
                workspaceId
            })
        ]);
        const flatLogicFunction = (0, _findflatlogicfunctionorthrowutil.findFlatLogicFunctionOrThrow)({
            id,
            flatLogicFunctionMaps
        });
        return {
            flatLogicFunction,
            ownerFlatApplication: workspaceCustomFlatApplication
        };
    }
    buildHandlerPaths(logicFunctionId) {
        const logicFunctionSubfolder = (0, _getlogicfunctionsubfolderforfromsource.getLogicFunctionSubfolderForFromSource)(logicFunctionId);
        return {
            sourceHandlerPath: (0, _path.join)(logicFunctionSubfolder, _handlercontant.DEFAULT_SOURCE_HANDLER_PATH),
            builtHandlerPath: (0, _path.join)(logicFunctionSubfolder, _handlercontant.DEFAULT_BUILT_HANDLER_PATH)
        };
    }
    async createOneFromMetadata({ universalFlatLogicFunctionToCreate, workspaceId }) {
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                logicFunction: {
                    flatEntityToCreate: [
                        universalFlatLogicFunctionToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: universalFlatLogicFunctionToCreate.applicationUniversalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating logic function');
        }
        return universalFlatLogicFunctionToCreate;
    }
    async updateOneFromMetadata({ flatLogicFunctionToUpdate, workspaceId, applicationUniversalIdentifier }) {
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                logicFunction: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatLogicFunctionToUpdate
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating logic function');
        }
        const { flatLogicFunctionMaps: recomputedFlatLogicFunctionMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatLogicFunctionMaps'
            ]
        });
        return (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatLogicFunctionToUpdate.id,
            flatEntityMaps: recomputedFlatLogicFunctionMaps
        });
    }
    constructor(applicationService, flatEntityMapsCacheService, workspaceMigrationValidateBuildAndRunService){
        this.applicationService = applicationService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
LogicFunctionFromSourceHelperService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], LogicFunctionFromSourceHelperService);

//# sourceMappingURL=logic-function-from-source-helper.service.js.map