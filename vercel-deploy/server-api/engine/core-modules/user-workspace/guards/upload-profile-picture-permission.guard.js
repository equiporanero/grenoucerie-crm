"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UploadProfilePicturePermissionGuard", {
    enumerable: true,
    get: function() {
        return UploadProfilePicturePermissionGuard;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _constants = require("twenty-shared/constants");
const _workspace = require("twenty-shared/workspace");
const _permissionsexception = require("../../../metadata-modules/permissions/permissions.exception");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UploadProfilePicturePermissionGuard = class UploadProfilePicturePermissionGuard {
    async canActivate(context) {
        const gqlContext = _graphql.GqlExecutionContext.create(context);
        const request = gqlContext.getContext().req;
        if (!(0, _classvalidator.isDefined)(request.workspace)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "JYc1v3",
                    message: "Workspace not found"
                }
            });
        }
        const workspaceId = request.workspace.id;
        const userWorkspaceId = request.userWorkspaceId;
        const workspaceActivationStatus = request.workspace.activationStatus;
        const apiKeyId = request.apiKey?.id;
        // Allow during workspace creation
        if ([
            _workspace.WorkspaceActivationStatus.PENDING_CREATION,
            _workspace.WorkspaceActivationStatus.ONGOING_CREATION
        ].includes(workspaceActivationStatus)) {
            return true;
        }
        // Check if user has WORKSPACE_MEMBERS permission (can edit any profile picture)
        const hasWorkspaceMembersPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
            userWorkspaceId,
            workspaceId,
            setting: _constants.PermissionFlagType.WORKSPACE_MEMBERS,
            apiKeyId
        });
        if (hasWorkspaceMembersPermission) {
            return true;
        }
        // Check if user has PROFILE_INFORMATION permission (can edit their own profile picture)
        const hasProfileInformationPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
            userWorkspaceId,
            workspaceId,
            setting: _constants.PermissionFlagType.PROFILE_INFORMATION,
            apiKeyId
        });
        if (hasProfileInformationPermission) {
            return true;
        }
        throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
            userFriendlyMessage: /*i18n*/ {
                id: "ZPo5fR",
                message: "You do not have permission to upload profile pictures. Please contact your workspace administrator for access."
            }
        });
    }
    constructor(permissionsService){
        this.permissionsService = permissionsService;
    }
};
UploadProfilePicturePermissionGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], UploadProfilePicturePermissionGuard);

//# sourceMappingURL=upload-profile-picture-permission.guard.js.map