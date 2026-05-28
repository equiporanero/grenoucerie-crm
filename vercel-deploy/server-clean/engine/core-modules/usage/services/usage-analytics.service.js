/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsageAnalyticsService", {
    enumerable: true,
    get: function() {
        return UsageAnalyticsService;
    }
});
const _common = require("@nestjs/common");
const _clickHouseservice = require("../../../../database/clickHouse/clickHouse.service");
const _clickHouseutil = require("../../../../database/clickHouse/clickHouse.util");
const _fillusagetimeseriesgapsutil = require("../utils/fill-usage-time-series-gaps.util");
const _todisplaycreditsutil = require("../utils/to-display-credits.util");
const _todollarsutil = require("../utils/to-dollars.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const ALLOWED_GROUP_BY_FIELDS = [
    'userWorkspaceId',
    'resourceId',
    'operationType',
    'resourceType',
    'resourceContext'
];
const BREAKDOWN_QUERY_LIMIT = 50;
let UsageAnalyticsService = class UsageAnalyticsService {
    async getAdminAiUsageByWorkspace(params) {
        const aiOperationTypes = [
            'AI_CHAT_TOKEN',
            'AI_WORKFLOW_TOKEN'
        ];
        const convert = params.useDollarMode ? _todollarsutil.toDollars : _todisplaycreditsutil.toDisplayCredits;
        const query = `
      SELECT
        workspaceId AS key,
        sum(creditsUsedMicro) AS creditsUsedMicro
      FROM usageEvent
      WHERE timestamp >= {periodStart:String}
        AND timestamp < {periodEnd:String}
        AND operationType IN ({operationTypes:Array(String)})
      GROUP BY workspaceId
      ORDER BY creditsUsedMicro DESC
      LIMIT ${BREAKDOWN_QUERY_LIMIT}
    `;
        const rows = await this.clickHouseService.select(query, {
            periodStart: (0, _clickHouseutil.formatDateTimeForClickHouse)(params.periodStart),
            periodEnd: (0, _clickHouseutil.formatDateTimeForClickHouse)(params.periodEnd),
            operationTypes: aiOperationTypes
        });
        return rows.map((row)=>({
                key: row.key,
                creditsUsed: convert(row.creditsUsedMicro)
            }));
    }
    async getUsageByUser(params) {
        return this.queryBreakdown({
            ...params,
            groupByField: 'userWorkspaceId',
            extraWhere: "AND userWorkspaceId != ''"
        });
    }
    async getUsageByModel(params) {
        return this.queryBreakdown({
            ...params,
            groupByField: 'resourceContext',
            extraWhere: "AND resourceContext != ''"
        });
    }
    async getUsageByOperationType(params) {
        return this.queryBreakdown({
            ...params,
            groupByField: 'operationType',
            ...params.userWorkspaceId && {
                extraWhere: 'AND userWorkspaceId = {userWorkspaceId:String}',
                extraParams: {
                    userWorkspaceId: params.userWorkspaceId
                }
            }
        });
    }
    async getUsageByUserTimeSeries(params) {
        return this.queryTimeSeries({
            ...params,
            extraWhere: 'AND userWorkspaceId = {userWorkspaceId:String}',
            extraParams: {
                userWorkspaceId: params.userWorkspaceId
            }
        });
    }
    async getUsageTimeSeries(params) {
        return this.queryTimeSeries(params);
    }
    async queryBreakdown({ workspaceId, periodStart, periodEnd, groupByField, operationTypes, extraWhere = '', extraParams }) {
        if (!ALLOWED_GROUP_BY_FIELDS.includes(groupByField)) {
            throw new Error(`Invalid groupByField: ${groupByField}`);
        }
        const opTypeFilter = operationTypes && operationTypes.length > 0 ? 'AND operationType IN ({operationTypes:Array(String)})' : '';
        const query = `
      SELECT
        ${groupByField} AS key,
        sum(creditsUsedMicro) AS creditsUsedMicro
      FROM usageEvent
      WHERE workspaceId = {workspaceId:String}
        AND timestamp >= {periodStart:String}
        AND timestamp < {periodEnd:String}
        ${opTypeFilter}
        ${extraWhere}
      GROUP BY ${groupByField}
      ORDER BY creditsUsedMicro DESC
      LIMIT ${BREAKDOWN_QUERY_LIMIT}
    `;
        const rows = await this.clickHouseService.select(query, {
            workspaceId,
            periodStart: (0, _clickHouseutil.formatDateTimeForClickHouse)(periodStart),
            periodEnd: (0, _clickHouseutil.formatDateTimeForClickHouse)(periodEnd),
            ...operationTypes && operationTypes.length > 0 ? {
                operationTypes
            } : {},
            ...extraParams ?? {}
        });
        return rows.map((row)=>({
                key: row.key,
                creditsUsed: row.creditsUsedMicro
            }));
    }
    async queryTimeSeries({ workspaceId, periodStart, periodEnd, operationTypes, extraWhere = '', extraParams }) {
        const opTypeFilter = operationTypes && operationTypes.length > 0 ? 'AND operationType IN ({operationTypes:Array(String)})' : '';
        const query = `
      SELECT
        formatDateTime(timestamp, '%Y-%m-%d') AS date,
        sum(creditsUsedMicro) AS creditsUsedMicro
      FROM usageEvent
      WHERE workspaceId = {workspaceId:String}
        AND timestamp >= {periodStart:String}
        AND timestamp < {periodEnd:String}
        ${opTypeFilter}
        ${extraWhere}
      GROUP BY date
      ORDER BY date ASC
    `;
        const rows = await this.clickHouseService.select(query, {
            workspaceId,
            periodStart: (0, _clickHouseutil.formatDateTimeForClickHouse)(periodStart),
            periodEnd: (0, _clickHouseutil.formatDateTimeForClickHouse)(periodEnd),
            ...operationTypes && operationTypes.length > 0 ? {
                operationTypes
            } : {},
            ...extraParams ?? {}
        });
        const points = rows.map((row)=>({
                date: row.date,
                creditsUsed: row.creditsUsedMicro
            }));
        return (0, _fillusagetimeseriesgapsutil.fillUsageTimeSeriesGaps)({
            rows: points,
            periodStart,
            periodEnd
        });
    }
    constructor(clickHouseService){
        this.clickHouseService = clickHouseService;
    }
};
UsageAnalyticsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _clickHouseservice.ClickHouseService === "undefined" ? Object : _clickHouseservice.ClickHouseService
    ])
], UsageAnalyticsService);

//# sourceMappingURL=usage-analytics.service.js.map