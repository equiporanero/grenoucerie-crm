"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClickHouseApplicationLogDriver", {
    enumerable: true,
    get: function() {
        return ClickHouseApplicationLogDriver;
    }
});
const _common = require("@nestjs/common");
const _clickHouseutil = require("../../../../database/clickHouse/clickHouse.util");
let ClickHouseApplicationLogDriver = class ClickHouseApplicationLogDriver {
    async writeLogs(entries) {
        if (entries.length === 0) {
            return;
        }
        const rows = entries.map((entry)=>({
                timestamp: (0, _clickHouseutil.formatDateTimeForClickHouse)(entry.timestamp),
                workspaceId: entry.workspaceId,
                applicationId: entry.applicationId,
                logicFunctionId: entry.logicFunctionId,
                logicFunctionName: entry.logicFunctionName,
                executionId: entry.executionId,
                level: entry.level,
                message: entry.message
            }));
        const result = await this.clickHouseService.insert('applicationLog', rows);
        if (!result.success) {
            this.logger.error('Failed to insert application logs into ClickHouse');
        }
    }
    constructor(clickHouseService){
        this.clickHouseService = clickHouseService;
        this.logger = new _common.Logger(ClickHouseApplicationLogDriver.name);
    }
};

//# sourceMappingURL=clickhouse.driver.js.map