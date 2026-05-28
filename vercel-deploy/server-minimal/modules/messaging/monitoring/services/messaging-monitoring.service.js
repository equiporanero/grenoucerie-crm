"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMonitoringService", {
    enumerable: true,
    get: function() {
        return MessagingMonitoringService;
    }
});
const _common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagingMonitoringService = class MessagingMonitoringService {
    async track({ eventName: _eventName, workspaceId: _workspaceId, userId: _userId, connectedAccountId: _connectedAccountId, messageChannelId: _messageChannelId, message: _message }) {
    // TODO: replace once we have Prometheus
    /*
    await this.auditService
      .createContext({
        userId,
        workspaceId,
      })
      .insertWorkspaceEvent(MONITORING_EVENT, {
        eventName: `messaging.${eventName}`,
        connectedAccountId,
        messageChannelId,
        message,
      }); */ }
    constructor(){}
};
MessagingMonitoringService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], MessagingMonitoringService);

//# sourceMappingURL=messaging-monitoring.service.js.map