"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SettingsPermissionGuard", {
    enumerable: true,
    get: function() {
        return SettingsPermissionGuard;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _workspace = require("twenty-shared/workspace");
const _permissionsexception = require("../metadata-modules/permissions/permissions.exception");
const _permissionsservice = require("../metadata-modules/permissions/permissions.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const SettingsPermissionGuard = (requiredPermission)=>{
    let SettingsPermissionMixin = class SettingsPermissionMixin {
        async canActivate(context) {
            const ctx = _graphql.GqlExecutionContext.create(context);
            const workspaceId = ctx.getContext().req.workspace.id;
            const userWorkspaceId = ctx.getContext().req.userWorkspaceId;
            const workspaceActivationStatus = ctx.getContext().req.workspace.activationStatus;
            if ([
                _workspace.WorkspaceActivationStatus.PENDING_CREATION,
                _workspace.WorkspaceActivationStatus.ONGOING_CREATION
            ].includes(workspaceActivationStatus)) {
                return true;
            }
            const hasPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
                userWorkspaceId,
                setting: requiredPermission,
                workspaceId,
                apiKeyId: ctx.getContext().req.apiKey?.id,
                applicationId: ctx.getContext().req.application?.id
            });
            if (hasPermission === true) {
                return true;
            }
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "EFQeXU",
                    message: "You do not have permission to access this feature. Please contact your workspace administrator for access."
                }
            });
        }
        constructor(permissionsService){
            this.permissionsService = permissionsService;
        }
    };
    SettingsPermissionMixin = _ts_decorate([
        (0, _common.Injectable)(),
        _ts_metadata("design:type", Function),
        _ts_metadata("design:paramtypes", [
            typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
        ])
    ], SettingsPermissionMixin);
    return (0, _common.mixin)(SettingsPermissionMixin);
};

//# sourceMappingURL=settings-permission.guard.js.map