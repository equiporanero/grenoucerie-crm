"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DestroyViewFilterPermissionGuard", {
    enumerable: true,
    get: function() {
        return DestroyViewFilterPermissionGuard;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _viewaccessservice = require("../services/view-access.service");
const _viewentitylookupservice = require("../services/view-entity-lookup.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DestroyViewFilterPermissionGuard = class DestroyViewFilterPermissionGuard {
    async canActivate(context) {
        const gqlContext = _graphql.GqlExecutionContext.create(context);
        const request = gqlContext.getContext().req;
        let entityId = '';
        // For GraphQL: extract from args.input.id
        const args = gqlContext.getArgs();
        if (typeof args?.input?.id === 'string') {
            entityId = args.input.id;
        }
        // For REST: extract from URL params
        if (!entityId && typeof request.params?.id === 'string') {
            entityId = request.params.id;
        }
        const viewId = entityId ? await this.viewEntityLookupService.findViewIdByEntityIdAndKind('viewFilter', entityId, request.workspace.id) : null;
        return this.viewAccessService.canUserModifyViewByChildEntity(viewId, request.userWorkspaceId, request.workspace.id, request.apiKey?.id);
    }
    constructor(viewAccessService, viewEntityLookupService){
        this.viewAccessService = viewAccessService;
        this.viewEntityLookupService = viewEntityLookupService;
    }
};
DestroyViewFilterPermissionGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewaccessservice.ViewAccessService === "undefined" ? Object : _viewaccessservice.ViewAccessService,
        typeof _viewentitylookupservice.ViewEntityLookupService === "undefined" ? Object : _viewentitylookupservice.ViewEntityLookupService
    ])
], DestroyViewFilterPermissionGuard);

//# sourceMappingURL=destroy-view-filter-permission.guard.js.map