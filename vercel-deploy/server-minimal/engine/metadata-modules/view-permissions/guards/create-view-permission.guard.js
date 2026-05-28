"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateViewPermissionGuard", {
    enumerable: true,
    get: function() {
        return CreateViewPermissionGuard;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
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
let CreateViewPermissionGuard = class CreateViewPermissionGuard {
    async canActivate(context) {
        const gqlContext = _graphql.GqlExecutionContext.create(context);
        const request = gqlContext.getContext().req;
        let visibility = _types.ViewVisibility.WORKSPACE;
        // For GraphQL: extract from args.input
        const args = gqlContext.getArgs();
        if (args?.input?.visibility) {
            visibility = args.input.visibility;
        }
        // For REST: extract from request body
        if (!args?.input && request.body?.visibility) {
            visibility = request.body.visibility;
        }
        return this.viewAccessService.canUserCreateView(visibility, request.userWorkspaceId, request.workspace.id, request.apiKey?.id);
    }
    constructor(viewAccessService){
        this.viewAccessService = viewAccessService;
    }
};
CreateViewPermissionGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewaccessservice.ViewAccessService === "undefined" ? Object : _viewaccessservice.ViewAccessService
    ])
], CreateViewPermissionGuard);

//# sourceMappingURL=create-view-permission.guard.js.map