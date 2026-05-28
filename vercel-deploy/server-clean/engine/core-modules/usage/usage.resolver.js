/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsageResolver", {
    enumerable: true,
    get: function() {
        return UsageResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _usageanalyticsinput = require("./dtos/inputs/usage-analytics.input");
const _usageanalyticsdto = require("./dtos/usage-analytics.dto");
const _usageanalyticsservice = require("./services/usage-analytics.service");
const _todisplaycreditsutil = require("./utils/to-display-credits.util");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
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
let UsageResolver = class UsageResolver {
    async getUsageAnalytics(workspace, input) {
        const defaultPeriodEnd = new Date();
        const defaultPeriodStart = new Date();
        defaultPeriodStart.setDate(defaultPeriodStart.getDate() - 30);
        const periodStart = input?.periodStart ?? defaultPeriodStart;
        const periodEnd = input?.periodEnd ?? defaultPeriodEnd;
        const periodParams = {
            workspaceId: workspace.id,
            periodStart,
            periodEnd,
            operationTypes: input?.operationTypes ?? undefined
        };
        const [usageByUser, usageByOperationType, usageByModel, timeSeries] = await Promise.all([
            this.usageAnalyticsService.getUsageByUser(periodParams),
            this.usageAnalyticsService.getUsageByOperationType({
                ...periodParams,
                userWorkspaceId: input?.userWorkspaceId ?? undefined
            }),
            this.usageAnalyticsService.getUsageByModel(periodParams),
            this.usageAnalyticsService.getUsageTimeSeries(periodParams)
        ]);
        const resolvedUsageByUser = await this.resolveBreakdownKeys(usageByUser, (ids)=>this.resolveUserNames(ids, workspace.id));
        const result = {
            usageByUser: resolvedUsageByUser.map((item)=>({
                    ...item,
                    creditsUsed: (0, _todisplaycreditsutil.toDisplayCredits)(item.creditsUsed)
                })),
            usageByOperationType: usageByOperationType.map((item)=>({
                    ...item,
                    creditsUsed: (0, _todisplaycreditsutil.toDisplayCredits)(item.creditsUsed)
                })),
            usageByModel: usageByModel.map((item)=>({
                    ...item,
                    creditsUsed: (0, _todisplaycreditsutil.toDisplayCredits)(item.creditsUsed)
                })),
            timeSeries: timeSeries.map((point)=>({
                    ...point,
                    creditsUsed: (0, _todisplaycreditsutil.toDisplayCredits)(point.creditsUsed)
                })),
            periodStart,
            periodEnd
        };
        if (input?.userWorkspaceId) {
            const userWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    id: input.userWorkspaceId,
                    workspaceId: workspace.id
                },
                select: {
                    id: true
                }
            });
            if ((0, _utils.isDefined)(userWorkspace)) {
                const dailyUsage = await this.usageAnalyticsService.getUsageByUserTimeSeries({
                    ...periodParams,
                    userWorkspaceId: input.userWorkspaceId
                });
                result.userDailyUsage = {
                    userWorkspaceId: input.userWorkspaceId,
                    dailyUsage: dailyUsage.map((point)=>({
                            ...point,
                            creditsUsed: (0, _todisplaycreditsutil.toDisplayCredits)(point.creditsUsed)
                        }))
                };
            }
        }
        return result;
    }
    async resolveBreakdownKeys(items, resolveNames) {
        if (items.length === 0) {
            return items;
        }
        const ids = items.map((item)=>item.key);
        const nameMap = await resolveNames(ids);
        return items.map((item)=>({
                ...item,
                label: nameMap.get(item.key)
            }));
    }
    async resolveUserNames(userWorkspaceIds, workspaceId) {
        const nameMap = new Map();
        if (userWorkspaceIds.length === 0) {
            return nameMap;
        }
        const userWorkspaces = await this.userWorkspaceRepository.find({
            where: {
                id: (0, _typeorm1.In)(userWorkspaceIds),
                workspaceId
            },
            relations: [
                'user'
            ],
            select: {
                id: true,
                user: {
                    firstName: true,
                    lastName: true,
                    email: true
                }
            }
        });
        for (const userWorkspace of userWorkspaces){
            if (!(0, _utils.isDefined)(userWorkspace.user)) {
                continue;
            }
            const { firstName, lastName, email } = userWorkspace.user;
            const fullName = `${firstName} ${lastName}`.trim();
            nameMap.set(userWorkspace.id, fullName || email);
        }
        return nameMap;
    }
    constructor(usageAnalyticsService, userWorkspaceRepository){
        this.usageAnalyticsService = usageAnalyticsService;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_usageanalyticsdto.UsageAnalyticsDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input', {
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        typeof _usageanalyticsinput.UsageAnalyticsInput === "undefined" ? Object : _usageanalyticsinput.UsageAnalyticsInput
    ]),
    _ts_metadata("design:returntype", Promise)
], UsageResolver.prototype, "getUsageAnalytics", null);
UsageResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usageanalyticsservice.UsageAnalyticsService === "undefined" ? Object : _usageanalyticsservice.UsageAnalyticsService,
        typeof Repository === "undefined" ? Object : Repository
    ])
], UsageResolver);

//# sourceMappingURL=usage.resolver.js.map