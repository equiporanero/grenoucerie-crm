"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateConnectedAccountService", {
    enumerable: true,
    get: function() {
        return CreateConnectedAccountService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionservice = require("../../../metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _ormworkspacecontextstorage = require("../../../twenty-orm/storage/orm-workspace-context.storage");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
const _resolverolepermissionconfigutil = require("../../../twenty-orm/utils/resolve-role-permission-config.util");
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
let CreateConnectedAccountService = class CreateConnectedAccountService {
    async createConnectedAccount(input) {
        const { workspaceId, connectedAccountId, handle, provider, accessToken, refreshToken, accountOwnerId, scopes } = input;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceContext = (0, _ormworkspacecontextstorage.getWorkspaceContext)();
            const rolePermissionConfig = (0, _resolverolepermissionconfigutil.resolveRolePermissionConfig)({
                authContext,
                userWorkspaceRoleMap: workspaceContext.userWorkspaceRoleMap,
                apiKeyRoleMap: workspaceContext.apiKeyRoleMap
            });
            const workspaceMemberRepo = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', rolePermissionConfig ?? undefined);
            const member = await workspaceMemberRepo.findOne({
                where: {
                    id: accountOwnerId
                }
            });
            if (!member) {
                throw new Error(`Workspace member not found for accountOwnerId ${accountOwnerId}`);
            }
            const userWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    userId: member.userId,
                    workspaceId
                }
            });
            if (!userWorkspace) {
                throw new Error(`User workspace not found for user ${member.userId} in workspace ${workspaceId}`);
            }
            const userWorkspaceId = userWorkspace.id;
            const { encryptedAccessToken, encryptedRefreshToken } = this.connectedAccountTokenEncryptionService.encryptTokenPair({
                accessToken,
                refreshToken,
                workspaceId
            });
            await input.transactionManager.getRepository(_connectedaccountentity.ConnectedAccountEntity).save({
                id: connectedAccountId,
                handle,
                provider,
                accessToken: encryptedAccessToken,
                refreshToken: encryptedRefreshToken,
                userWorkspaceId,
                scopes,
                workspaceId
            });
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, connectedAccountTokenEncryptionService, userWorkspaceRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
CreateConnectedAccountService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CreateConnectedAccountService);

//# sourceMappingURL=create-connected-account.service.js.map