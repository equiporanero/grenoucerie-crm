"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewAccessService", {
    enumerable: true,
    get: function() {
        return ViewAccessService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _types = require("twenty-shared/types");
const _permissionsservice = require("../../permissions/permissions.service");
const _viewexception = require("../../view/exceptions/view.exception");
const _viewservice = require("../../view/services/view.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ViewAccessService = class ViewAccessService {
    async canUserModifyView(viewId, userWorkspaceId, workspaceId, apiKeyId) {
        // If viewId is null, the entity doesn't exist - allow the operation
        // so the service can handle the NOT_FOUND error properly
        if (!viewId) {
            return true;
        }
        const view = await this.viewService.findByIdIncludingDeleted(viewId, workspaceId);
        // If view doesn't exist, allow through to service for proper error message
        if (!view) {
            return true;
        }
        return this.checkViewAccess(view, userWorkspaceId, workspaceId, apiKeyId);
    }
    async canUserModifyViewByChildEntity(viewId, userWorkspaceId, workspaceId, apiKeyId) {
        // If viewId is null, the child entity doesn't exist
        // Allow through so the service can throw the proper entity-specific error
        // (e.g., "View field not found" instead of generic "View not found")
        if (!viewId) {
            return true;
        }
        const view = await this.viewService.findByIdIncludingDeleted(viewId, workspaceId);
        // If view doesn't exist, allow through to service for proper error message
        if (!view) {
            return true;
        }
        return this.checkViewAccess(view, userWorkspaceId, workspaceId, apiKeyId);
    }
    async canUserCreateView(visibility, userWorkspaceId, workspaceId, apiKeyId) {
        // UNLISTED views can only be created by users (not API keys)
        if (visibility === _types.ViewVisibility.UNLISTED) {
            if (!(0, _utils.isDefined)(userWorkspaceId)) {
                this.throwCreatePermissionDenied();
            }
            return true;
        }
        // WORKSPACE visibility views require VIEWS permission
        const hasPermission = await this.hasViewsPermission(userWorkspaceId, workspaceId, apiKeyId);
        if (!hasPermission) {
            this.throwCreatePermissionDenied();
        }
        return true;
    }
    async checkViewAccess(view, userWorkspaceId, workspaceId, apiKeyId) {
        const hasPermission = await this.hasViewsPermission(userWorkspaceId, workspaceId, apiKeyId);
        if (hasPermission) {
            return true;
        }
        // Users without VIEWS permission can only manipulate their own unlisted views
        const isOwnUnlistedView = view.visibility === _types.ViewVisibility.UNLISTED && view.createdByUserWorkspaceId === userWorkspaceId;
        if (isOwnUnlistedView) {
            return true;
        }
        this.throwModifyPermissionDenied();
    }
    async hasViewsPermission(userWorkspaceId, workspaceId, apiKeyId) {
        if ((0, _utils.isDefined)(userWorkspaceId)) {
            const permissions = await this.permissionsService.getUserWorkspacePermissions({
                userWorkspaceId,
                workspaceId
            });
            return permissions.permissionFlags[_constants.PermissionFlagType.VIEWS] ?? false;
        }
        if ((0, _utils.isDefined)(apiKeyId)) {
            return this.permissionsService.userHasWorkspaceSettingPermission({
                workspaceId,
                apiKeyId,
                setting: _constants.PermissionFlagType.VIEWS
            });
        }
        return false;
    }
    throwCreatePermissionDenied() {
        throw new _viewexception.ViewException((0, _viewexception.generateViewExceptionMessage)(_viewexception.ViewExceptionMessageKey.VIEW_CREATE_PERMISSION_DENIED), _viewexception.ViewExceptionCode.VIEW_CREATE_PERMISSION_DENIED, {
            userFriendlyMessage: (0, _viewexception.generateViewUserFriendlyExceptionMessage)(_viewexception.ViewExceptionMessageKey.VIEW_CREATE_PERMISSION_DENIED)
        });
    }
    throwModifyPermissionDenied() {
        throw new _viewexception.ViewException((0, _viewexception.generateViewExceptionMessage)(_viewexception.ViewExceptionMessageKey.VIEW_MODIFY_PERMISSION_DENIED), _viewexception.ViewExceptionCode.VIEW_MODIFY_PERMISSION_DENIED, {
            userFriendlyMessage: (0, _viewexception.generateViewUserFriendlyExceptionMessage)(_viewexception.ViewExceptionMessageKey.VIEW_MODIFY_PERMISSION_DENIED)
        });
    }
    constructor(viewService, permissionsService){
        this.viewService = viewService;
        this.permissionsService = permissionsService;
    }
};
ViewAccessService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], ViewAccessService);

//# sourceMappingURL=view-access.service.js.map