"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImpersonatePermissionGuard", {
    enumerable: true,
    get: function() {
        return ImpersonatePermissionGuard;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _constants = require("twenty-shared/constants");
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
let ImpersonatePermissionGuard = class ImpersonatePermissionGuard {
    async canActivate(context) {
        const ctx = _graphql.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const userWorkspaceId = request.userWorkspaceId;
        const workspaceId = request.workspace.id;
        if (!(0, _classvalidator.isDefined)(userWorkspaceId)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "2oVE+z",
                    message: "Can't impersonate user via api key"
                }
            });
        }
        if (request.user.canImpersonate === true) return true;
        const hasPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
            userWorkspaceId,
            setting: _constants.PermissionFlagType.IMPERSONATE,
            workspaceId
        });
        if (hasPermission === true) return true;
        throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
            userFriendlyMessage: /*i18n*/ {
                id: "+2vVRB",
                message: "You do not have permission to impersonate users. Please contact your workspace administrator for access."
            }
        });
    }
    constructor(permissionsService){
        this.permissionsService = permissionsService;
    }
};
ImpersonatePermissionGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], ImpersonatePermissionGuard);

//# sourceMappingURL=impersonate-permission.guard.js.map