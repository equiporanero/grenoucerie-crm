"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceUserWorkspaceRoleMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceUserWorkspaceRoleMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _roletargetentity = require("../role-target.entity");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let WorkspaceUserWorkspaceRoleMapCacheService = class WorkspaceUserWorkspaceRoleMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const roleTargetsMap = await this.roleTargetRepository.find({
            where: {
                workspaceId,
                userWorkspaceId: (0, _typeorm1.Not)((0, _typeorm1.IsNull)())
            }
        });
        return roleTargetsMap.reduce((acc, roleTarget)=>{
            if ((0, _utils.isDefined)(roleTarget.userWorkspaceId)) {
                acc[roleTarget.userWorkspaceId] = roleTarget.roleId;
            }
            return acc;
        }, {});
    }
    constructor(roleTargetRepository){
        super(), this.roleTargetRepository = roleTargetRepository;
    }
};
WorkspaceUserWorkspaceRoleMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('userWorkspaceRoleMap'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_roletargetentity.RoleTargetEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceUserWorkspaceRoleMapCacheService);

//# sourceMappingURL=workspace-user-workspace-role-map-cache.service.js.map