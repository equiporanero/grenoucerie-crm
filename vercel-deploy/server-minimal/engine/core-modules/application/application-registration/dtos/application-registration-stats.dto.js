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
    get ApplicationRegistrationStatsDTO () {
        return ApplicationRegistrationStatsDTO;
    },
    get VersionDistributionEntryDTO () {
        return VersionDistributionEntryDTO;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let VersionDistributionEntryDTO = class VersionDistributionEntryDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], VersionDistributionEntryDTO.prototype, "version", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], VersionDistributionEntryDTO.prototype, "count", void 0);
VersionDistributionEntryDTO = _ts_decorate([
    (0, _graphql.ObjectType)('VersionDistributionEntry')
], VersionDistributionEntryDTO);
let ApplicationRegistrationStatsDTO = class ApplicationRegistrationStatsDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], ApplicationRegistrationStatsDTO.prototype, "activeInstalls", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationStatsDTO.prototype, "mostInstalledVersion", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            VersionDistributionEntryDTO
        ]),
    _ts_metadata("design:type", Array)
], ApplicationRegistrationStatsDTO.prototype, "versionDistribution", void 0);
ApplicationRegistrationStatsDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ApplicationRegistrationStats')
], ApplicationRegistrationStatsDTO);

//# sourceMappingURL=application-registration-stats.dto.js.map