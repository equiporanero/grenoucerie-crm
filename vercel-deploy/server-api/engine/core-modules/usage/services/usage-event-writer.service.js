/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsageEventWriterService", {
    enumerable: true,
    get: function() {
        return UsageEventWriterService;
    }
});
const _common = require("@nestjs/common");
const _clickHouseservice = require("../../../../database/clickHouse/clickHouse.service");
const _clickHouseutil = require("../../../../database/clickHouse/clickHouse.util");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UsageEventWriterService = class UsageEventWriterService {
    writeToClickHouse(workspaceId, usageEvents) {
        if (!this.twentyConfigService.get('CLICKHOUSE_URL')) {
            return;
        }
        const now = (0, _clickHouseutil.formatDateTimeForClickHouse)(new Date());
        const rows = usageEvents.map((usageEvent)=>({
                timestamp: now,
                workspaceId,
                periodStart: usageEvent.periodStart ? (0, _clickHouseutil.formatDateTimeForClickHouse)(usageEvent.periodStart) : undefined,
                userWorkspaceId: usageEvent.userWorkspaceId ?? '',
                resourceType: usageEvent.resourceType,
                operationType: usageEvent.operationType,
                quantity: usageEvent.quantity,
                unit: usageEvent.unit,
                creditsUsedMicro: usageEvent.creditsUsedMicro,
                resourceId: usageEvent.resourceId ?? '',
                resourceContext: usageEvent.resourceContext ?? '',
                metadata: {}
            }));
        this.clickHouseService.insert('usageEvent', rows).catch((error)=>{
            this.logger.error('Failed to write usage events to ClickHouse', error);
        });
    }
    constructor(clickHouseService, twentyConfigService){
        this.clickHouseService = clickHouseService;
        this.twentyConfigService = twentyConfigService;
        this.logger = new _common.Logger(UsageEventWriterService.name);
    }
};
UsageEventWriterService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _clickHouseservice.ClickHouseService === "undefined" ? Object : _clickHouseservice.ClickHouseService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], UsageEventWriterService);

//# sourceMappingURL=usage-event-writer.service.js.map