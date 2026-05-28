"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelTopWorkspaceDTO", {
    enumerable: true,
    get: function() {
        return AdminPanelTopWorkspaceDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelTopWorkspaceDTO = class AdminPanelTopWorkspaceDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], AdminPanelTopWorkspaceDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelTopWorkspaceDTO.prototype, "logoUrl", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminPanelTopWorkspaceDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], AdminPanelTopWorkspaceDTO.prototype, "totalUsers", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminPanelTopWorkspaceDTO.prototype, "subdomain", void 0);
AdminPanelTopWorkspaceDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AdminPanelTopWorkspace')
], AdminPanelTopWorkspaceDTO);

//# sourceMappingURL=admin-panel-top-workspace.dto.js.map