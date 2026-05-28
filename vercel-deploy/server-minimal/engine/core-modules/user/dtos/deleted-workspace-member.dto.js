"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeletedWorkspaceMemberDTO", {
    enumerable: true,
    get: function() {
        return DeletedWorkspaceMemberDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspacememberdto = require("./workspace-member.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeletedWorkspaceMemberDTO = class DeletedWorkspaceMemberDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], DeletedWorkspaceMemberDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacememberdto.FullNameDTO),
    _ts_metadata("design:type", typeof _workspacememberdto.FullNameDTO === "undefined" ? Object : _workspacememberdto.FullNameDTO)
], DeletedWorkspaceMemberDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], DeletedWorkspaceMemberDTO.prototype, "userEmail", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], DeletedWorkspaceMemberDTO.prototype, "avatarUrl", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], DeletedWorkspaceMemberDTO.prototype, "userWorkspaceId", void 0);
DeletedWorkspaceMemberDTO = _ts_decorate([
    (0, _graphql.ObjectType)('DeletedWorkspaceMember')
], DeletedWorkspaceMemberDTO);

//# sourceMappingURL=deleted-workspace-member.dto.js.map