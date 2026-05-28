"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceUrlsAndIdDTO", {
    enumerable: true,
    get: function() {
        return WorkspaceUrlsAndIdDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspaceurlsdto = require("./workspace-urls.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceUrlsAndIdDTO = class WorkspaceUrlsAndIdDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_workspaceurlsdto.WorkspaceUrlsDTO),
    _ts_metadata("design:type", typeof _workspaceurlsdto.WorkspaceUrlsDTO === "undefined" ? Object : _workspaceurlsdto.WorkspaceUrlsDTO)
], WorkspaceUrlsAndIdDTO.prototype, "workspaceUrls", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], WorkspaceUrlsAndIdDTO.prototype, "id", void 0);
WorkspaceUrlsAndIdDTO = _ts_decorate([
    (0, _graphql.ObjectType)('WorkspaceUrlsAndId')
], WorkspaceUrlsAndIdDTO);

//# sourceMappingURL=workspace-subdomain-id.dto.js.map