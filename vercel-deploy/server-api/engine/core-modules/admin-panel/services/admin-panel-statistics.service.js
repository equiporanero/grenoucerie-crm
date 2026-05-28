"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelStatisticsService", {
    enumerable: true,
    get: function() {
        return AdminPanelStatisticsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _guards = require("@sniptt/guards");
const _typeorm1 = require("typeorm");
const _fileurlservice = require("../../file/file-url/file-url.service");
const _userentity = require("../../user/user.entity");
const _userservice = require("../../user/services/user.service");
const _workspaceentity = require("../../workspace/workspace.entity");
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
const RECENT_USERS_LIMIT = 10;
const TOP_WORKSPACES_LIMIT = 10;
let AdminPanelStatisticsService = class AdminPanelStatisticsService {
    async getRecentUsers(searchTerm) {
        const trimmedSearch = searchTerm?.trim();
        const queryBuilder = this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.userWorkspaces', 'userWorkspace', '"userWorkspace"."deletedAt" IS NULL').leftJoinAndSelect('userWorkspace.workspace', 'workspace', '"workspace"."deletedAt" IS NULL').where({
            deletedAt: (0, _typeorm1.IsNull)()
        }).orderBy('user.createdAt', 'DESC').addOrderBy('userWorkspace.createdAt', 'DESC').take(RECENT_USERS_LIMIT);
        if (trimmedSearch && trimmedSearch.length > 0) {
            const like = `%${trimmedSearch}%`;
            queryBuilder.andWhere(new _typeorm1.Brackets((qb)=>{
                qb.where({
                    email: (0, _typeorm1.ILike)(like)
                }).orWhere(`CONCAT("user"."firstName", ' ', "user"."lastName") ILIKE :like`, {
                    like
                }).orWhere('"user"."id"::text ILIKE :like', {
                    like
                });
            }));
        }
        const users = await queryBuilder.getMany();
        const signedAvatarUrlByUserId = await this.buildSignedAvatarUrlByUserId(users);
        return Promise.all(users.map(async (user)=>{
            const displayWorkspace = user.userWorkspaces[0]?.workspace;
            return {
                id: user.id,
                email: user.email,
                firstName: user.firstName ?? undefined,
                lastName: user.lastName ?? undefined,
                createdAt: user.createdAt,
                avatarUrl: signedAvatarUrlByUserId.get(user.id) ?? null,
                workspaceName: displayWorkspace?.displayName ?? null,
                workspaceId: displayWorkspace?.id ?? null,
                workspaceLogo: displayWorkspace ? await this.fileUrlService.signWorkspaceLogoUrl(displayWorkspace) : null
            };
        }));
    }
    async getTopWorkspaces(searchTerm) {
        const trimmedSearch = searchTerm?.trim();
        const queryBuilder = this.workspaceRepository.createQueryBuilder('workspace').leftJoin('workspace.workspaceUsers', 'userWorkspace', '"userWorkspace"."deletedAt" IS NULL').select('workspace.id', 'id').addSelect('workspace.displayName', 'name').addSelect('workspace.subdomain', 'subdomain').addSelect('workspace.logoFileId', 'logoFileId').addSelect('COUNT("userWorkspace"."id")::int', 'totalUsers').where({
            deletedAt: (0, _typeorm1.IsNull)()
        }).groupBy('workspace.id').orderBy('"totalUsers"', 'DESC').limit(TOP_WORKSPACES_LIMIT);
        if (trimmedSearch && trimmedSearch.length > 0) {
            const like = `%${trimmedSearch}%`;
            queryBuilder.andWhere(new _typeorm1.Brackets((qb)=>{
                qb.where('"workspace"."displayName" ILIKE :like', {
                    like
                }).orWhere('"workspace"."subdomain" ILIKE :like', {
                    like
                }).orWhere('"workspace"."id"::text ILIKE :like', {
                    like
                });
            }));
        }
        const rows = await queryBuilder.getRawMany();
        return Promise.all(rows.map(async (row)=>({
                id: row.id,
                logoUrl: await this.fileUrlService.signWorkspaceLogoUrl({
                    id: row.id,
                    logoFileId: row.logoFileId
                }),
                name: row.name ?? '',
                subdomain: row.subdomain ?? '',
                totalUsers: row.totalUsers
            })));
    }
    async buildSignedAvatarUrlByUserId(users) {
        const signedAvatarUrlByUserId = new Map();
        const contextsByWorkspaceId = new Map();
        for (const user of users){
            signedAvatarUrlByUserId.set(user.id, null);
            for (const userWorkspace of user.userWorkspaces){
                const workspace = userWorkspace.workspace;
                if (!workspace) {
                    continue;
                }
                const entry = contextsByWorkspaceId.get(workspace.id) ?? {
                    workspace,
                    fallbackAvatarUrlsByUserId: new Map()
                };
                entry.fallbackAvatarUrlsByUserId.set(user.id, userWorkspace.defaultAvatarUrl ?? null);
                contextsByWorkspaceId.set(workspace.id, entry);
            }
        }
        await Promise.all(Array.from(contextsByWorkspaceId.values()).map(async ({ workspace, fallbackAvatarUrlsByUserId })=>{
            const perWorkspaceSigned = await this.userService.loadSignedAvatarUrlsByUserId({
                workspace,
                fallbackAvatarUrlsByUserId
            });
            for (const [userId, signedUrl] of perWorkspaceSigned.entries()){
                const existing = signedAvatarUrlByUserId.get(userId);
                if (!(0, _guards.isNonEmptyString)(existing) && (0, _guards.isNonEmptyString)(signedUrl)) {
                    signedAvatarUrlByUserId.set(userId, signedUrl);
                }
            }
        }));
        return signedAvatarUrlByUserId;
    }
    constructor(fileUrlService, userService, userRepository, workspaceRepository){
        this.fileUrlService = fileUrlService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
    }
};
AdminPanelStatisticsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], AdminPanelStatisticsService);

//# sourceMappingURL=admin-panel-statistics.service.js.map