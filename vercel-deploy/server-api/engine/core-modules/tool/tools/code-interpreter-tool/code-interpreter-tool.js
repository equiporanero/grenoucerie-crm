"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CodeInterpreterTool", {
    enumerable: true,
    get: function() {
        return CodeInterpreterTool;
    }
});
const _common = require("@nestjs/common");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _types = require("twenty-shared/types");
const _uuid = require("uuid");
const _applicationservice = require("../../../application/application.service");
const _authcontexttype = require("../../../auth/types/auth-context.type");
const _codeinterpreterservice = require("../../../code-interpreter/code-interpreter.service");
const _filestorageservice = require("../../../file-storage/file-storage.service");
const _fileurlservice = require("../../../file/file-url/file-url.service");
const _fileservice = require("../../../file/services/file.service");
const _jwtwrapperservice = require("../../../jwt/services/jwt-wrapper.service");
const _securehttpclientservice = require("../../../secure-http-client/secure-http-client.service");
const _codeinterpretertoolschema = require("./code-interpreter-tool.schema");
const _twentymcphelperconst = require("./twenty-mcp-helper.const");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _workspacetype = require("../../../workspace/types/workspace.type");
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
let CodeInterpreterTool = class CodeInterpreterTool {
    buildExecutionState(executionId, state, code, stdout, stderr, files, extras) {
        return {
            executionId,
            state,
            code,
            language: 'python',
            stdout,
            stderr,
            files,
            ...extras
        };
    }
    async execute(parameters, context) {
        const { workspaceId, userId, userWorkspaceId, onCodeExecutionUpdate } = context;
        const { code, files } = parameters;
        const executionId = (0, _uuid.v4)();
        const startTime = Date.now();
        let accumulatedStdout = '';
        let accumulatedStderr = '';
        const streamedFiles = [];
        onCodeExecutionUpdate?.(this.buildExecutionState(executionId, 'pending', code, '', '', []));
        try {
            const inputFiles = await this.downloadInputFiles(files, workspaceId);
            this.logger.log(`Executing code interpreter with ${inputFiles.length} input files`);
            onCodeExecutionUpdate?.(this.buildExecutionState(executionId, 'running', code, '', '', []));
            const serverUrl = this.twentyConfigService.get('SERVER_URL');
            const sessionToken = await this.generateSessionToken(workspaceId, userId, userWorkspaceId);
            this.logger.debug(`MCP session: workspaceId=${workspaceId}, userId=${userId}, userWorkspaceId=${userWorkspaceId}, serverUrl=${serverUrl}`);
            const codeWithHelper = _twentymcphelperconst.TWENTY_MCP_HELPER + '\n\n' + code;
            const result = await this.codeInterpreterService.execute(codeWithHelper, inputFiles, {
                env: {
                    TWENTY_SERVER_URL: serverUrl,
                    TWENTY_API_TOKEN: sessionToken
                }
            }, {
                onStdout: (line)=>{
                    accumulatedStdout += line + '\n';
                    onCodeExecutionUpdate?.(this.buildExecutionState(executionId, 'running', code, accumulatedStdout, accumulatedStderr, streamedFiles));
                },
                onStderr: (line)=>{
                    accumulatedStderr += line + '\n';
                    onCodeExecutionUpdate?.(this.buildExecutionState(executionId, 'running', code, accumulatedStdout, accumulatedStderr, streamedFiles));
                },
                onResult: async (outputFile)=>{
                    const uploadedFile = await this.uploadSingleFile(outputFile, workspaceId, executionId);
                    if (uploadedFile) {
                        streamedFiles.push(uploadedFile);
                        onCodeExecutionUpdate?.(this.buildExecutionState(executionId, 'running', code, accumulatedStdout, accumulatedStderr, streamedFiles));
                    }
                }
            });
            this.logger.debug(`Execution result: exitCode=${result.exitCode}, stdout length=${result.stdout.length}, stderr length=${result.stderr.length}`);
            const allOutputFileUrls = await this.uploadOutputFiles(result.files, workspaceId, executionId, streamedFiles);
            const executionTimeMs = Date.now() - startTime;
            const finalState = result.exitCode === 0 ? 'completed' : 'error';
            onCodeExecutionUpdate?.(this.buildExecutionState(executionId, finalState, code, result.stdout || accumulatedStdout, result.stderr || accumulatedStderr, allOutputFileUrls, {
                exitCode: result.exitCode,
                executionTimeMs,
                error: result.error
            }));
            const output = {
                success: result.exitCode === 0,
                message: result.exitCode === 0 ? 'Code executed successfully' : 'Code execution failed',
                stdout: result.stdout,
                stderr: result.stderr,
                exitCode: result.exitCode,
                files: allOutputFileUrls,
                error: result.error
            };
            return output;
        } catch (error) {
            this.logger.error('Code interpreter execution failed', error);
            const executionTimeMs = Date.now() - startTime;
            const errorMessage = error instanceof Error ? error.message : `Unexpected error: ${String(error)}`;
            onCodeExecutionUpdate?.(this.buildExecutionState(executionId, 'error', code, accumulatedStdout, accumulatedStderr, streamedFiles, {
                executionTimeMs,
                error: errorMessage
            }));
            return {
                success: false,
                message: 'Code interpreter execution failed',
                error: errorMessage
            };
        }
    }
    async downloadInputFiles(files, workspaceId) {
        if (!files || files.length === 0) {
            return [];
        }
        const inputFiles = [];
        for (const file of files){
            try {
                if (!workspaceId) {
                    this.logger.warn(`Cannot resolve file ${file.filename}: workspaceId is required`);
                    continue;
                }
                const fileContent = await this.fileService.getFileContentById({
                    fileId: file.fileId,
                    workspaceId,
                    fileFolder: _types.FileFolder.AgentChat
                });
                if (fileContent === null) {
                    this.logger.warn(`File ${file.filename} no longer available (id=${file.fileId})`);
                    continue;
                }
                inputFiles.push({
                    filename: file.filename,
                    content: fileContent.buffer,
                    mimeType: fileContent.mimeType
                });
            } catch (error) {
                this.logger.warn(`Failed to resolve file ${file.filename}`, error);
            }
        }
        return inputFiles;
    }
    async generateSessionToken(workspaceId, userId, userWorkspaceId) {
        const payload = {
            sub: userId ?? workspaceId,
            type: _authcontexttype.JwtTokenTypeEnum.ACCESS,
            workspaceId,
            userId: userId ?? workspaceId,
            userWorkspaceId: userWorkspaceId ?? workspaceId,
            authProvider: _workspacetype.AuthProviderEnum.Password
        };
        return this.jwtWrapperService.signAsyncOrThrow(payload, {
            expiresIn: '5m'
        });
    }
    async uploadSingleFile(file, workspaceId, executionId) {
        const sanitizedFilename = _path.default.basename(file.filename);
        try {
            const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
                workspaceId
            });
            const fileId = (0, _uuid.v4)();
            const resourcePath = `code-interpreter/${executionId}/${fileId}-${sanitizedFilename}`;
            const savedFile = await this.fileStorageService.writeFile({
                sourceFile: file.content,
                fileFolder: _types.FileFolder.AgentChat,
                applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
                workspaceId,
                resourcePath,
                fileId,
                settings: {
                    isTemporaryFile: false,
                    toDelete: false
                }
            });
            const signedUrl = await this.fileUrlService.signFileByIdUrl({
                fileId: savedFile.id,
                workspaceId,
                fileFolder: _types.FileFolder.AgentChat
            });
            return {
                fileId: savedFile.id,
                filename: sanitizedFilename,
                url: signedUrl,
                mimeType: file.mimeType
            };
        } catch (error) {
            this.logger.warn(`Failed to upload output file ${file.filename}`, error);
            return null;
        }
    }
    async uploadOutputFiles(files, workspaceId, executionId, alreadyUploadedFiles) {
        const outputFileUrls = [
            ...alreadyUploadedFiles
        ];
        const uploadedFilenames = new Set(alreadyUploadedFiles.map((uploadedFile)=>uploadedFile.filename));
        for (const file of files){
            const sanitizedFilename = _path.default.basename(file.filename);
            if (uploadedFilenames.has(sanitizedFilename)) {
                continue;
            }
            const uploadedFile = await this.uploadSingleFile(file, workspaceId, executionId);
            if (uploadedFile) {
                outputFileUrls.push(uploadedFile);
            }
        }
        return outputFileUrls;
    }
    constructor(codeInterpreterService, fileStorageService, fileService, fileUrlService, applicationService, secureHttpClientService, twentyConfigService, jwtWrapperService){
        this.codeInterpreterService = codeInterpreterService;
        this.fileStorageService = fileStorageService;
        this.fileService = fileService;
        this.fileUrlService = fileUrlService;
        this.applicationService = applicationService;
        this.secureHttpClientService = secureHttpClientService;
        this.twentyConfigService = twentyConfigService;
        this.jwtWrapperService = jwtWrapperService;
        this.logger = new _common.Logger(CodeInterpreterTool.name);
        this.description = 'Execute Python code in a sandboxed environment for data analysis, CSV processing, calculations, and chart generation. Returns stdout, stderr, and generated files. Input files are available at /home/user/{filename}. Save output files (charts, reports) to /home/user/output/ using plt.savefig() for matplotlib charts.';
        this.inputSchema = _codeinterpretertoolschema.CodeInterpreterInputZodSchema;
    }
};
CodeInterpreterTool = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _codeinterpreterservice.CodeInterpreterService === "undefined" ? Object : _codeinterpreterservice.CodeInterpreterService,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _fileservice.FileService === "undefined" ? Object : _fileservice.FileService,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService
    ])
], CodeInterpreterTool);

//# sourceMappingURL=code-interpreter-tool.js.map