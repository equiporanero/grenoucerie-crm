"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionsService", {
    enumerable: true,
    get: function() {
        return PermissionsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _apikeyroleservice = require("../../core-modules/api-key/services/api-key-role.service");
const _applicationentity = require("../../core-modules/application/application.entity");
const _applicationexception = require("../../core-modules/application/application.exception");
const _toolpermissionflags = require("./constants/tool-permission-flags");
const _permissionsexception = require("./permissions.exception");
const _roleentity = require("../role/role.entity");
const _userroleservice = require("../user-role/user-role.service");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
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
let PermissionsService = class PermissionsService {
    isToolPermission(feature) {
        return _toolpermissionflags.TOOL_PERMISSION_FLAGS.includes(feature);
    }
    async getUserWorkspacePermissions({ userWorkspaceId, workspaceId }) {
        const [roleOfUserWorkspace] = await this.userRoleService.getRolesByUserWorkspaces({
            userWorkspaceIds: [
                userWorkspaceId
            ],
            workspaceId
        }).then((roles)=>roles?.get(userWorkspaceId) ?? []);
        if (!(0, _utils.isDefined)(roleOfUserWorkspace)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.NO_ROLE_FOUND_FOR_USER_WORKSPACE, _permissionsexception.PermissionsExceptionCode.NO_ROLE_FOUND_FOR_USER_WORKSPACE, {
                userFriendlyMessage: /*i18n*/ {
                    id: "XxkUFT",
                    message: "Your role in this workspace could not be found. Please contact your workspace administrator."
                }
            });
        }
        const defaultSettingsPermissions = this.getDefaultUserWorkspacePermissions().permissionFlags;
        const permissionFlags = Object.values(_constants.PermissionFlagType).reduce((acc, feature)=>{
            const hasBasePermission = this.isToolPermission(feature) ? roleOfUserWorkspace.canAccessAllTools : roleOfUserWorkspace.canUpdateAllSettings;
            return {
                ...acc,
                [feature]: hasBasePermission || this.roleHasPermissionFlag(roleOfUserWorkspace, feature)
            };
        }, defaultSettingsPermissions);
        const { rolesPermissions } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'rolesPermissions'
        ]);
        const objectsPermissions = rolesPermissions[roleOfUserWorkspace.id] ?? {};
        return {
            permissionFlags,
            objectsPermissions
        };
    }
    async userHasWorkspaceSettingPermission({ userWorkspaceId, workspaceId, setting, apiKeyId, applicationId }) {
        if ((0, _utils.isDefined)(apiKeyId)) {
            const roleId = await this.apiKeyRoleService.getRoleIdForApiKeyId(apiKeyId, workspaceId);
            const role = await this.roleRepository.findOne({
                where: {
                    id: roleId,
                    workspaceId
                },
                relations: [
                    'rolePermissionFlags',
                    'rolePermissionFlags.permissionFlag'
                ]
            });
            if (!(0, _utils.isDefined)(role)) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.API_KEY_ROLE_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.API_KEY_ROLE_NOT_FOUND, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "eC8p5b",
                        message: "The API key does not have a valid role assigned. Please check your API key configuration."
                    }
                });
            }
            return this.checkRolePermissions(role, setting);
        }
        if (userWorkspaceId) {
            const [roleOfUserWorkspace] = await this.userRoleService.getRolesByUserWorkspaces({
                userWorkspaceIds: [
                    userWorkspaceId
                ],
                workspaceId
            }).then((roles)=>roles?.get(userWorkspaceId) ?? []);
            if (!(0, _utils.isDefined)(roleOfUserWorkspace)) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.NO_ROLE_FOUND_FOR_USER_WORKSPACE, _permissionsexception.PermissionsExceptionCode.NO_ROLE_FOUND_FOR_USER_WORKSPACE, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "XxkUFT",
                        message: "Your role in this workspace could not be found. Please contact your workspace administrator."
                    }
                });
            }
            return this.checkRolePermissions(roleOfUserWorkspace, setting);
        }
        if (applicationId) {
            const application = await this.applicationRepository.findOne({
                where: {
                    id: applicationId,
                    workspaceId
                }
            });
            if (!(0, _utils.isDefined)(application) || !(0, _utils.isDefined)(application.defaultRoleId)) {
                throw new _applicationexception.ApplicationException(`Could not find application ${applicationId}`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
            }
            const applicationRoleId = application.defaultRoleId;
            const role = await this.roleRepository.findOne({
                where: {
                    id: applicationRoleId,
                    workspaceId
                },
                relations: [
                    'rolePermissionFlags',
                    'rolePermissionFlags.permissionFlag'
                ]
            });
            if (!(0, _utils.isDefined)(role)) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.APPLICATION_ROLE_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.APPLICATION_ROLE_NOT_FOUND, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "IU78DA",
                        message: "The application does not have a valid role assigned. Please check your application configuration."
                    }
                });
            }
            return this.checkRolePermissions(role, setting);
        }
        throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.NO_AUTHENTICATION_CONTEXT, _permissionsexception.PermissionsExceptionCode.NO_AUTHENTICATION_CONTEXT, {
            userFriendlyMessage: /*i18n*/ {
                id: "Tsx+z2",
                message: "Authentication is required to access this feature. Please sign in and try again."
            }
        });
    }
    checkRolePermissions(role, setting) {
        const hasBasePermission = this.isToolPermission(setting) ? role.canAccessAllTools : role.canUpdateAllSettings;
        if (hasBasePermission === true) {
            return true;
        }
        return this.roleHasPermissionFlag(role, setting);
    }
    roleHasPermissionFlag(role, flag) {
        const rolePermissionFlags = role.rolePermissionFlags ?? [];
        const permissionFlagUniversalIdentifier = _constants.SystemPermissionFlag[flag];
        return rolePermissionFlags.some((rolePermissionFlag)=>rolePermissionFlag.permissionFlag.universalIdentifier === permissionFlagUniversalIdentifier);
    }
    async getRolesFromPermissionConfig(rolePermissionConfig, workspaceId, relations = []) {
        if ('shouldBypassPermissionChecks' in rolePermissionConfig) {
            return null;
        }
        let roleIds = [];
        let useIntersection = false;
        if ('intersectionOf' in rolePermissionConfig) {
            roleIds = rolePermissionConfig.intersectionOf;
            useIntersection = true;
        } else if ('unionOf' in rolePermissionConfig) {
            roleIds = rolePermissionConfig.unionOf;
            useIntersection = false;
        }
        if (roleIds.length === 0) {
            throw new Error('No role IDs provided');
        }
        const roles = await this.roleRepository.find({
            where: {
                id: (0, _typeorm1.In)(roleIds),
                workspaceId
            },
            relations
        });
        if (roles.length !== roleIds.length) {
            throw new Error('Some roles not found');
        }
        return {
            roles,
            useIntersection
        };
    }
    async checkRolesPermissions(rolePermissionConfig, workspaceId, setting) {
        try {
            const result = await this.getRolesFromPermissionConfig(rolePermissionConfig, workspaceId, [
                'rolePermissionFlags',
                'rolePermissionFlags.permissionFlag'
            ]);
            if (result === null) {
                return true;
            }
            const { roles, useIntersection } = result;
            return useIntersection ? roles.every((role)=>this.checkRolePermissions(role, setting)) : roles.some((role)=>this.checkRolePermissions(role, setting));
        } catch  {
            return false;
        }
    }
    async hasToolPermission(rolePermissionConfig, workspaceId, flag) {
        try {
            const result = await this.getRolesFromPermissionConfig(rolePermissionConfig, workspaceId, [
                'rolePermissionFlags',
                'rolePermissionFlags.permissionFlag'
            ]);
            if (result === null) {
                return true;
            }
            const { roles, useIntersection } = result;
            const checkRoleHasPermission = (role)=>{
                if (role.canAccessAllTools === true) {
                    return true;
                }
                return this.roleHasPermissionFlag(role, flag);
            };
            return useIntersection ? roles.every(checkRoleHasPermission) : roles.some(checkRoleHasPermission);
        } catch  {
            return false;
        }
    }
    constructor(userRoleService, workspaceCacheService, apiKeyRoleService, roleRepository, applicationRepository){
        this.userRoleService = userRoleService;
        this.workspaceCacheService = workspaceCacheService;
        this.apiKeyRoleService = apiKeyRoleService;
        this.roleRepository = roleRepository;
        this.applicationRepository = applicationRepository;
        this.getDefaultUserWorkspacePermissions = ()=>({
                permissionFlags: {
                    [_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS]: false,
                    [_constants.PermissionFlagType.WORKSPACE]: false,
                    [_constants.PermissionFlagType.WORKSPACE_MEMBERS]: false,
                    [_constants.PermissionFlagType.ROLES]: false,
                    [_constants.PermissionFlagType.DATA_MODEL]: false,
                    [_constants.PermissionFlagType.SECURITY]: false,
                    [_constants.PermissionFlagType.WORKFLOWS]: false,
                    [_constants.PermissionFlagType.APPLICATIONS]: false,
                    [_constants.PermissionFlagType.LAYOUTS]: false,
                    [_constants.PermissionFlagType.VIEWS]: false,
                    [_constants.PermissionFlagType.BILLING]: false,
                    [_constants.PermissionFlagType.AI_SETTINGS]: false,
                    [_constants.PermissionFlagType.AI]: false,
                    [_constants.PermissionFlagType.UPLOAD_FILE]: false,
                    [_constants.PermissionFlagType.DOWNLOAD_FILE]: false,
                    [_constants.PermissionFlagType.SEND_EMAIL_TOOL]: false,
                    [_constants.PermissionFlagType.HTTP_REQUEST_TOOL]: false,
                    [_constants.PermissionFlagType.CODE_INTERPRETER_TOOL]: false,
                    [_constants.PermissionFlagType.IMPORT_CSV]: false,
                    [_constants.PermissionFlagType.EXPORT_CSV]: false,
                    [_constants.PermissionFlagType.CONNECTED_ACCOUNTS]: false,
                    [_constants.PermissionFlagType.IMPERSONATE]: false,
                    [_constants.PermissionFlagType.SSO_BYPASS]: false,
                    [_constants.PermissionFlagType.PROFILE_INFORMATION]: false,
                    [_constants.PermissionFlagType.MARKETPLACE_APPS]: false
                },
                objectsPermissions: {}
            });
    }
};
PermissionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _apikeyroleservice.ApiKeyRoleService === "undefined" ? Object : _apikeyroleservice.ApiKeyRoleService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], PermissionsService);

//# sourceMappingURL=permissions.service.js.map