"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileUrlService", {
    enumerable: true,
    get: function() {
        return FileUrlService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _authcontexttype = require("../../auth/types/auth-context.type");
const _jwtwrapperservice = require("../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FileUrlService = class FileUrlService {
    async signWorkspaceLogoUrl(workspace) {
        if (!(0, _utils.isDefined)(workspace.logoFileId)) {
            return null;
        }
        return this.signFileByIdUrl({
            fileId: workspace.logoFileId,
            workspaceId: workspace.id,
            fileFolder: _types.FileFolder.CorePicture
        });
    }
    async signFileByIdUrl({ fileId, workspaceId, fileFolder }) {
        const fileTokenExpiresIn = this.twentyConfigService.get('FILE_TOKEN_EXPIRES_IN');
        const payload = {
            workspaceId,
            fileId,
            sub: workspaceId,
            type: _authcontexttype.JwtTokenTypeEnum.FILE
        };
        const token = await this.jwtWrapperService.signAsyncOrThrow(payload, {
            expiresIn: fileTokenExpiresIn
        });
        const serverUrl = this.twentyConfigService.get('SERVER_URL');
        return `${serverUrl}/file/${fileFolder}/${fileId}?token=${token}`;
    }
    getLegacyWorkspaceMemberAvatarUrl({ fileId, fileFolder }) {
        const serverUrl = this.twentyConfigService.get('SERVER_URL');
        return `${serverUrl}/file/${fileFolder}/${fileId}`;
    }
    constructor(jwtWrapperService, twentyConfigService){
        this.jwtWrapperService = jwtWrapperService;
        this.twentyConfigService = twentyConfigService;
    }
};
FileUrlService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], FileUrlService);

//# sourceMappingURL=file-url.service.js.map