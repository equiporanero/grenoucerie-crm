/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsageEventListener", {
    enumerable: true,
    get: function() {
        return UsageEventListener;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _oncustombatcheventdecorator = require("../../../api/graphql/graphql-query-runner/decorators/on-custom-batch-event.decorator");
const _usagerecordedconstant = require("../constants/usage-recorded.constant");
const _usageeventwriterservice = require("../services/usage-event-writer.service");
const _customworkspacebatcheventtype = require("../../../workspace-event-emitter/types/custom-workspace-batch-event.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UsageEventListener = class UsageEventListener {
    handleUsageRecordedEvent(payload) {
        if (!(0, _utils.isDefined)(payload.workspaceId)) {
            return;
        }
        this.usageEventWriterService.writeToClickHouse(payload.workspaceId, payload.events);
    }
    constructor(usageEventWriterService){
        this.usageEventWriterService = usageEventWriterService;
    }
};
_ts_decorate([
    (0, _oncustombatcheventdecorator.OnCustomBatchEvent)(_usagerecordedconstant.USAGE_RECORDED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _customworkspacebatcheventtype.CustomWorkspaceEventBatch === "undefined" ? Object : _customworkspacebatcheventtype.CustomWorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", void 0)
], UsageEventListener.prototype, "handleUsageRecordedEvent", null);
UsageEventListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usageeventwriterservice.UsageEventWriterService === "undefined" ? Object : _usageeventwriterservice.UsageEventWriterService
    ])
], UsageEventListener);

//# sourceMappingURL=usage-event.listener.js.map