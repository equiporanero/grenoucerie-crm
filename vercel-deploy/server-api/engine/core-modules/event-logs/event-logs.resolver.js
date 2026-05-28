/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventLogsResolver", {
    enumerable: true,
    get: function() {
        return EventLogsResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _authgraphqlapiexceptionfilter = require("../auth/filters/auth-graphql-api-exception.filter");
const _enterprisefeaturesenabledguard = require("../auth/guards/enterprise-features-enabled.guard");
const _eventlogsgraphqlapiexceptionfilter = require("./filters/event-logs-graphql-api-exception.filter");
const _forbiddenexceptiongraphqlfilter = require("./filters/forbidden-exception-graphql.filter");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _eventlogsservice = require("./event-logs.service");
const _eventlogqueryinput = require("./dtos/event-log-query.input");
const _eventlogresultdto = require("./dtos/event-log-result.dto");
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
let EventLogsResolver = class EventLogsResolver {
    async eventLogs(workspace, input) {
        return this.eventLogsService.queryEventLogs(workspace.id, input);
    }
    constructor(eventLogsService){
        this.eventLogsService = eventLogsService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.SECURITY)),
    (0, _graphql.Query)(()=>_eventlogresultdto.EventLogQueryResult),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _eventlogqueryinput.EventLogQueryInput === "undefined" ? Object : _eventlogqueryinput.EventLogQueryInput
    ]),
    _ts_metadata("design:returntype", Promise)
], EventLogsResolver.prototype, "eventLogs", null);
EventLogsResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_forbiddenexceptiongraphqlfilter.ForbiddenExceptionGraphqlFilter, _authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter, _eventlogsgraphqlapiexceptionfilter.EventLogsGraphqlApiExceptionFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _eventlogsservice.EventLogsService === "undefined" ? Object : _eventlogsservice.EventLogsService
    ])
], EventLogsResolver);

//# sourceMappingURL=event-logs.resolver.js.map