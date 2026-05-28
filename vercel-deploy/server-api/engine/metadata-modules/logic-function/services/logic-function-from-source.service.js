"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionFromSourceService", {
    enumerable: true,
    get: function() {
        return LogicFunctionFromSourceService;
    }
});
const _common = require("@nestjs/common");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _uuid = require("uuid");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _logicfunctionexecutorservice = require("../../../core-modules/logic-function/logic-function-executor/logic-function-executor.service");
const _logicfunctionresourceservice = require("../../../core-modules/logic-function/logic-function-resource/logic-function-resource.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _logicfunctionexception = require("../logic-function.exception");
const _logicfunctionfromsourcehelperservice = require("./logic-function-from-source-helper.service");
const _builduniversalflatlogicfunctiontocreateutil = require("../utils/build-universal-flat-logic-function-to-create.util");
const _fromcreatelogicfunctionfromsourceinputtouniversalflatlogicfunctiontocreateutil = require("../utils/from-create-logic-function-from-source-input-to-universal-flat-logic-function-to-create.util");
const _fromflatlogicfunctiontologicfunctiondtoutil = require("../utils/from-flat-logic-function-to-logic-function-dto.util");
const _fromupdatelogicfunctionfromsourceinputtoflatlogicfunctiontoupdateutil = require("../utils/from-update-logic-function-from-source-input-to-flat-logic-function-to-update.util");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LogicFunctionFromSourceService = class LogicFunctionFromSourceService {
    async createOneFromSource({ input, workspaceId }) {
        const { workspaceCustomFlatApplication: ownerFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const logicFunctionId = input.id ?? (0, _uuid.v4)();
        const { sourceHandlerPath, builtHandlerPath } = this.helperService.buildHandlerPaths(logicFunctionId);
        if (input.source) {
            await this.logicFunctionResourceService.uploadSourceFile({
                sourceHandlerPath,
                sourceHandlerCode: input.source.sourceHandlerCode,
                applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier,
                workspaceId
            });
            const universalFlatLogicFunctionToCreate = (0, _fromcreatelogicfunctionfromsourceinputtouniversalflatlogicfunctiontocreateutil.fromCreateLogicFunctionFromSourceInputToUniversalFlatLogicFunctionToCreate)({
                createLogicFunctionFromSourceInput: {
                    ...input,
                    id: logicFunctionId
                },
                sourceHandlerPath,
                builtHandlerPath,
                handlerName: input.source.handlerName,
                checksum: null,
                isBuildUpToDate: false,
                applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier
            });
            await this.helperService.createOneFromMetadata({
                universalFlatLogicFunctionToCreate,
                workspaceId
            });
            return this.findFlatLogicFunctionByIdAndConvertToDto({
                id: universalFlatLogicFunctionToCreate.id,
                workspaceId
            });
        }
        const { handlerName, checksum } = await this.logicFunctionResourceService.seedSourceFiles({
            sourceHandlerPath,
            builtHandlerPath,
            workspaceId,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier
        });
        const universalFlatLogicFunctionToCreate = (0, _fromcreatelogicfunctionfromsourceinputtouniversalflatlogicfunctiontocreateutil.fromCreateLogicFunctionFromSourceInputToUniversalFlatLogicFunctionToCreate)({
            createLogicFunctionFromSourceInput: {
                ...input,
                id: logicFunctionId
            },
            sourceHandlerPath,
            builtHandlerPath,
            handlerName,
            checksum,
            isBuildUpToDate: true,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier
        });
        await this.helperService.createOneFromMetadata({
            universalFlatLogicFunctionToCreate,
            workspaceId
        });
        return this.findFlatLogicFunctionByIdAndConvertToDto({
            id: universalFlatLogicFunctionToCreate.id,
            workspaceId
        });
    }
    async duplicateOneWithSource({ existingLogicFunctionId, workspaceId }) {
        const { flatLogicFunction: existingLogicFunction, ownerFlatApplication } = await this.helperService.findLogicFunctionAndApplicationOrThrow({
            id: existingLogicFunctionId,
            workspaceId
        });
        const newId = (0, _uuid.v4)();
        const { sourceHandlerPath, builtHandlerPath } = existingLogicFunction;
        const toSourceHandlerPath = sourceHandlerPath.replace(existingLogicFunction.id, newId);
        const toBuiltHandlerPath = builtHandlerPath.replace(existingLogicFunction.id, newId);
        await this.logicFunctionResourceService.copyResources({
            fromSourceHandlerPath: sourceHandlerPath,
            toSourceHandlerPath,
            fromBuiltHandlerPath: builtHandlerPath,
            toBuiltHandlerPath,
            workspaceId,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier
        });
        const universalFlatLogicFunctionToCreate = (0, _builduniversalflatlogicfunctiontocreateutil.buildUniversalFlatLogicFunctionToCreate)({
            id: newId,
            name: existingLogicFunction.name,
            description: existingLogicFunction.description,
            timeoutSeconds: existingLogicFunction.timeoutSeconds,
            isBuildUpToDate: existingLogicFunction.isBuildUpToDate,
            checksum: existingLogicFunction.checksum,
            handlerName: existingLogicFunction.handlerName,
            sourceHandlerPath: toSourceHandlerPath,
            builtHandlerPath: toBuiltHandlerPath,
            cronTriggerSettings: existingLogicFunction.cronTriggerSettings,
            databaseEventTriggerSettings: existingLogicFunction.databaseEventTriggerSettings,
            httpRouteTriggerSettings: existingLogicFunction.httpRouteTriggerSettings,
            toolTriggerSettings: existingLogicFunction.toolTriggerSettings,
            workflowActionTriggerSettings: existingLogicFunction.workflowActionTriggerSettings,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier
        });
        const created = await this.helperService.createOneFromMetadata({
            universalFlatLogicFunctionToCreate,
            workspaceId
        });
        if (!(0, _utils.isDefined)(created)) {
            throw new _logicfunctionexception.LogicFunctionException('Failed to duplicate logic function', _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_NOT_FOUND);
        }
        return {
            id: created.id
        };
    }
    async updateOneFromSource({ updateLogicFunctionFromSourceInput, workspaceId }) {
        const { flatLogicFunction, ownerFlatApplication } = await this.helperService.findLogicFunctionAndApplicationOrThrow({
            id: updateLogicFunctionFromSourceInput.id,
            workspaceId
        });
        const sourceHandlerCode = updateLogicFunctionFromSourceInput.update.sourceHandlerCode;
        if (sourceHandlerCode) {
            await this.logicFunctionResourceService.uploadSourceFile({
                sourceHandlerPath: flatLogicFunction.sourceHandlerPath,
                sourceHandlerCode,
                applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier,
                workspaceId
            });
        }
        const flatLogicFunctionToUpdate = (0, _fromupdatelogicfunctionfromsourceinputtoflatlogicfunctiontoupdateutil.fromUpdateLogicFunctionFromSourceInputToFlatLogicFunctionToUpdate)({
            updateLogicFunctionFromSourceInput,
            existingFlatLogicFunction: flatLogicFunction
        });
        await this.helperService.updateOneFromMetadata({
            flatLogicFunctionToUpdate,
            workspaceId,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier
        });
    }
    async deleteOneWithSource({ id, workspaceId, isSystemBuild = false, ownerFlatApplication }) {
        const { flatLogicFunction: existingFlatLogicFunction, ownerFlatApplication: resolvedOwnerFlatApplication } = await this.helperService.findLogicFunctionAndApplicationOrThrow({
            id,
            workspaceId
        });
        const effectiveOwnerFlatApplication = ownerFlatApplication ?? resolvedOwnerFlatApplication;
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                logicFunction: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        existingFlatLogicFunction
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild,
            applicationUniversalIdentifier: effectiveOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying logic function');
        }
        return (0, _fromflatlogicfunctiontologicfunctiondtoutil.fromFlatLogicFunctionToLogicFunctionDto)({
            flatLogicFunction: existingFlatLogicFunction
        });
    }
    async buildOneFromSource({ id, workspaceId }) {
        const { flatLogicFunction, ownerFlatApplication } = await this.helperService.findLogicFunctionAndApplicationOrThrow({
            id,
            workspaceId
        });
        const sourceCode = await this.logicFunctionResourceService.getSourceFile({
            workspaceId,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier,
            sourceHandlerPath: flatLogicFunction.sourceHandlerPath
        });
        if (!sourceCode) {
            throw new _logicfunctionexception.LogicFunctionException('Source file not found', _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_NOT_FOUND);
        }
        const { builtCode } = await this.logicFunctionExecutorService.transpile({
            sourceCode,
            sourceFileName: flatLogicFunction.sourceHandlerPath,
            builtFileName: flatLogicFunction.builtHandlerPath
        });
        await this.logicFunctionResourceService.uploadBuiltFile({
            workspaceId,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier,
            builtHandlerPath: flatLogicFunction.builtHandlerPath,
            builtCode
        });
        const checksum = _crypto.default.createHash('md5').update(builtCode).digest('hex');
        await this.helperService.updateOneFromMetadata({
            flatLogicFunctionToUpdate: {
                ...flatLogicFunction,
                checksum,
                isBuildUpToDate: true,
                updatedAt: new Date().toISOString()
            },
            workspaceId,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier
        });
    }
    async executeOneFromSource({ id, payload, workspaceId }) {
        const { flatLogicFunction } = await this.helperService.findLogicFunctionAndApplicationOrThrow({
            id,
            workspaceId
        });
        if (!flatLogicFunction.isBuildUpToDate) {
            await this.buildOneFromSource({
                workspaceId,
                id
            });
        }
        const result = await this.logicFunctionExecutorService.execute({
            logicFunctionId: id,
            workspaceId,
            payload
        });
        return {
            data: result.data,
            logs: result.logs,
            duration: result.duration,
            status: result.status,
            error: result.error ? {
                errorType: result.error.errorType,
                errorMessage: result.error.errorMessage,
                stackTrace: Array.isArray(result.error.stackTrace) ? result.error.stackTrace.join('\n') : result.error.stackTrace
            } : undefined
        };
    }
    async getSourceCode({ id, workspaceId }) {
        const { flatLogicFunction, ownerFlatApplication } = await this.helperService.findLogicFunctionAndApplicationOrThrow({
            id,
            workspaceId
        });
        return this.logicFunctionResourceService.getSourceFile({
            workspaceId,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier,
            sourceHandlerPath: flatLogicFunction.sourceHandlerPath
        });
    }
    async findFlatLogicFunctionByIdAndConvertToDto({ id, workspaceId }) {
        const { flatLogicFunctionMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatLogicFunctionMaps'
            ]
        });
        return (0, _fromflatlogicfunctiontologicfunctiondtoutil.fromFlatLogicFunctionToLogicFunctionDto)({
            flatLogicFunction: (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: id,
                flatEntityMaps: flatLogicFunctionMaps
            })
        });
    }
    constructor(logicFunctionExecutorService, logicFunctionResourceService, applicationService, helperService, flatEntityMapsCacheService, workspaceMigrationValidateBuildAndRunService){
        this.logicFunctionExecutorService = logicFunctionExecutorService;
        this.logicFunctionResourceService = logicFunctionResourceService;
        this.applicationService = applicationService;
        this.helperService = helperService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
LogicFunctionFromSourceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionexecutorservice.LogicFunctionExecutorService === "undefined" ? Object : _logicfunctionexecutorservice.LogicFunctionExecutorService,
        typeof _logicfunctionresourceservice.LogicFunctionResourceService === "undefined" ? Object : _logicfunctionresourceservice.LogicFunctionResourceService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _logicfunctionfromsourcehelperservice.LogicFunctionFromSourceHelperService === "undefined" ? Object : _logicfunctionfromsourcehelperservice.LogicFunctionFromSourceHelperService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], LogicFunctionFromSourceService);

//# sourceMappingURL=logic-function-from-source.service.js.map