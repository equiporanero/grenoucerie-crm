"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelHealthServiceDataDTO", {
    enumerable: true,
    get: function() {
        return AdminPanelHealthServiceDataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _adminpanelworkerqueuehealthdto = require("./admin-panel-worker-queue-health.dto");
const _adminpanelhealthservicestatusenum = require("../enums/admin-panel-health-service-status.enum");
const _healthindicatoridenum = require("../enums/health-indicator-id.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelHealthServiceDataDTO = class AdminPanelHealthServiceDataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_healthindicatoridenum.HealthIndicatorId),
    _ts_metadata("design:type", typeof _healthindicatoridenum.HealthIndicatorId === "undefined" ? Object : _healthindicatoridenum.HealthIndicatorId)
], AdminPanelHealthServiceDataDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminPanelHealthServiceDataDTO.prototype, "label", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminPanelHealthServiceDataDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus),
    _ts_metadata("design:type", typeof _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus === "undefined" ? Object : _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus)
], AdminPanelHealthServiceDataDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AdminPanelHealthServiceDataDTO.prototype, "errorMessage", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AdminPanelHealthServiceDataDTO.prototype, "details", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _adminpanelworkerqueuehealthdto.AdminPanelWorkerQueueHealthDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], AdminPanelHealthServiceDataDTO.prototype, "queues", void 0);
AdminPanelHealthServiceDataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AdminPanelHealthServiceData')
], AdminPanelHealthServiceDataDTO);

//# sourceMappingURL=admin-panel-health-service-data.dto.js.map