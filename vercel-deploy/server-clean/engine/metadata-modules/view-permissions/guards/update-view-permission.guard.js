"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateViewPermissionGuard", {
    enumerable: true,
    get: function() {
        return UpdateViewPermissionGuard;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _viewaccessservice = require("../services/view-access.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateViewPermissionGuard = class UpdateViewPermissionGuard {
    async canActivate(context) {
        const gqlContext = _graphql.GqlExecutionContext.create(context);
        const request = gqlContext.getContext().req;
        let viewId = null;
        // For GraphQL: extract from args
        const args = gqlContext.getArgs();
        if (typeof args?.id === 'string') {
            viewId = args.id;
        }
        // For REST: extract from URL params
        if (!viewId && typeof request.params?.id === 'string') {
            viewId = request.params.id;
        }
        return this.viewAccessService.canUserModifyView(viewId, request.userWorkspaceId, request.workspace.id, request.apiKey?.id);
    }
    constructor(viewAccessService){
        this.viewAccessService = viewAccessService;
    }
};
UpdateViewPermissionGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewaccessservice.ViewAccessService === "undefined" ? Object : _viewaccessservice.ViewAccessService
    ])
], UpdateViewPermissionGuard);

//# sourceMappingURL=update-view-permission.guard.js.map