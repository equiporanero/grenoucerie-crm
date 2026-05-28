"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelRecentUserDTO", {
    enumerable: true,
    get: function() {
        return AdminPanelRecentUserDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _userlookupdto = require("./user-lookup.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelRecentUserDTO = class AdminPanelRecentUserDTO extends _userlookupdto.UserInfoDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelRecentUserDTO.prototype, "workspaceName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelRecentUserDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelRecentUserDTO.prototype, "workspaceLogo", void 0);
AdminPanelRecentUserDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AdminPanelRecentUser')
], AdminPanelRecentUserDTO);

//# sourceMappingURL=admin-panel-recent-user.dto.js.map