/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventLogsService", {
    enumerable: true,
    get: function() {
        return EventLogsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _clickHouseservice = require("../../../database/clickHouse/clickHouse.service");
const _clickHouseutil = require("../../../database/clickHouse/clickHouse.util");
const _billingentitlementkeyenum = require("../billing/enums/billing-entitlement-key.enum");
const _billingservice = require("../billing/services/billing.service");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _eventlogsexception = require("./event-logs.exception");
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
const ALLOWED_TABLES = Object.values(_types.EventLogTable);
const MAX_LIMIT = 10000;
const CLICKHOUSE_TABLE_NAMES = {
    [_types.EventLogTable.WORKSPACE_EVENT]: 'workspaceEvent',
    [_types.EventLogTable.PAGEVIEW]: 'pageview',
    [_types.EventLogTable.OBJECT_EVENT]: 'objectEvent',
    [_types.EventLogTable.USAGE_EVENT]: 'usageEvent',
    [_types.EventLogTable.APPLICATION_LOG]: 'applicationLog'
};
let EventLogsService = class EventLogsService {
    async queryEventLogs(workspaceId, input) {
        await this.validateAccess(workspaceId);
        if (!ALLOWED_TABLES.includes(input.table)) {
            throw new _common.BadRequestException(`Invalid table: ${input.table}`);
        }
        const limit = Math.min(input.first ?? 100, MAX_LIMIT);
        const tableName = CLICKHOUSE_TABLE_NAMES[input.table];
        const eventFieldName = input.table === _types.EventLogTable.USAGE_EVENT ? 'resourceType' : input.table === _types.EventLogTable.PAGEVIEW ? 'name' : input.table === _types.EventLogTable.APPLICATION_LOG ? 'logicFunctionName' : 'event';
        const whereClauses = [
            '"workspaceId" = {workspaceId:String}'
        ];
        const params = {
            workspaceId
        };
        await this.applyFilters(whereClauses, params, input.filters, eventFieldName, input.table);
        const paginationClauses = [
            ...whereClauses
        ];
        if ((0, _utils.isDefined)(input.after)) {
            const cursorMs = this.decodeCursor(input.after);
            paginationClauses.push('"timestamp" < fromUnixTimestamp64Milli({cursorMs:Int64})');
            params.cursorMs = cursorMs;
        }
        const filterWhereClause = whereClauses.join(' AND ');
        const paginationWhereClause = paginationClauses.join(' AND ');
        const countQuery = `
      SELECT count() as totalCount
      FROM ${tableName}
      WHERE ${filterWhereClause}
    `;
        const query = `
      SELECT *
      FROM ${tableName}
      WHERE ${paginationWhereClause}
      ORDER BY "timestamp" DESC
      LIMIT {limit:Int32}
    `;
        params.limit = limit + 1;
        const [records, countResult] = await Promise.all([
            this.clickHouseService.select(query, params),
            this.clickHouseService.select(countQuery, params)
        ]);
        const totalCount = countResult[0]?.totalCount ?? 0;
        const hasNextPage = records.length > limit;
        if (hasNextPage) {
            records.pop();
        }
        const normalizedRecords = this.normalizeRecords(records, input.table);
        const lastRecord = normalizedRecords[normalizedRecords.length - 1];
        const endCursor = hasNextPage && lastRecord ? this.encodeCursor(lastRecord.timestamp) : undefined;
        return {
            records: normalizedRecords,
            totalCount,
            pageInfo: {
                endCursor,
                hasNextPage
            }
        };
    }
    async validateAccess(workspaceId) {
        if (!this.clickHouseService.getMainClient()) {
            throw new _eventlogsexception.EventLogsException('Audit logs require ClickHouse to be configured. Please set the CLICKHOUSE_URL environment variable.', _eventlogsexception.EventLogsExceptionCode.CLICKHOUSE_NOT_CONFIGURED);
        }
        const hasEntitlement = await this.billingService.hasEntitlement(workspaceId, _billingentitlementkeyenum.BillingEntitlementKey.AUDIT_LOGS);
        if (!hasEntitlement) {
            throw new _eventlogsexception.EventLogsException('Audit logs require an Enterprise subscription.', _eventlogsexception.EventLogsExceptionCode.NO_ENTITLEMENT);
        }
    }
    async applyFilters(whereClauses, params, filters, eventFieldName, table) {
        if (!(0, _utils.isDefined)(filters)) {
            return;
        }
        if ((0, _utils.isDefined)(filters.eventType)) {
            whereClauses.push(`lower("${eventFieldName}") LIKE {eventTypePattern:String}`);
            params.eventTypePattern = `%${filters.eventType.toLowerCase()}%`;
        }
        // TODO: Legacy event tables (workspaceEvent, pageview, objectEvent) use
        // userId because some actions are logged out. Usage events use
        // userWorkspaceId directly which is more relevant in a workspace context.
        // Consider migrating all event tables to userWorkspaceId for consistency.
        if ((0, _utils.isDefined)(filters.userWorkspaceId)) {
            if (table === _types.EventLogTable.APPLICATION_LOG) {
            // Application logs don't have a user column
            } else if (table === _types.EventLogTable.USAGE_EVENT) {
                whereClauses.push('"userWorkspaceId" = {userWorkspaceId:String}');
                params.userWorkspaceId = filters.userWorkspaceId;
            } else {
                const userWorkspace = await this.userWorkspaceRepository.findOne({
                    where: {
                        id: filters.userWorkspaceId
                    },
                    select: [
                        'userId'
                    ]
                });
                if ((0, _utils.isDefined)(userWorkspace)) {
                    whereClauses.push('"userId" = {userId:String}');
                    params.userId = userWorkspace.userId;
                }
            }
        }
        if ((0, _utils.isDefined)(filters.dateRange?.start)) {
            whereClauses.push('"timestamp" >= {startDate:DateTime64(3)}');
            params.startDate = (0, _clickHouseutil.formatDateTimeForClickHouse)(filters.dateRange.start);
        }
        if ((0, _utils.isDefined)(filters.dateRange?.end)) {
            whereClauses.push('"timestamp" <= {endDate:DateTime64(3)}');
            params.endDate = (0, _clickHouseutil.formatDateTimeForClickHouse)(filters.dateRange.end);
        }
        if (table === _types.EventLogTable.OBJECT_EVENT) {
            if ((0, _utils.isDefined)(filters.recordId)) {
                whereClauses.push('"recordId" = {recordId:String}');
                params.recordId = filters.recordId;
            }
            if ((0, _utils.isDefined)(filters.objectMetadataId)) {
                whereClauses.push('"objectMetadataId" = {objectMetadataId:String}');
                params.objectMetadataId = filters.objectMetadataId;
            }
        }
    }
    encodeCursor(timestamp) {
        return Buffer.from(String(timestamp.getTime())).toString('base64');
    }
    decodeCursor(cursor) {
        return parseInt(Buffer.from(cursor, 'base64').toString('utf-8'), 10);
    }
    normalizeRecords(records, table) {
        if (table === _types.EventLogTable.USAGE_EVENT) {
            return records.map((record)=>({
                    event: record.resourceType ?? '',
                    timestamp: new Date(record.timestamp),
                    userId: record.userWorkspaceId,
                    properties: {
                        operationType: record.operationType,
                        quantity: record.quantity,
                        unit: record.unit,
                        creditsUsedMicro: record.creditsUsedMicro,
                        resourceId: record.resourceId,
                        resourceContext: record.resourceContext,
                        ...record.metadata ?? {}
                    }
                }));
        }
        if (table === _types.EventLogTable.APPLICATION_LOG) {
            return records.map((record)=>({
                    event: record.logicFunctionName ?? '',
                    timestamp: new Date(record.timestamp),
                    properties: {
                        level: record.level,
                        message: record.message,
                        executionId: record.executionId,
                        logicFunctionId: record.logicFunctionId,
                        applicationId: record.applicationId,
                        ...record.properties ?? {}
                    }
                }));
        }
        return records.map((record)=>{
            const eventName = table === _types.EventLogTable.PAGEVIEW ? record.name ?? '' : record.event ?? '';
            return {
                event: eventName,
                timestamp: new Date(record.timestamp),
                userId: record.userId,
                properties: record.properties,
                recordId: record.recordId,
                objectMetadataId: record.objectMetadataId,
                isCustom: record.isCustom
            };
        });
    }
    constructor(clickHouseService, billingService, userWorkspaceRepository){
        this.clickHouseService = clickHouseService;
        this.billingService = billingService;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
EventLogsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _clickHouseservice.ClickHouseService === "undefined" ? Object : _clickHouseservice.ClickHouseService,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], EventLogsService);

//# sourceMappingURL=event-logs.service.js.map