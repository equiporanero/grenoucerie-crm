"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemAccessService", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemAccessService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _navigationmenuitemexception = require("../navigation-menu-item.exception");
const _permissionsexception = require("../../permissions/permissions.exception");
const _permissionsservice = require("../../permissions/permissions.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NavigationMenuItemAccessService = class NavigationMenuItemAccessService {
    async canUserCreateNavigationMenuItem({ userWorkspaceId, workspaceId, apiKeyId, applicationId, inputUserWorkspaceId }) {
        if (!(0, _utils.isDefined)(inputUserWorkspaceId)) {
            const hasPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
                userWorkspaceId,
                workspaceId,
                setting: _constants.PermissionFlagType.LAYOUTS,
                apiKeyId,
                applicationId
            });
            if (!hasPermission) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "sjYS9x",
                        message: "You do not have permission to create workspace-level navigation menu items. Please contact your workspace administrator for access."
                    }
                });
            }
            return true;
        }
        if (!(0, _utils.isDefined)(userWorkspaceId)) {
            throw new _navigationmenuitemexception.NavigationMenuItemException('User-level navigation menu items can only be created by authenticated users', _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT);
        }
        return true;
    }
    async canUserUpdateNavigationMenuItem({ userWorkspaceId, workspaceId, apiKeyId, applicationId, existingUserWorkspaceId }) {
        if (!(0, _utils.isDefined)(existingUserWorkspaceId)) {
            const hasPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
                userWorkspaceId,
                workspaceId,
                setting: _constants.PermissionFlagType.LAYOUTS,
                apiKeyId,
                applicationId
            });
            if (!hasPermission) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "RZzKii",
                        message: "You do not have permission to update workspace-level navigation menu items. Please contact your workspace administrator for access."
                    }
                });
            }
            return true;
        }
        if (!(0, _utils.isDefined)(userWorkspaceId)) {
            throw new _navigationmenuitemexception.NavigationMenuItemException('User-level navigation menu items can only be updated by authenticated users', _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT);
        }
        if (existingUserWorkspaceId !== userWorkspaceId) {
            throw new _navigationmenuitemexception.NavigationMenuItemException('You can only update your own navigation menu items', _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT);
        }
        return true;
    }
    async canUserDeleteNavigationMenuItem({ userWorkspaceId, workspaceId, apiKeyId, applicationId, existingUserWorkspaceId }) {
        if (!(0, _utils.isDefined)(existingUserWorkspaceId)) {
            const hasPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
                userWorkspaceId,
                workspaceId,
                setting: _constants.PermissionFlagType.LAYOUTS,
                apiKeyId,
                applicationId
            });
            if (!hasPermission) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "NuG0g3",
                        message: "You do not have permission to delete workspace-level navigation menu items. Please contact your workspace administrator for access."
                    }
                });
            }
            return true;
        }
        if (!(0, _utils.isDefined)(userWorkspaceId)) {
            throw new _navigationmenuitemexception.NavigationMenuItemException('User-level navigation menu items can only be deleted by authenticated users', _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT);
        }
        if (existingUserWorkspaceId !== userWorkspaceId) {
            throw new _navigationmenuitemexception.NavigationMenuItemException('You can only delete your own navigation menu items', _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT);
        }
        return true;
    }
    constructor(permissionsService){
        this.permissionsService = permissionsService;
    }
};
NavigationMenuItemAccessService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], NavigationMenuItemAccessService);

//# sourceMappingURL=navigation-menu-item-access.service.js.map