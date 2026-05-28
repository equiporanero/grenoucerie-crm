"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateSSOConnectedAccountService", {
    enumerable: true,
    get: function() {
        return CreateSSOConnectedAccountService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../metadata-modules/connected-account/entities/connected-account.entity");
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
let CreateSSOConnectedAccountService = class CreateSSOConnectedAccountService {
    async createOrUpdateSSOConnectedAccount(params) {
        const { workspaceId, userId, handle, provider, scopes, oidcTokenClaims } = params;
        const userWorkspace = await this.userWorkspaceRepository.findOneBy({
            userId,
            workspaceId
        });
        if (!userWorkspace) {
            this.logger.warn(`Could not find userWorkspace for userId=${userId} workspaceId=${workspaceId}, skipping SSO connected account creation`);
            return;
        }
        const existing = await this.connectedAccountRepository.findOneBy({
            handle,
            provider,
            userWorkspaceId: userWorkspace.id,
            workspaceId
        });
        if (existing) {
            await this.connectedAccountRepository.update(existing.id, {
                lastSignedInAt: new Date(),
                provider,
                scopes,
                ...oidcTokenClaims !== undefined ? {
                    oidcTokenClaims: oidcTokenClaims
                } : {}
            });
            return;
        }
        await this.connectedAccountRepository.save({
            handle,
            provider,
            scopes,
            accessToken: null,
            refreshToken: null,
            lastSignedInAt: new Date(),
            userWorkspaceId: userWorkspace.id,
            workspaceId,
            ...oidcTokenClaims ? {
                oidcTokenClaims
            } : {}
        });
    }
    constructor(connectedAccountRepository, userWorkspaceRepository){
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.logger = new _common.Logger(CreateSSOConnectedAccountService.name);
    }
};
CreateSSOConnectedAccountService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CreateSSOConnectedAccountService);

//# sourceMappingURL=create-sso-connected-account.service.js.map