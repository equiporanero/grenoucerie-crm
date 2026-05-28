"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InstanceAndAllWorkspacesUpgradeStatusDTO", {
    enumerable: true,
    get: function() {
        return InstanceAndAllWorkspacesUpgradeStatusDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _instanceupgradestatusdto = require("./instance-upgrade-status.dto");
const _workspaceupgraderefdto = require("./workspace-upgrade-ref.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let InstanceAndAllWorkspacesUpgradeStatusDTO = class InstanceAndAllWorkspacesUpgradeStatusDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_instanceupgradestatusdto.InstanceUpgradeStatusDTO),
    _ts_metadata("design:type", typeof _instanceupgradestatusdto.InstanceUpgradeStatusDTO === "undefined" ? Object : _instanceupgradestatusdto.InstanceUpgradeStatusDTO)
], InstanceAndAllWorkspacesUpgradeStatusDTO.prototype, "instanceUpgradeStatus", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _workspaceupgraderefdto.WorkspaceUpgradeRefDTO
        ]),
    _ts_metadata("design:type", Array)
], InstanceAndAllWorkspacesUpgradeStatusDTO.prototype, "workspacesBehind", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _workspaceupgraderefdto.WorkspaceUpgradeRefDTO
        ]),
    _ts_metadata("design:type", Array)
], InstanceAndAllWorkspacesUpgradeStatusDTO.prototype, "workspacesFailed", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], InstanceAndAllWorkspacesUpgradeStatusDTO.prototype, "upToDateWorkspaceCount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], InstanceAndAllWorkspacesUpgradeStatusDTO.prototype, "computedAt", void 0);
InstanceAndAllWorkspacesUpgradeStatusDTO = _ts_decorate([
    (0, _graphql.ObjectType)('InstanceAndAllWorkspacesUpgradeStatus')
], InstanceAndAllWorkspacesUpgradeStatusDTO);

//# sourceMappingURL=instance-and-all-workspaces-upgrade-status.dto.js.map