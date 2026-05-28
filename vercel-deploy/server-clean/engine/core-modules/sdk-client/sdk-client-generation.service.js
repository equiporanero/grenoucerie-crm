"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SdkClientGenerationService", {
    enumerable: true,
    get: function() {
        return SdkClientGenerationService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _promises = /*#__PURE__*/ _interop_require_wildcard(require("node:fs/promises"));
const _graphql = require("graphql");
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
const _generate = require("twenty-client-sdk/generate");
const _types = require("twenty-shared/types");
const _typeorm1 = require("typeorm");
const _workspaceschemafactory = require("../../api/graphql/workspace-schema.factory");
const _applicationentity = require("../application/application.entity");
const _applicationservice = require("../application/application.service");
const _filestorageservice = require("../file-storage/file-storage.service");
const _createzipfile = require("../logic-function/logic-function-drivers/utils/create-zip-file");
const _temporarydirmanager = require("../logic-function/logic-function-drivers/utils/temporary-dir-manager");
const _messagequeuedecorator = require("../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../message-queue/message-queue.constants");
const _messagequeueservice = require("../message-queue/services/message-queue.service");
const _sdkclientpackagedirname = require("./constants/sdk-client-package-dirname");
const _sdkclientexception = require("./exceptions/sdk-client.exception");
const _generatesdkclientjobconstants = require("./jobs/generate-sdk-client.job-constants");
const _fromworkspaceentitytoflatutil = require("../workspace/utils/from-workspace-entity-to-flat.util");
const _workspaceentity = require("../workspace/workspace.entity");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const SDK_CLIENT_ARCHIVE_NAME = 'twenty-client-sdk.zip';
const SDK_CLIENT_GENERATION_RETRY_LIMIT = 3;
let SdkClientGenerationService = class SdkClientGenerationService {
    async enqueueSdkClientGenerationForWorkspace(workspaceId) {
        const { twentyStandardFlatApplication, workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        await Promise.all([
            twentyStandardFlatApplication,
            workspaceCustomFlatApplication
        ].map((application)=>this.messageQueueService.add(_generatesdkclientjobconstants.GENERATE_SDK_CLIENT_JOB_NAME, {
                workspaceId,
                applicationId: application.id,
                applicationUniversalIdentifier: application.universalIdentifier
            }, {
                id: `sdk-client:${workspaceId}:${application.id}`,
                retryLimit: SDK_CLIENT_GENERATION_RETRY_LIMIT
            })));
    }
    async generateSdkClientForApplication({ workspaceId, applicationId, applicationUniversalIdentifier }) {
        const workspaceEntity = await this.workspaceRepository.findOneByOrFail({
            id: workspaceId
        });
        const graphqlSchema = await this.workspaceSchemaFactory.createGraphQLSchema((0, _fromworkspaceentitytoflatutil.fromWorkspaceEntityToFlat)(workspaceEntity), applicationId);
        const archiveBuffer = await this.generateAndStore({
            workspaceId,
            applicationId,
            applicationUniversalIdentifier,
            schema: (0, _graphql.printSchema)(graphqlSchema)
        });
        this.logger.log(`Generated SDK client for application ${applicationUniversalIdentifier}`);
        return archiveBuffer;
    }
    async generateAndStore({ workspaceId, applicationId, applicationUniversalIdentifier, schema }) {
        const temporaryDirManager = new _temporarydirmanager.TemporaryDirManager();
        try {
            const { sourceTemporaryDir } = await temporaryDirManager.init();
            const tempPackageRoot = (0, _path.join)(sourceTemporaryDir, 'twenty-client-sdk');
            await _promises.cp(_sdkclientpackagedirname.SDK_CLIENT_PACKAGE_DIRNAME, tempPackageRoot, {
                recursive: true,
                filter: (source)=>{
                    const relativePath = _path.default.relative(_sdkclientpackagedirname.SDK_CLIENT_PACKAGE_DIRNAME, source);
                    return !relativePath.includes('node_modules') && !relativePath.startsWith('src');
                }
            });
            await (0, _generate.replaceCoreClient)({
                packageRoot: tempPackageRoot,
                schema
            });
            const archivePath = (0, _path.join)(sourceTemporaryDir, SDK_CLIENT_ARCHIVE_NAME);
            await (0, _createzipfile.createZipFile)(tempPackageRoot, archivePath);
            const archiveBuffer = await _promises.readFile(archivePath);
            await this.fileStorageService.writeFile({
                workspaceId,
                applicationUniversalIdentifier,
                fileFolder: _types.FileFolder.GeneratedSdkClient,
                resourcePath: SDK_CLIENT_ARCHIVE_NAME,
                sourceFile: archiveBuffer,
                settings: {
                    isTemporaryFile: false,
                    toDelete: false
                }
            });
            await this.applicationRepository.update({
                id: applicationId,
                workspaceId
            }, {
                isSdkLayerStale: true
            });
            await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
                'flatApplicationMaps'
            ]);
            return archiveBuffer;
        } catch (error) {
            throw new _sdkclientexception.SdkClientException(`Failed to generate SDK client for application "${applicationUniversalIdentifier}" in workspace "${workspaceId}": ${error instanceof Error ? error.message : String(error)}`, _sdkclientexception.SdkClientExceptionCode.GENERATION_FAILED);
        } finally{
            await temporaryDirManager.clean();
        }
    }
    constructor(fileStorageService, applicationRepository, workspaceRepository, workspaceCacheService, workspaceSchemaFactory, applicationService, messageQueueService){
        this.fileStorageService = fileStorageService;
        this.applicationRepository = applicationRepository;
        this.workspaceRepository = workspaceRepository;
        this.workspaceCacheService = workspaceCacheService;
        this.workspaceSchemaFactory = workspaceSchemaFactory;
        this.applicationService = applicationService;
        this.messageQueueService = messageQueueService;
        this.logger = new _common.Logger(SdkClientGenerationService.name);
    }
};
SdkClientGenerationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(6, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workspaceQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspaceschemafactory.WorkspaceSchemaFactory === "undefined" ? Object : _workspaceschemafactory.WorkspaceSchemaFactory,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], SdkClientGenerationService);

//# sourceMappingURL=sdk-client-generation.service.js.map