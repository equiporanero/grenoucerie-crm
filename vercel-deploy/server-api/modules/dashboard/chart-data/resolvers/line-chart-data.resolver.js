"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LineChartDataResolver", {
    enumerable: true,
    get: function() {
        return LineChartDataResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _metadataresolverdecorator = require("../../../../engine/api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _workspaceauthcontextstorage = require("../../../../engine/core-modules/auth/storage/workspace-auth-context.storage");
const _resolvervalidationpipe = require("../../../../engine/core-modules/graphql/pipes/resolver-validation.pipe");
const _nopermissionguard = require("../../../../engine/guards/no-permission.guard");
const _workspaceauthguard = require("../../../../engine/guards/workspace-auth.guard");
const _linechartdatainput = require("../dtos/inputs/line-chart-data.input");
const _linechartdatadto = require("../dtos/line-chart-data.dto");
const _chartdatagraphqlapiexceptionfilter = require("../filters/chart-data-graphql-api-exception.filter");
const _linechartdataservice = require("../services/line-chart-data.service");
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
let LineChartDataResolver = class LineChartDataResolver {
    async lineChartData(input) {
        const authContext = (0, _workspaceauthcontextstorage.getWorkspaceAuthContext)();
        return this.lineChartDataService.getLineChartData({
            objectMetadataId: input.objectMetadataId,
            configuration: input.configuration,
            workspaceId: authContext.workspace.id,
            authContext
        });
    }
    constructor(lineChartDataService){
        this.lineChartDataService = lineChartDataService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_linechartdatadto.LineChartDataDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _linechartdatainput.LineChartDataInput === "undefined" ? Object : _linechartdatainput.LineChartDataInput
    ]),
    _ts_metadata("design:returntype", Promise)
], LineChartDataResolver.prototype, "lineChartData", null);
LineChartDataResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_chartdatagraphqlapiexceptionfilter.ChartDataGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _linechartdataservice.LineChartDataService === "undefined" ? Object : _linechartdataservice.LineChartDataService
    ])
], LineChartDataResolver);

//# sourceMappingURL=line-chart-data.resolver.js.map