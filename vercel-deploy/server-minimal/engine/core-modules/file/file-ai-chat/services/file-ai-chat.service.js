"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileAiChatService", {
    enumerable: true,
    get: function() {
        return FileAiChatService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _uuid = require("uuid");
const _applicationservice = require("../../../application/application.service");
const _filestorageservice = require("../../../file-storage/file-storage.service");
const _fileurlservice = require("../../file-url/file-url.service");
const _extractfileinfoorthrowutils = require("../../utils/extract-file-info-or-throw.utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FileAiChatService = class FileAiChatService {
    async uploadFile({ file, filename, workspaceId }) {
        const { ext } = await (0, _extractfileinfoorthrowutils.extractFileInfoOrThrow)({
            file,
            filename
        });
        const fileId = (0, _uuid.v4)();
        const name = `${fileId}${(0, _guards.isNonEmptyString)(ext) ? `.${ext}` : ''}`;
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const savedFile = await this.fileStorageService.writeFile({
            sourceFile: file,
            resourcePath: name,
            fileFolder: _types.FileFolder.AgentChat,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            workspaceId,
            fileId,
            settings: {
                isTemporaryFile: false,
                toDelete: false
            }
        });
        return {
            ...savedFile,
            url: await this.fileUrlService.signFileByIdUrl({
                fileId,
                workspaceId,
                fileFolder: _types.FileFolder.AgentChat
            })
        };
    }
    constructor(fileStorageService, applicationService, fileUrlService){
        this.fileStorageService = fileStorageService;
        this.applicationService = applicationService;
        this.fileUrlService = fileUrlService;
    }
};
FileAiChatService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService
    ])
], FileAiChatService);

//# sourceMappingURL=file-ai-chat.service.js.map