"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get SystemHealthDTO () {
        return SystemHealthDTO;
    },
    get SystemHealthServiceDTO () {
        return SystemHealthServiceDTO;
    }
});
const _graphql = require("@nestjs/graphql");
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
let SystemHealthServiceDTO = class SystemHealthServiceDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_healthindicatoridenum.HealthIndicatorId),
    _ts_metadata("design:type", typeof _healthindicatoridenum.HealthIndicatorId === "undefined" ? Object : _healthindicatoridenum.HealthIndicatorId)
], SystemHealthServiceDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], SystemHealthServiceDTO.prototype, "label", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus),
    _ts_metadata("design:type", typeof _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus === "undefined" ? Object : _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus)
], SystemHealthServiceDTO.prototype, "status", void 0);
SystemHealthServiceDTO = _ts_decorate([
    (0, _graphql.ObjectType)('SystemHealthService')
], SystemHealthServiceDTO);
let SystemHealthDTO = class SystemHealthDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            SystemHealthServiceDTO
        ]),
    _ts_metadata("design:type", Array)
], SystemHealthDTO.prototype, "services", void 0);
SystemHealthDTO = _ts_decorate([
    (0, _graphql.ObjectType)('SystemHealth')
], SystemHealthDTO);

//# sourceMappingURL=system-health.dto.js.map