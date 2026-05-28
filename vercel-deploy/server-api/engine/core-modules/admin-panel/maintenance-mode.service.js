"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MaintenanceModeService", {
    enumerable: true,
    get: function() {
        return MaintenanceModeService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _adminpanelexception = require("./admin-panel.exception");
const _keyvaluepairentity = require("../key-value-pair/key-value-pair.entity");
const _keyvaluepairservice = require("../key-value-pair/key-value-pair.service");
const _uservarsservice = require("../user/user-vars/services/user-vars.service");
const _maintenancemodebannerkeyvaluetype = require("./types/maintenance-mode-banner-key-value.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const MAINTENANCE_MODE_KEY = 'MAINTENANCE_MODE';
let MaintenanceModeService = class MaintenanceModeService {
    async clearMaintenanceModeBannerDismissals() {
        await this.userVarsService.delete({
            key: _maintenancemodebannerkeyvaluetype.MAINTENANCE_MODE_BANNER_DISMISSED_KEY
        });
    }
    async getMaintenanceMode() {
        const maintenanceModeKeyValuePairs = await this.keyValuePairService.get({
            userId: null,
            workspaceId: null,
            type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
            key: MAINTENANCE_MODE_KEY
        });
        if (maintenanceModeKeyValuePairs.length === 0) {
            return null;
        }
        const value = maintenanceModeKeyValuePairs[0]?.value;
        if (!(0, _utils.isDefined)(value) || !(0, _guards.isNonEmptyString)(value.startAt) || !(0, _guards.isNonEmptyString)(value.endAt)) {
            return null;
        }
        return value;
    }
    async setMaintenanceMode(value) {
        if (new Date(value.endAt) <= new Date(value.startAt)) {
            throw new _adminpanelexception.AdminPanelException('Maintenance mode end date must be after start date', _adminpanelexception.AdminPanelExceptionCode.INVALID_MAINTENANCE_MODE_TIME_RANGE);
        }
        await this.clearMaintenanceModeBannerDismissals();
        await this.keyValuePairService.set({
            userId: null,
            workspaceId: null,
            type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
            key: MAINTENANCE_MODE_KEY,
            value
        });
    }
    async clearMaintenanceMode() {
        await this.clearMaintenanceModeBannerDismissals();
        await this.keyValuePairService.delete({
            userId: null,
            workspaceId: null,
            type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
            key: MAINTENANCE_MODE_KEY
        });
    }
    async isMaintenanceModeBannerDismissed(userId, workspaceId) {
        const isDismissed = await this.userVarsService.get({
            userId,
            workspaceId,
            key: _maintenancemodebannerkeyvaluetype.MAINTENANCE_MODE_BANNER_DISMISSED_KEY
        });
        return isDismissed === true;
    }
    async dismissMaintenanceModeBanner(userId, workspaceId) {
        await this.userVarsService.set({
            userId,
            workspaceId,
            key: _maintenancemodebannerkeyvaluetype.MAINTENANCE_MODE_BANNER_DISMISSED_KEY,
            value: true
        });
    }
    constructor(keyValuePairService, userVarsService){
        this.keyValuePairService = keyValuePairService;
        this.userVarsService = userVarsService;
    }
};
MaintenanceModeService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _keyvaluepairservice.KeyValuePairService === "undefined" ? Object : _keyvaluepairservice.KeyValuePairService,
        typeof _uservarsservice.UserVarsService === "undefined" ? Object : _uservarsservice.UserVarsService
    ])
], MaintenanceModeService);

//# sourceMappingURL=maintenance-mode.service.js.map