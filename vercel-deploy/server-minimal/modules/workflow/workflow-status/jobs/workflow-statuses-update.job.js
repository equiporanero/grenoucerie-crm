"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get WorkflowStatusesUpdateJob () {
        return WorkflowStatusesUpdateJob;
    },
    get WorkflowVersionEventType () {
        return WorkflowVersionEventType;
    }
});
const _common = require("@nestjs/common");
const _lodashisequal = /*#__PURE__*/ _interop_require_default(require("lodash.isequal"));
const _typeorm = require("typeorm");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowversionworkspaceentity = require("../../common/standard-objects/workflow-version.workspace-entity");
const _workflowworkspaceentity = require("../../common/standard-objects/workflow.workspace-entity");
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
var WorkflowVersionEventType = /*#__PURE__*/ function(WorkflowVersionEventType) {
    WorkflowVersionEventType["CREATE"] = "CREATE";
    WorkflowVersionEventType["STATUS_UPDATE"] = "STATUS_UPDATE";
    WorkflowVersionEventType["DELETE"] = "DELETE";
    return WorkflowVersionEventType;
}({});
let WorkflowStatusesUpdateJob = class WorkflowStatusesUpdateJob {
    async handle(event) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(event.workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            switch(event.type){
                case "CREATE":
                case "DELETE":
                    await Promise.all(event.workflowIds.map((workflowId)=>this.handleWorkflowVersionCreatedOrDeleted({
                            workflowId,
                            workspaceId: event.workspaceId
                        })));
                    break;
                case "STATUS_UPDATE":
                    await Promise.all(event.statusUpdates.map((statusUpdate)=>this.handleWorkflowVersionStatusUpdated({
                            statusUpdate,
                            workspaceId: event.workspaceId
                        })));
                    break;
                default:
                    break;
            }
        }, authContext);
    }
    async handleWorkflowVersionCreatedOrDeleted({ workflowId, workspaceId }) {
        const workflowRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflow', {
            shouldBypassPermissionChecks: true
        });
        const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
            shouldBypassPermissionChecks: true
        });
        const newWorkflowStatuses = await this.getWorkflowStatuses({
            workflowId,
            workflowVersionRepository
        });
        const previousWorkflow = await workflowRepository.findOneOrFail({
            where: {
                id: workflowId
            },
            withDeleted: true
        });
        if ((0, _lodashisequal.default)(newWorkflowStatuses, previousWorkflow.statuses)) {
            return;
        }
        await workflowRepository.update({
            id: workflowId
        }, {
            statuses: newWorkflowStatuses
        });
    }
    async handleWorkflowVersionStatusUpdated({ statusUpdate, workspaceId }) {
        const workflowRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflow', {
            shouldBypassPermissionChecks: true
        });
        const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
            shouldBypassPermissionChecks: true
        });
        const workflow = await workflowRepository.findOneOrFail({
            where: {
                id: statusUpdate.workflowId
            }
        });
        const newWorkflowStatuses = await this.getWorkflowStatuses({
            workflowId: statusUpdate.workflowId,
            workflowVersionRepository
        });
        if ((0, _lodashisequal.default)(newWorkflowStatuses, workflow.statuses)) {
            return;
        }
        await workflowRepository.update({
            id: statusUpdate.workflowId
        }, {
            statuses: newWorkflowStatuses
        });
    }
    async getWorkflowStatuses({ workflowId, workflowVersionRepository }) {
        const statuses = [];
        const workflowVersions = await workflowVersionRepository.find({
            where: {
                workflowId,
                status: (0, _typeorm.In)([
                    _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE,
                    _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT,
                    _workflowversionworkspaceentity.WorkflowVersionStatus.DEACTIVATED
                ])
            }
        });
        const hasDraftVersion = workflowVersions.some((version)=>version.status === _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT);
        if (hasDraftVersion) {
            statuses.push(_workflowworkspaceentity.WorkflowStatus.DRAFT);
        }
        const hasActiveVersion = workflowVersions.some((version)=>version.status === _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE);
        if (hasActiveVersion) {
            statuses.push(_workflowworkspaceentity.WorkflowStatus.ACTIVE);
        }
        const hasDeactivatedVersion = workflowVersions.some((version)=>version.status === _workflowversionworkspaceentity.WorkflowVersionStatus.DEACTIVATED);
        if (!hasActiveVersion && hasDeactivatedVersion) {
            statuses.push(_workflowworkspaceentity.WorkflowStatus.DEACTIVATED);
        }
        return statuses;
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logger = new _common.Logger(WorkflowStatusesUpdateJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(WorkflowStatusesUpdateJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkflowVersionBatchEvent === "undefined" ? Object : WorkflowVersionBatchEvent
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowStatusesUpdateJob.prototype, "handle", null);
WorkflowStatusesUpdateJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.workflowQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], WorkflowStatusesUpdateJob);

//# sourceMappingURL=workflow-statuses-update.job.js.map