"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionResolver", {
    enumerable: true,
    get: function() {
        return WorkflowVersionResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _coreresolverdecorator = require("../../../api/graphql/graphql-config/decorators/core-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../graphql/pipes/resolver-validation.pipe");
const _createdraftfromworkflowversioninput = require("../dtos/create-draft-from-workflow-version.input");
const _duplicateworkflowinput = require("../dtos/duplicate-workflow.input");
const _updateworkflowversionpositionsinput = require("../dtos/update-workflow-version-positions.input");
const _workflowversiondto = require("../dtos/workflow-version.dto");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _userauthguard = require("../../../guards/user-auth.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _workflowversionworkspaceservice = require("../../../../modules/workflow/workflow-builder/workflow-version/workflow-version.workspace-service");
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
let WorkflowVersionResolver = class WorkflowVersionResolver {
    async createDraftFromWorkflowVersion({ id: workspaceId }, { workflowId, workflowVersionIdToCopy }) {
        return this.workflowVersionWorkspaceService.createDraftFromWorkflowVersion({
            workspaceId,
            workflowId,
            workflowVersionIdToCopy
        });
    }
    async duplicateWorkflow({ id: workspaceId }, { workflowIdToDuplicate, workflowVersionIdToCopy }) {
        return this.workflowVersionWorkspaceService.duplicateWorkflow({
            workspaceId,
            workflowIdToDuplicate,
            workflowVersionIdToCopy
        });
    }
    async updateWorkflowVersionPositions({ id: workspaceId }, { workflowVersionId, positions }) {
        await this.workflowVersionWorkspaceService.updateWorkflowVersionPositions({
            workspaceId,
            workflowVersionId,
            positions
        });
        return true;
    }
    constructor(workflowVersionWorkspaceService){
        this.workflowVersionWorkspaceService = workflowVersionWorkspaceService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workflowversiondto.WorkflowVersionDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _createdraftfromworkflowversioninput.CreateDraftFromWorkflowVersionInput === "undefined" ? Object : _createdraftfromworkflowversioninput.CreateDraftFromWorkflowVersionInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionResolver.prototype, "createDraftFromWorkflowVersion", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workflowversiondto.WorkflowVersionDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _duplicateworkflowinput.DuplicateWorkflowInput === "undefined" ? Object : _duplicateworkflowinput.DuplicateWorkflowInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionResolver.prototype, "duplicateWorkflow", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _updateworkflowversionpositionsinput.UpdateWorkflowVersionPositionsInput === "undefined" ? Object : _updateworkflowversionpositionsinput.UpdateWorkflowVersionPositionsInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionResolver.prototype, "updateWorkflowVersionPositions", null);
WorkflowVersionResolver = _ts_decorate([
    (0, _coreresolverdecorator.CoreResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    (0, _common.UseFilters)(_permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowversionworkspaceservice.WorkflowVersionWorkspaceService === "undefined" ? Object : _workflowversionworkspaceservice.WorkflowVersionWorkspaceService
    ])
], WorkflowVersionResolver);

//# sourceMappingURL=workflow-version.resolver.js.map