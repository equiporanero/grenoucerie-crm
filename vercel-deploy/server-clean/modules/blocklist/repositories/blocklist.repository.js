"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistRepository", {
    enumerable: true,
    get: function() {
        return BlocklistRepository;
    }
});
const _common = require("@nestjs/common");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _blocklistworkspaceentity = require("../standard-objects/blocklist.workspace-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BlocklistRepository = class BlocklistRepository {
    async getById(id, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const blockListRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _blocklistworkspaceentity.BlocklistWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            return blockListRepository.findOneBy({
                id
            });
        }, authContext);
    }
    async getByWorkspaceMemberId(workspaceMemberId, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const blockListRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _blocklistworkspaceentity.BlocklistWorkspaceEntity);
            return blockListRepository.find({
                where: {
                    workspaceMemberId
                }
            });
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
BlocklistRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], BlocklistRepository);

//# sourceMappingURL=blocklist.repository.js.map