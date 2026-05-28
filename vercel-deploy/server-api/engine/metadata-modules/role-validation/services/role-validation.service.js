"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoleValidationService", {
    enumerable: true,
    get: function() {
        return RoleValidationService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _permissionsexception = require("../../permissions/permissions.exception");
const _roleentity = require("../../role/role.entity");
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
let RoleValidationService = class RoleValidationService {
    async validateRoleAssignableToUsersOrThrow(roleId, workspaceId) {
        const role = await this.roleRepository.findOne({
            where: {
                id: roleId,
                workspaceId
            }
        });
        if (!role) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.ROLE_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.ROLE_NOT_FOUND);
        }
        if (!role.canBeAssignedToUsers) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.ROLE_CANNOT_BE_ASSIGNED_TO_USERS, _permissionsexception.PermissionsExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_USERS);
        }
    }
    constructor(roleRepository){
        this.roleRepository = roleRepository;
    }
};
RoleValidationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], RoleValidationService);

//# sourceMappingURL=role-validation.service.js.map