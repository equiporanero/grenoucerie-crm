"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get FileByIdGuard () {
        return FileByIdGuard;
    },
    get SUPPORTED_FILE_FOLDERS () {
        return SUPPORTED_FILE_FOLDERS;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _filefolderinterface = require("../interfaces/file-folder.interface");
const _jwtwrapperservice = require("../../jwt/services/jwt-wrapper.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const SUPPORTED_FILE_FOLDERS = [
    _types.FileFolder.CorePicture,
    _types.FileFolder.FilesField,
    _types.FileFolder.Workflow,
    _types.FileFolder.AgentChat,
    _types.FileFolder.EmailAttachment,
    _types.FileFolder.AppTarball
];
let FileByIdGuard = class FileByIdGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const fileId = request.params.id;
        const fileFolder = request.params.fileFolder;
        const fileToken = request.query.token;
        if (!this.isSupportedFileFolder(fileFolder)) {
            return false;
        }
        if (!fileToken) {
            return false;
        }
        try {
            const payload = await this.jwtWrapperService.verifyJwtToken(fileToken, {
                ignoreExpiration: _filefolderinterface.fileFolderConfigs[fileFolder].ignoreExpirationToken
            });
            if (!payload.workspaceId) {
                return false;
            }
        } catch  {
            return false;
        }
        const decodedPayload = this.jwtWrapperService.decode(fileToken, {
            json: true
        });
        request.workspaceId = decodedPayload.workspaceId;
        if (decodedPayload.fileId !== fileId) {
            return false;
        }
        return true;
    }
    isSupportedFileFolder(fileFolder) {
        return SUPPORTED_FILE_FOLDERS.includes(fileFolder);
    }
    constructor(jwtWrapperService){
        this.jwtWrapperService = jwtWrapperService;
    }
};
FileByIdGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService
    ])
], FileByIdGuard);

//# sourceMappingURL=file-by-id.guard.js.map