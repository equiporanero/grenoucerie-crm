"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentMessagePartResolver", {
    enumerable: true,
    get: function() {
        return AgentMessagePartResolver;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _fileurlservice = require("../../../../core-modules/file/file-url/file-url.service");
const _workspaceentity = require("../../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../../decorators/auth/auth-workspace.decorator");
const _agentmessagepartdto = require("../dtos/agent-message-part.dto");
const _agentmessagepartentity = require("../entities/agent-message-part.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AgentMessagePartResolver = class AgentMessagePartResolver {
    async fileUrl(part, workspace) {
        if (!part.fileId) {
            return null;
        }
        return this.fileUrlService.signFileByIdUrl({
            fileId: part.fileId,
            workspaceId: workspace.id,
            fileFolder: _types.FileFolder.AgentChat
        });
    }
    fileMediaType(part) {
        return part.file?.mimeType ?? null;
    }
    constructor(fileUrlService){
        this.fileUrlService = fileUrlService;
    }
};
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentmessagepartentity.AgentMessagePartEntity === "undefined" ? Object : _agentmessagepartentity.AgentMessagePartEntity,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentMessagePartResolver.prototype, "fileUrl", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentmessagepartentity.AgentMessagePartEntity === "undefined" ? Object : _agentmessagepartentity.AgentMessagePartEntity
    ]),
    _ts_metadata("design:returntype", Object)
], AgentMessagePartResolver.prototype, "fileMediaType", null);
AgentMessagePartResolver = _ts_decorate([
    (0, _graphql.Resolver)(()=>_agentmessagepartdto.AgentMessagePartDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService
    ])
], AgentMessagePartResolver);

//# sourceMappingURL=agent-message-part.resolver.js.map