"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtAuthGuard", {
    enumerable: true,
    get: function() {
        return JwtAuthGuard;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _accesstokenservice = require("../core-modules/auth/token/services/access-token.service");
const _binddatatorequestobjectutil = require("../utils/bind-data-to-request-object.util");
const _workspacecachestorageservice = require("../workspace-cache-storage/workspace-cache-storage.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let JwtAuthGuard = class JwtAuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            const data = await this.accessTokenService.validateTokenByRequest(request);
            const metadataVersion = data.workspace ? await this.workspaceStorageCacheService.getMetadataVersion(data.workspace.id) : undefined;
            if (!(0, _utils.isDefined)(data.apiKey) && !(0, _utils.isDefined)(data.userWorkspaceId) && !(0, _utils.isDefined)(data.application)) {
                this.logger.warn(`Auth failed: no apiKey, userWorkspaceId, or application in context`);
                return false;
            }
            (0, _binddatatorequestobjectutil.bindDataToRequestObject)(data, request, metadataVersion);
            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.warn(`Auth failed: ${errorMessage}`);
            return false;
        }
    }
    constructor(accessTokenService, workspaceStorageCacheService){
        this.accessTokenService = accessTokenService;
        this.workspaceStorageCacheService = workspaceStorageCacheService;
        this.logger = new _common.Logger(JwtAuthGuard.name);
    }
};
JwtAuthGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _accesstokenservice.AccessTokenService === "undefined" ? Object : _accesstokenservice.AccessTokenService,
        typeof _workspacecachestorageservice.WorkspaceCacheStorageService === "undefined" ? Object : _workspacecachestorageservice.WorkspaceCacheStorageService
    ])
], JwtAuthGuard);

//# sourceMappingURL=jwt-auth.guard.js.map