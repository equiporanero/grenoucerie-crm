"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardResolver", {
    enumerable: true,
    get: function() {
        return DashboardResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _metadataresolverdecorator = require("../../../engine/api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _scalars = require("../../../engine/api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspaceauthcontextstorage = require("../../../engine/core-modules/auth/storage/workspace-auth-context.storage");
const _resolvervalidationpipe = require("../../../engine/core-modules/graphql/pipes/resolver-validation.pipe");
const _nopermissionguard = require("../../../engine/guards/no-permission.guard");
const _workspaceauthguard = require("../../../engine/guards/workspace-auth.guard");
const _pagelayoutgraphqlapiexceptionfilter = require("../../../engine/metadata-modules/page-layout/utils/page-layout-graphql-api-exception.filter");
const _duplicateddashboarddto = require("../dtos/duplicated-dashboard.dto");
const _dashboardduplicationservice = require("../services/dashboard-duplication.service");
const _dashboardgraphqlapiexceptionfilter = require("../utils/dashboard-graphql-api-exception.filter");
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
let DashboardResolver = class DashboardResolver {
    async duplicateDashboard(id) {
        const authContext = (0, _workspaceauthcontextstorage.getWorkspaceAuthContext)();
        return this.dashboardDuplicationService.duplicateDashboard(id, authContext);
    }
    constructor(dashboardDuplicationService){
        this.dashboardDuplicationService = dashboardDuplicationService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_duplicateddashboarddto.DuplicatedDashboardDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], DashboardResolver.prototype, "duplicateDashboard", null);
DashboardResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_dashboardgraphqlapiexceptionfilter.DashboardGraphqlApiExceptionFilter, _pagelayoutgraphqlapiexceptionfilter.PageLayoutGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dashboardduplicationservice.DashboardDuplicationService === "undefined" ? Object : _dashboardduplicationservice.DashboardDuplicationService
    ])
], DashboardResolver);

//# sourceMappingURL=dashboard.resolver.js.map