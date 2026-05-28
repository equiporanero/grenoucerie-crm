"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionStepResolver", {
    enumerable: true,
    get: function() {
        return WorkflowVersionStepResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _coreresolverdecorator = require("../../../api/graphql/graphql-config/decorators/core-resolver.decorator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _preventnesttoautologgraphqlerrorsfilter = require("../../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../graphql/pipes/resolver-validation.pipe");
const _httptool = require("../../tool/tools/http-tool/http-tool");
const _createworkflowversionstepinput = require("../dtos/create-workflow-version-step.input");
const _deleteworkflowversionstepinput = require("../dtos/delete-workflow-version-step.input");
const _duplicateworkflowversionstepinput = require("../dtos/duplicate-workflow-version-step.input");
const _submitformstepinput = require("../dtos/submit-form-step.input");
const _testhttprequestinput = require("../dtos/test-http-request.input");
const _testhttprequestdto = require("../dtos/test-http-request.dto");
const _updateworkflowrunstepinput = require("../dtos/update-workflow-run-step.input");
const _updateworkflowversionstepinput = require("../dtos/update-workflow-version-step.input");
const _workflowactiondto = require("../dtos/workflow-action.dto");
const _workflowversionstepchangesdto = require("../dtos/workflow-version-step-changes.dto");
const _workflowversionstepgraphqlapiexceptionfilter = require("../filters/workflow-version-step-graphql-api-exception.filter");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _userauthguard = require("../../../guards/user-auth.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _connectedaccountmetadataservice = require("../../../metadata-modules/connected-account/connected-account-metadata.service");
const _connectedaccounthandledto = require("../../../metadata-modules/connected-account/dtos/connected-account-handle.dto");
const _permissionsgraphqlapiexceptionfilter = require("../../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _workflowversionstepworkspaceservice = require("../../../../modules/workflow/workflow-builder/workflow-version-step/workflow-version-step.workspace-service");
const _workflowrunworkspaceservice = require("../../../../modules/workflow/workflow-runner/workflow-run/workflow-run.workspace-service");
const _workflowrunnerworkspaceservice = require("../../../../modules/workflow/workflow-runner/workspace-services/workflow-runner.workspace-service");
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
let WorkflowVersionStepResolver = class WorkflowVersionStepResolver {
    // Related to https://github.com/twentyhq/private-issues/issues/478
    async workflowStepConnectedAccountHandle(id, { id: workspaceId }) {
        const account = await this.connectedAccountMetadataService.findById({
            id,
            workspaceId
        });
        if (!account) {
            return null;
        }
        return {
            id: account.id,
            handle: account.handle,
            provider: account.provider
        };
    }
    async createWorkflowVersionStep({ id: workspaceId }, input) {
        return this.workflowVersionStepWorkspaceService.createWorkflowVersionStep({
            workspaceId,
            input
        });
    }
    async updateWorkflowVersionStep({ id: workspaceId }, { step, workflowVersionId }) {
        return this.workflowVersionStepWorkspaceService.updateWorkflowVersionStep({
            workspaceId,
            workflowVersionId,
            step
        });
    }
    async deleteWorkflowVersionStep({ id: workspaceId }, { stepId, workflowVersionId }) {
        return this.workflowVersionStepWorkspaceService.deleteWorkflowVersionStep({
            workspaceId,
            workflowVersionId,
            stepIdToDelete: stepId
        });
    }
    async submitFormStep({ id: workspaceId }, { stepId, workflowRunId, response }) {
        await this.workflowRunnerWorkspaceService.submitFormStep({
            workspaceId,
            stepId,
            workflowRunId,
            response
        });
        return true;
    }
    async updateWorkflowRunStep({ id: workspaceId }, { workflowRunId, step }) {
        await this.workflowRunWorkspaceService.updateWorkflowRunStep({
            workspaceId,
            workflowRunId,
            step
        });
        return step;
    }
    async duplicateWorkflowVersionStep({ id: workspaceId }, { stepId, workflowVersionId }) {
        return this.workflowVersionStepWorkspaceService.duplicateWorkflowVersionStep({
            workspaceId,
            workflowVersionId,
            stepId
        });
    }
    async testHttpRequest(workspace, { url, method, headers, body }) {
        return this.httpTool.execute({
            url,
            method,
            headers,
            body
        }, {
            workspaceId: workspace.id
        });
    }
    constructor(workflowVersionStepWorkspaceService, workflowRunnerWorkspaceService, workflowRunWorkspaceService, httpTool, connectedAccountMetadataService){
        this.workflowVersionStepWorkspaceService = workflowVersionStepWorkspaceService;
        this.workflowRunnerWorkspaceService = workflowRunnerWorkspaceService;
        this.workflowRunWorkspaceService = workflowRunWorkspaceService;
        this.httpTool = httpTool;
        this.connectedAccountMetadataService = connectedAccountMetadataService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_connectedaccounthandledto.ConnectedAccountHandleDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Args)('connectedAccountId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStepResolver.prototype, "workflowStepConnectedAccountHandle", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workflowversionstepchangesdto.WorkflowVersionStepChangesDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _createworkflowversionstepinput.CreateWorkflowVersionStepInput === "undefined" ? Object : _createworkflowversionstepinput.CreateWorkflowVersionStepInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStepResolver.prototype, "createWorkflowVersionStep", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workflowactiondto.WorkflowActionDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _updateworkflowversionstepinput.UpdateWorkflowVersionStepInput === "undefined" ? Object : _updateworkflowversionstepinput.UpdateWorkflowVersionStepInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStepResolver.prototype, "updateWorkflowVersionStep", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workflowversionstepchangesdto.WorkflowVersionStepChangesDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _deleteworkflowversionstepinput.DeleteWorkflowVersionStepInput === "undefined" ? Object : _deleteworkflowversionstepinput.DeleteWorkflowVersionStepInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStepResolver.prototype, "deleteWorkflowVersionStep", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _submitformstepinput.SubmitFormStepInput === "undefined" ? Object : _submitformstepinput.SubmitFormStepInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStepResolver.prototype, "submitFormStep", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workflowactiondto.WorkflowActionDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _updateworkflowrunstepinput.UpdateWorkflowRunStepInput === "undefined" ? Object : _updateworkflowrunstepinput.UpdateWorkflowRunStepInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStepResolver.prototype, "updateWorkflowRunStep", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workflowversionstepchangesdto.WorkflowVersionStepChangesDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _duplicateworkflowversionstepinput.DuplicateWorkflowVersionStepInput === "undefined" ? Object : _duplicateworkflowversionstepinput.DuplicateWorkflowVersionStepInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStepResolver.prototype, "duplicateWorkflowVersionStep", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_testhttprequestdto.TestHttpRequestDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _testhttprequestinput.TestHttpRequestInput === "undefined" ? Object : _testhttprequestinput.TestHttpRequestInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionStepResolver.prototype, "testHttpRequest", null);
WorkflowVersionStepResolver = _ts_decorate([
    (0, _coreresolverdecorator.CoreResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    (0, _common.UseFilters)(_permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter, _workflowversionstepgraphqlapiexceptionfilter.WorkflowVersionStepGraphqlApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowversionstepworkspaceservice.WorkflowVersionStepWorkspaceService === "undefined" ? Object : _workflowversionstepworkspaceservice.WorkflowVersionStepWorkspaceService,
        typeof _workflowrunnerworkspaceservice.WorkflowRunnerWorkspaceService === "undefined" ? Object : _workflowrunnerworkspaceservice.WorkflowRunnerWorkspaceService,
        typeof _workflowrunworkspaceservice.WorkflowRunWorkspaceService === "undefined" ? Object : _workflowrunworkspaceservice.WorkflowRunWorkspaceService,
        typeof _httptool.HttpTool === "undefined" ? Object : _httptool.HttpTool,
        typeof _connectedaccountmetadataservice.ConnectedAccountMetadataService === "undefined" ? Object : _connectedaccountmetadataservice.ConnectedAccountMetadataService
    ])
], WorkflowVersionStepResolver);

//# sourceMappingURL=workflow-version-step.resolver.js.map