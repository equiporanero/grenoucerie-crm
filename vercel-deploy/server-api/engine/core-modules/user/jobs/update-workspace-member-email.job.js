"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateWorkspaceMemberEmailJob", {
    enumerable: true,
    get: function() {
        return UpdateWorkspaceMemberEmailJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _userworkspaceservice = require("../../user-workspace/user-workspace.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateWorkspaceMemberEmailJob = class UpdateWorkspaceMemberEmailJob {
    async handle({ userId, email }) {
        const workspace = await this.userWorkspaceService.findFirstWorkspaceByUserId(userId);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspace.id);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            await workspaceMemberRepository.update({
                userId
            }, {
                userEmail: email
            });
        }, authContext);
    }
    constructor(userWorkspaceService, globalWorkspaceOrmManager){
        this.userWorkspaceService = userWorkspaceService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logger = new _common.Logger(UpdateWorkspaceMemberEmailJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(UpdateWorkspaceMemberEmailJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof UpdateWorkspaceMemberEmailJobData === "undefined" ? Object : UpdateWorkspaceMemberEmailJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], UpdateWorkspaceMemberEmailJob.prototype, "handle", null);
UpdateWorkspaceMemberEmailJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.workspaceQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], UpdateWorkspaceMemberEmailJob);

//# sourceMappingURL=update-workspace-member-email.job.js.map