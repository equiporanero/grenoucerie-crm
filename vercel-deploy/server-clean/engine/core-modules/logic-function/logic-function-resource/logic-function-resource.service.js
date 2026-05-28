"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionResourceService", {
    enumerable: true,
    get: function() {
        return LogicFunctionResourceService;
    }
});
const _common = require("@nestjs/common");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _fs = require("fs");
const _path = require("path");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _filestorageexception = require("../../file-storage/interfaces/file-storage-exception");
const _filestorageservice = require("../../file-storage/file-storage.service");
const _getlogicfunctionseedprojectfilesutil = require("./utils/get-logic-function-seed-project-files.util");
const _logicfunctionexception = require("../../../metadata-modules/logic-function/logic-function.exception");
const _streamtobuffer = require("../../../../utils/stream-to-buffer");
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
let LogicFunctionResourceService = class LogicFunctionResourceService {
    async seedSourceFiles({ workspaceId, applicationUniversalIdentifier, sourceHandlerPath, builtHandlerPath }) {
        const seedProjectFiles = await (0, _getlogicfunctionseedprojectfilesutil.getLogicFunctionSeedProjectFiles)();
        const sourceFiles = seedProjectFiles.filter((file)=>file.name.endsWith('index.ts'));
        const builtFiles = seedProjectFiles.filter((file)=>file.name.endsWith('.mjs'));
        if (sourceFiles.length !== 1 || builtFiles.length !== 1) {
            throw new _logicfunctionexception.LogicFunctionException('Logic function seed project should have one index.ts file and one index.mjs file', _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_INVALID_SEED_PROJECT);
        }
        const sourceFile = sourceFiles[0];
        const builtFile = builtFiles[0];
        await this.fileStorageService.writeFile({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.Source,
            resourcePath: sourceHandlerPath,
            sourceFile: sourceFile.content,
            settings: {
                isTemporaryFile: false,
                toDelete: false
            }
        });
        await this.fileStorageService.writeFile({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.BuiltLogicFunction,
            resourcePath: builtHandlerPath,
            sourceFile: builtFile.content,
            settings: {
                isTemporaryFile: false,
                toDelete: false
            }
        });
        const checksum = _crypto.default.createHash('md5').update(builtFile.content).digest('hex');
        return {
            handlerName: 'main',
            checksum
        };
    }
    async uploadSourceFile({ sourceHandlerPath, workspaceId, applicationUniversalIdentifier, sourceHandlerCode, queryRunner }) {
        await this.fileStorageService.writeFile({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.Source,
            resourcePath: sourceHandlerPath,
            sourceFile: sourceHandlerCode,
            settings: {
                isTemporaryFile: false,
                toDelete: false
            },
            queryRunner
        });
    }
    async deleteSourceFile({ sourceHandlerPath, workspaceId, applicationUniversalIdentifier }) {
        await this.fileStorageService.deleteFile({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.Source,
            resourcePath: sourceHandlerPath
        });
    }
    async uploadBuiltFile({ workspaceId, applicationUniversalIdentifier, builtHandlerPath, builtCode }) {
        await this.fileStorageService.writeFile({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.BuiltLogicFunction,
            resourcePath: builtHandlerPath,
            sourceFile: builtCode,
            settings: {
                isTemporaryFile: false,
                toDelete: false
            }
        });
    }
    async getSourceFile({ sourceHandlerPath, workspaceId, applicationUniversalIdentifier }) {
        try {
            return (await (0, _streamtobuffer.streamToBuffer)(await this.fileStorageService.readFile({
                workspaceId,
                applicationUniversalIdentifier,
                fileFolder: _types.FileFolder.Source,
                resourcePath: sourceHandlerPath
            }))).toString('utf-8');
        } catch (error) {
            if ((0, _utils.isDefined)(error) && typeof error === 'object' && 'code' in error && error.code === _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND) {
                return null;
            }
            throw error;
        }
    }
    async copyResources({ fromSourceHandlerPath, toSourceHandlerPath, fromBuiltHandlerPath, toBuiltHandlerPath, workspaceId, applicationUniversalIdentifier }) {
        await this.fileStorageService.copy({
            from: {
                workspaceId,
                applicationUniversalIdentifier,
                fileFolder: _types.FileFolder.Source,
                resourcePath: fromSourceHandlerPath
            },
            to: {
                workspaceId,
                applicationUniversalIdentifier,
                fileFolder: _types.FileFolder.Source,
                resourcePath: toSourceHandlerPath
            }
        });
        await this.fileStorageService.copy({
            from: {
                workspaceId,
                applicationUniversalIdentifier,
                fileFolder: _types.FileFolder.BuiltLogicFunction,
                resourcePath: fromBuiltHandlerPath
            },
            to: {
                workspaceId,
                applicationUniversalIdentifier,
                fileFolder: _types.FileFolder.BuiltLogicFunction,
                resourcePath: toBuiltHandlerPath
            }
        });
    }
    async copyDependenciesInMemory({ applicationUniversalIdentifier, workspaceId, inMemoryFolderPath }) {
        const yarnLockExists = await this.fileStorageService.checkFileExists({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.Dependencies,
            resourcePath: 'yarn.lock'
        });
        const promises = [];
        promises.push(this.fileStorageService.downloadFile({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.Dependencies,
            resourcePath: 'package.json',
            localPath: (0, _path.join)(inMemoryFolderPath, 'package.json')
        }));
        if (yarnLockExists) {
            promises.push(this.fileStorageService.downloadFile({
                workspaceId,
                applicationUniversalIdentifier,
                fileFolder: _types.FileFolder.Dependencies,
                resourcePath: 'yarn.lock',
                localPath: (0, _path.join)(inMemoryFolderPath, 'yarn.lock')
            }));
        } else {
            const yarnLockPath = (0, _path.join)(inMemoryFolderPath, 'yarn.lock');
            promises.push(_fs.promises.mkdir((0, _path.dirname)(yarnLockPath), {
                recursive: true
            }).then(()=>_fs.promises.writeFile(yarnLockPath, `# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1
`, 'utf-8')));
        }
        await Promise.all(promises);
    }
    async getBuiltCode({ builtHandlerPath, workspaceId, applicationUniversalIdentifier }) {
        return (await (0, _streamtobuffer.streamToBuffer)(await this.fileStorageService.readFile({
            workspaceId: workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.BuiltLogicFunction,
            resourcePath: builtHandlerPath
        }))).toString('utf-8');
    }
    async copyBuiltCodeInMemory({ builtHandlerPath, workspaceId, applicationUniversalIdentifier, inMemoryDestinationPath }) {
        const localPath = (0, _path.join)(inMemoryDestinationPath, builtHandlerPath);
        await this.fileStorageService.downloadFile({
            workspaceId,
            applicationUniversalIdentifier,
            fileFolder: _types.FileFolder.BuiltLogicFunction,
            resourcePath: builtHandlerPath,
            localPath
        });
        return localPath;
    }
    constructor(fileStorageService){
        this.fileStorageService = fileStorageService;
    }
};
LogicFunctionResourceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService
    ])
], LogicFunctionResourceService);

//# sourceMappingURL=logic-function-resource.service.js.map