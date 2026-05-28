"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TelemetryListener", {
    enumerable: true,
    get: function() {
        return TelemetryListener;
    }
});
const _common = require("@nestjs/common");
const _oncustombatcheventdecorator = require("../../graphql-query-runner/decorators/on-custom-batch-event.decorator");
const _usersignupeventnameconstants = require("../constants/user-signup-event-name.constants");
const _auditservice = require("../../../../core-modules/audit/services/audit.service");
const _usersignup = require("../../../../core-modules/audit/utils/events/workspace-event/user/user-signup");
const _telemetryservice = require("../../../../core-modules/telemetry/telemetry.service");
const _customworkspacebatcheventtype = require("../../../../workspace-event-emitter/types/custom-workspace-batch-event.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TelemetryListener = class TelemetryListener {
    async handleUserSignup(payload) {
        await Promise.all(payload.events.map(async (eventPayload)=>this.auditService.createContext({
                userId: eventPayload.userId,
                workspaceId: payload.workspaceId
            }).insertWorkspaceEvent(_usersignup.USER_SIGNUP_EVENT, {})));
        await this.telemetryService.publish({
            action: _usersignupeventnameconstants.USER_SIGNUP_EVENT_NAME,
            events: payload.events
        });
    }
    constructor(auditService, telemetryService){
        this.auditService = auditService;
        this.telemetryService = telemetryService;
    }
};
_ts_decorate([
    (0, _oncustombatcheventdecorator.OnCustomBatchEvent)(_usersignupeventnameconstants.USER_SIGNUP_EVENT_NAME),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _customworkspacebatcheventtype.CustomWorkspaceEventBatch === "undefined" ? Object : _customworkspacebatcheventtype.CustomWorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], TelemetryListener.prototype, "handleUserSignup", null);
TelemetryListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _auditservice.AuditService === "undefined" ? Object : _auditservice.AuditService,
        typeof _telemetryservice.TelemetryService === "undefined" ? Object : _telemetryservice.TelemetryService
    ])
], TelemetryListener);

//# sourceMappingURL=telemetry.listener.js.map