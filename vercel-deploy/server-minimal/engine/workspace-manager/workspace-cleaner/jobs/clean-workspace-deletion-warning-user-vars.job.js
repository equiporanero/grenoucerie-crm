"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CleanWorkspaceDeletionWarningUserVarsJob", {
    enumerable: true,
    get: function() {
        return CleanWorkspaceDeletionWarningUserVarsJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _typeorm1 = require("typeorm");
const _processdecorator = require("../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../core-modules/message-queue/message-queue.constants");
const _userservice = require("../../../core-modules/user/services/user.service");
const _uservarsservice = require("../../../core-modules/user/user-vars/services/user-vars.service");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _userworkspacedeletionwarningsentkeyconstant = require("../constants/user-workspace-deletion-warning-sent-key.constant");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let CleanWorkspaceDeletionWarningUserVarsJob = class CleanWorkspaceDeletionWarningUserVarsJob {
    async handle(data) {
        this.logger.log(`Job running...`);
        const { workspaceId } = data;
        try {
            const workspace = await this.workspaceRepository.findOneOrFail({
                where: {
                    id: workspaceId
                }
            });
            const workspaceMembers = await this.userService.loadWorkspaceMembers(workspace);
            const workspaceMembersChunks = (0, _lodashchunk.default)(workspaceMembers, 5);
            for (const workspaceMembersChunk of workspaceMembersChunks){
                await Promise.all(workspaceMembersChunk.map(async (workspaceMember)=>{
                    await this.userVarsService.delete({
                        userId: workspaceMember.userId,
                        workspaceId: workspace.id,
                        key: _userworkspacedeletionwarningsentkeyconstant.USER_WORKSPACE_DELETION_WARNING_SENT_KEY
                    });
                    this.logger.log(`Successfully cleaned user vars for ${workspaceMember.userId} user in ${workspace.id} workspace`);
                }));
            }
            this.logger.log(`Job done!`);
        } catch (error) {
            this.logger.error(`Failed to clean ${workspaceId} workspace users deletion warning user vars: ${error.message}`);
        }
    }
    constructor(userService, userVarsService, workspaceRepository){
        this.userService = userService;
        this.userVarsService = userVarsService;
        this.workspaceRepository = workspaceRepository;
        this.logger = new _common.Logger(CleanWorkspaceDeletionWarningUserVarsJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CleanWorkspaceDeletionWarningUserVarsJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CleanWorkspaceDeletionWarningUserVarsJobData === "undefined" ? Object : CleanWorkspaceDeletionWarningUserVarsJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], CleanWorkspaceDeletionWarningUserVarsJob.prototype, "handle", null);
CleanWorkspaceDeletionWarningUserVarsJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.workspaceQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _uservarsservice.UserVarsService === "undefined" ? Object : _uservarsservice.UserVarsService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CleanWorkspaceDeletionWarningUserVarsJob);

//# sourceMappingURL=clean-workspace-deletion-warning-user-vars.job.js.map