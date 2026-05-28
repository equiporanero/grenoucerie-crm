/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventLogCleanupService", {
    enumerable: true,
    get: function() {
        return EventLogCleanupService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _clickHouseservice = require("../../../../../database/clickHouse/clickHouse.service");
const _clickHouseutil = require("../../../../../database/clickHouse/clickHouse.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const CLICKHOUSE_TABLE_NAMES = {
    [_types.EventLogTable.WORKSPACE_EVENT]: 'workspaceEvent',
    [_types.EventLogTable.PAGEVIEW]: 'pageview',
    [_types.EventLogTable.OBJECT_EVENT]: 'objectEvent',
    [_types.EventLogTable.USAGE_EVENT]: 'usageEvent',
    [_types.EventLogTable.APPLICATION_LOG]: 'applicationLog'
};
let EventLogCleanupService = class EventLogCleanupService {
    async cleanupWorkspaceEventLogs({ workspaceId, retentionDays }) {
        if (!this.clickHouseService.getMainClient()) {
            this.logger.debug('ClickHouse not configured, skipping event log cleanup');
            return;
        }
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
        for (const table of Object.values(_types.EventLogTable)){
            const tableName = CLICKHOUSE_TABLE_NAMES[table];
            try {
                // ClickHouse ALTER TABLE DELETE is async by default
                // We use lightweight deletes (mutations) which are efficient
                const success = await this.clickHouseService.executeCommand(`ALTER TABLE ${tableName} DELETE WHERE "workspaceId" = {workspaceId:String} AND "timestamp" < {cutoffDate:DateTime64(3)}`, {
                    workspaceId,
                    cutoffDate: (0, _clickHouseutil.formatDateTimeForClickHouse)(cutoffDate)
                });
                if (success) {
                    this.logger.log(`Scheduled deletion of old ${tableName} events for workspace ${workspaceId} (retention: ${retentionDays} days)`);
                } else {
                    this.logger.warn(`Failed to schedule deletion for ${tableName} in workspace ${workspaceId}`);
                }
            } catch (error) {
                this.logger.error(`Error cleaning up ${tableName} for workspace ${workspaceId}`, error instanceof Error ? error.stack : String(error));
            }
        }
    }
    constructor(clickHouseService){
        this.clickHouseService = clickHouseService;
        this.logger = new _common.Logger(EventLogCleanupService.name);
    }
};
EventLogCleanupService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _clickHouseservice.ClickHouseService === "undefined" ? Object : _clickHouseservice.ClickHouseService
    ])
], EventLogCleanupService);

//# sourceMappingURL=event-log-cleanup.service.js.map