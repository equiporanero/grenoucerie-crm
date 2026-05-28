"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceUpgradeStatusDTO", {
    enumerable: true,
    get: function() {
        return WorkspaceUpgradeStatusDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _instanceupgradestatusdto = require("./instance-upgrade-status.dto");
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
let WorkspaceUpgradeStatusDTO = class WorkspaceUpgradeStatusDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], WorkspaceUpgradeStatusDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkspaceUpgradeStatusDTO.prototype, "displayName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkspaceUpgradeStatusDTO.prototype, "inferredVersion", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_upgradehealthenum.UpgradeHealthEnum),
    _ts_metadata("design:type", typeof _upgradehealthenum.UpgradeHealthEnum === "undefined" ? Object : _upgradehealthenum.UpgradeHealthEnum)
], WorkspaceUpgradeStatusDTO.prototype, "health", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_instanceupgradestatusdto.LatestUpgradeCommandDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkspaceUpgradeStatusDTO.prototype, "latestCommand", void 0);
WorkspaceUpgradeStatusDTO = _ts_decorate([
    (0, _graphql.ObjectType)('WorkspaceUpgradeStatus')
], WorkspaceUpgradeStatusDTO);

//# sourceMappingURL=workspace-upgrade-status.dto.js.map