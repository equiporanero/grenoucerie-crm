"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowBuilderResolver", {
    enumerable: true,
    get: function() {
        return WorkflowBuilderResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _constants = require("twenty-shared/constants");
const _coreresolverdecorator = require("../../../api/graphql/graphql-config/decorators/core-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../graphql/pipes/resolver-validation.pipe");
const _computestepoutputschemainput = require("../dtos/compute-step-output-schema.input");
const _workflowtriggergraphqlapiexceptionfilter = require("../filters/workflow-trigger-graphql-api-exception.filter");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _userauthguard = require("../../../guards/user-auth.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _workflowschemaworkspaceservice = require("../../../../modules/workflow/workflow-builder/workflow-schema/workflow-schema.workspace-service");
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
let WorkflowBuilderResolver = class WorkflowBuilderResolver {
    async computeStepOutputSchema({ id: workspaceId }, { step, workflowVersionId }) {
        return this.workflowSchemaWorkspaceService.computeStepOutputSchema({
            step,
            workspaceId,
            workflowVersionId
        });
    }
    constructor(workflowSchemaWorkspaceService){
        this.workflowSchemaWorkspaceService = workflowSchemaWorkspaceService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_graphqltypejson.default),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _computestepoutputschemainput.ComputeStepOutputSchemaInput === "undefined" ? Object : _computestepoutputschemainput.ComputeStepOutputSchemaInput
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowBuilderResolver.prototype, "computeStepOutputSchema", null);
WorkflowBuilderResolver = _ts_decorate([
    (0, _coreresolverdecorator.CoreResolver)(),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_workflowtriggergraphqlapiexceptionfilter.WorkflowTriggerGraphqlApiExceptionFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowschemaworkspaceservice.WorkflowSchemaWorkspaceService === "undefined" ? Object : _workflowschemaworkspaceservice.WorkflowSchemaWorkspaceService
    ])
], WorkflowBuilderResolver);

//# sourceMappingURL=workflow-builder.resolver.js.map