"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteWorkspaceMemberConnectedAccountsCleanupJob", {
    enumerable: true,
    get: function() {
        return DeleteWorkspaceMemberConnectedAccountsCleanupJob;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _processdecorator = require("../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../engine/core-modules/message-queue/message-queue.constants");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
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
let DeleteWorkspaceMemberConnectedAccountsCleanupJob = class DeleteWorkspaceMemberConnectedAccountsCleanupJob {
    async handle(data) {
        const { workspaceId, workspaceMemberId } = data;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepo = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            const member = await workspaceMemberRepo.findOne({
                where: {
                    id: workspaceMemberId
                }
            });
            if (!member) {
                return;
            }
            const userWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    userId: member.userId,
                    workspaceId
                }
            });
            if (!userWorkspace) {
                return;
            }
            await this.connectedAccountRepository.delete({
                userWorkspaceId: userWorkspace.id,
                workspaceId
            });
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, connectedAccountRepository, userWorkspaceRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(DeleteWorkspaceMemberConnectedAccountsCleanupJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof DeleteWorkspaceMemberConnectedAccountsCleanupJobData === "undefined" ? Object : DeleteWorkspaceMemberConnectedAccountsCleanupJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], DeleteWorkspaceMemberConnectedAccountsCleanupJob.prototype, "handle", null);
DeleteWorkspaceMemberConnectedAccountsCleanupJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.deleteCascadeQueue),
    _ts_param(1, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository
    ])
], DeleteWorkspaceMemberConnectedAccountsCleanupJob);

//# sourceMappingURL=delete-workspace-member-connected-accounts.job.js.map