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
    get InstanceUpgradeStatusDTO () {
        return InstanceUpgradeStatusDTO;
    },
    get LatestUpgradeCommandDTO () {
        return LatestUpgradeCommandDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _upgradehealthenum = require("./upgrade-health.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LatestUpgradeCommandDTO = class LatestUpgradeCommandDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], LatestUpgradeCommandDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", typeof UpgradeMigrationStatus === "undefined" ? Object : UpgradeMigrationStatus)
], LatestUpgradeCommandDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], LatestUpgradeCommandDTO.prototype, "executedByVersion", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], LatestUpgradeCommandDTO.prototype, "errorMessage", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LatestUpgradeCommandDTO.prototype, "createdAt", void 0);
LatestUpgradeCommandDTO = _ts_decorate([
    (0, _graphql.ObjectType)('LatestUpgradeCommand')
], LatestUpgradeCommandDTO);
let InstanceUpgradeStatusDTO = class InstanceUpgradeStatusDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], InstanceUpgradeStatusDTO.prototype, "inferredVersion", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_upgradehealthenum.UpgradeHealthEnum),
    _ts_metadata("design:type", typeof _upgradehealthenum.UpgradeHealthEnum === "undefined" ? Object : _upgradehealthenum.UpgradeHealthEnum)
], InstanceUpgradeStatusDTO.prototype, "health", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>LatestUpgradeCommandDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], InstanceUpgradeStatusDTO.prototype, "latestCommand", void 0);
InstanceUpgradeStatusDTO = _ts_decorate([
    (0, _graphql.ObjectType)('InstanceUpgradeStatus')
], InstanceUpgradeStatusDTO);

//# sourceMappingURL=instance-upgrade-status.dto.js.map