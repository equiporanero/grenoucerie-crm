"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionValidationWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowVersionValidationWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowqueryvalidationexception = require("../exceptions/workflow-query-validation.exception");
const _workflowversionworkspaceentity = require("../standard-objects/workflow-version.workspace-entity");
const _assertworkflowversionisdraftutil = require("../utils/assert-workflow-version-is-draft.util");
const _workflowcommonworkspaceservice = require("./workflow-common.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowVersionValidationWorkspaceService = class WorkflowVersionValidationWorkspaceService {
    async validateWorkflowVersionForCreateOne(workspaceId, payload) {
        if (payload.data.status && payload.data.status !== _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT) {
            throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('Cannot create workflow version with status other than draft', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN, {
                userFriendlyMessage: /*i18n*/ {
                    id: "RggZr4",
                    message: "Cannot create workflow version with status other than draft"
                }
            });
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowAlreadyHasDraftVersion = await workflowVersionRepository.exists({
                where: {
                    workflowId: payload.data.workflowId,
                    status: _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT,
                    deletedAt: (0, _typeorm.IsNull)()
                }
            });
            if (workflowAlreadyHasDraftVersion) {
                throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('Cannot create multiple draft versions for the same workflow', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "LIPsWu",
                        message: "Cannot create multiple draft versions for the same workflow"
                    }
                });
            }
        }, authContext);
    }
    async validateWorkflowVersionForUpdateOne({ workspaceId, payload }) {
        const workflowVersion = await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
            workspaceId,
            workflowVersionId: payload.id
        });
        if (!(Object.keys(payload.data).length === 1 && payload.data.name)) {
            (0, _assertworkflowversionisdraftutil.assertWorkflowVersionIsDraft)(workflowVersion);
        }
        if (payload.data.status && payload.data.status !== workflowVersion.status) {
            throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('Cannot update workflow version status manually', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN, {
                userFriendlyMessage: /*i18n*/ {
                    id: "4DKo3U",
                    message: "Cannot update workflow version status manually"
                }
            });
        }
        if (payload.data.steps) {
            throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('Updating workflowVersion steps directly is forbidden. ' + 'Use createWorkflowVersionStep, updateWorkflowVersionStep or deleteWorkflowVersionStep endpoint instead.', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN);
        }
    }
    async validateWorkflowVersionForDeleteOne(workspaceId, payload) {
        const workflowVersion = await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
            workspaceId,
            workflowVersionId: payload.id
        });
        (0, _assertworkflowversionisdraftutil.assertWorkflowVersionIsDraft)(workflowVersion);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const otherWorkflowVersionsExist = await workflowVersionRepository.exists({
                where: {
                    workflowId: workflowVersion.workflowId,
                    deletedAt: (0, _typeorm.IsNull)(),
                    id: (0, _typeorm.Not)(workflowVersion.id)
                }
            });
            if (!otherWorkflowVersionsExist) {
                throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('The initial version of a workflow can not be deleted', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "EJUSll",
                        message: "The initial version of a workflow can not be deleted"
                    }
                });
            }
        }, authContext);
    }
    constructor(workflowCommonWorkspaceService, globalWorkspaceOrmManager){
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
WorkflowVersionValidationWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], WorkflowVersionValidationWorkspaceService);

//# sourceMappingURL=workflow-version-validation.workspace-service.js.map