"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatWorkspaceMemberMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatWorkspaceMemberMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceFlatWorkspaceMemberMapCacheService = class WorkspaceFlatWorkspaceMemberMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const flatWorkspaceMemberMaps = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            const flatWorkspaceMemberMaps = {
                byId: {},
                idByUserId: {}
            };
            const workspaceMembers = await workspaceMemberRepository.find({
                withDeleted: true
            });
            for (const workspaceMember of workspaceMembers){
                flatWorkspaceMemberMaps.byId[workspaceMember.id] = workspaceMember;
                flatWorkspaceMemberMaps.idByUserId[workspaceMember.userId] = workspaceMember.id;
            }
            return flatWorkspaceMemberMaps;
        }, (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId));
        return flatWorkspaceMemberMaps;
    }
    constructor(globalWorkspaceOrmManager){
        super(), this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
WorkspaceFlatWorkspaceMemberMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatWorkspaceMemberMaps', {
        localDataOnly: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], WorkspaceFlatWorkspaceMemberMapCacheService);

//# sourceMappingURL=workspace-flat-workspace-member-map-cache.service.js.map