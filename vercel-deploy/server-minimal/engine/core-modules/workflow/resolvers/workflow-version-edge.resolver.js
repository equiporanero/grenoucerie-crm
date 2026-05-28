"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionEdgeResolver", {
    enumerable: true,
    get: function() {
        return WorkflowVersionEdgeResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _coreresolverdecorator = require("../../../api/graphql/graphql-config/decorators/core-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../graphql/pipes/resolver-validation.pipe");
const _createworkflowversionedgeinput = require("../dtos/create-workflow-version-edge.input");
const _workflowversionstepchangesdto = require("../dtos/workflow-version-step-changes.dto");
const _workflowversionedgegraphqlapiexceptionfilter = require("../filters/workflow-version-edge-graphql-api-exception.filter");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _userauthguard = require("../../../guards/user-auth.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _workflowversionedgeworkspaceservice = require("../../../../modules/workflow/workflow-builder/workflow-version-edge/workflow-version-edge.workspace-service");
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
let WorkflowVersionEdgeResolver = class WorkflowVersionEdgeResolver {
    async createWorkflowVersionEdge({ id: workspaceId }, { source, target, workflowVersionId, sourceConnectionOptions }) {
        return this.workflowVersionEdgeWorkspaceService.createWorkflowVersionEdge({
            source,
            target,
            workflowVersionId,
            workspaceId,
            sourceConnectionOptions
        });
    }
    async deleteWorkflowVersionEdge({ id: workspaceId }, { source, target, workflowVersionId, sourceConnectionOptions }) {
        return this.workflowVersionEdgeWorkspaceService.deleteWorkflowVersionEdge({
            source,
            target,
            workflowVersionId,
            workspaceId,
            sourceConnectionOptions
        });
    }
    constructor(workflowVersionEdgeWorkspaceService){
        this.workflowVersionEdgeWorkspaceService = workflowVersionEdgeWorkspaceService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workflowversionstepchangesdto.WorkflowVersionStepChangesDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _createworkflowversionedgeinput.CreateWorkflowVersionEdgeInput === "undefined" ? Object : _createworkflowversionedgeinput.CreateWorkflowVersionEdgeInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionEdgeResolver.prototype, "createWorkflowVersionEdge", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workflowversionstepchangesdto.WorkflowVersionStepChangesDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _createworkflowversionedgeinput.CreateWorkflowVersionEdgeInput === "undefined" ? Object : _createworkflowversionedgeinput.CreateWorkflowVersionEdgeInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionEdgeResolver.prototype, "deleteWorkflowVersionEdge", null);
WorkflowVersionEdgeResolver = _ts_decorate([
    (0, _coreresolverdecorator.CoreResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    (0, _common.UseFilters)(_permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter, _workflowversionedgegraphqlapiexceptionfilter.WorkflowVersionEdgeGraphqlApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowversionedgeworkspaceservice.WorkflowVersionEdgeWorkspaceService === "undefined" ? Object : _workflowversionedgeworkspaceservice.WorkflowVersionEdgeWorkspaceService
    ])
], WorkflowVersionEdgeResolver);

//# sourceMappingURL=workflow-version-edge.resolver.js.map