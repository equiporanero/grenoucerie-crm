"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatRolePermissionFlagValidatorService", {
    enumerable: true,
    get: function() {
        return FlatRolePermissionFlagValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _permissionsexception = require("../../../../../metadata-modules/permissions/permissions.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
const _validaterolebelongstocallerapplicationutil = require("../utils/validate-role-belongs-to-caller-application.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatRolePermissionFlagValidatorService = class FlatRolePermissionFlagValidatorService {
    validateFlatRolePermissionFlagCreation({ flatEntityToValidate: flatRolePermissionFlagToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPermissionFlagMaps, flatRolePermissionFlagMaps: optimisticFlatRolePermissionFlagMaps, flatRoleMaps }, buildOptions }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatRolePermissionFlagToValidate.universalIdentifier,
                permissionFlagUniversalIdentifier: flatRolePermissionFlagToValidate.permissionFlagUniversalIdentifier,
                roleUniversalIdentifier: flatRolePermissionFlagToValidate.roleUniversalIdentifier
            },
            metadataName: 'rolePermissionFlag',
            type: 'create'
        });
        const existingByUniversalId = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatRolePermissionFlagToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatRolePermissionFlagMaps
        });
        if ((0, _utils.isDefined)(existingByUniversalId)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "2NHP+l",
                    message: "Role permission flag with universal identifier {0} already exists",
                    values: {
                        0: flatRolePermissionFlagToValidate.universalIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "zlsZBc",
                    message: "Role permission flag already exists"
                }
            });
        }
        const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatRolePermissionFlagToValidate.roleUniversalIdentifier,
            flatEntityMaps: flatRoleMaps
        });
        if (!(0, _utils.isDefined)(referencedRole)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.ROLE_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }
            });
        } else {
            validationResult.errors.push(...(0, _validaterolebelongstocallerapplicationutil.validateRoleBelongsToCallerApplication)({
                referencedRole,
                buildOptions
            }));
            if (!referencedRole.isEditable) {
                validationResult.errors.push({
                    code: _permissionsexception.PermissionsExceptionCode.ROLE_NOT_EDITABLE,
                    message: _core.i18n._(/*i18n*/ {
                        id: "k2/sGI",
                        message: "Role is not editable"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "KoDdqN",
                        message: "This role cannot be modified because it is a system role. Only custom roles can be edited."
                    }
                });
            }
        }
        const referencedPermissionFlag = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatRolePermissionFlagToValidate.permissionFlagUniversalIdentifier,
            flatEntityMaps: flatPermissionFlagMaps
        });
        if (!(0, _utils.isDefined)(referencedPermissionFlag)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "2mZr45",
                    message: "Permission flag not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "mMHHVP",
                    message: "Invalid permission setting"
                }
            });
        }
        const duplicateForSameRole = Object.values(optimisticFlatRolePermissionFlagMaps.byUniversalIdentifier).filter((pf)=>(0, _utils.isDefined)(pf) && pf.roleUniversalIdentifier === flatRolePermissionFlagToValidate.roleUniversalIdentifier && pf.permissionFlagUniversalIdentifier === flatRolePermissionFlagToValidate.permissionFlagUniversalIdentifier && pf.universalIdentifier !== flatRolePermissionFlagToValidate.universalIdentifier);
        if (duplicateForSameRole.length > 0) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "qG245w",
                    message: "Permission flag for this role and setting already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "3q5jw3",
                    message: "This permission is already set for the role"
                }
            });
        }
        return validationResult;
    }
    validateFlatRolePermissionFlagUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPermissionFlagMaps, flatRolePermissionFlagMaps: optimisticFlatRolePermissionFlagMaps, flatRoleMaps }, buildOptions }) {
        const existingFlatRolePermissionFlag = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatRolePermissionFlagMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'rolePermissionFlag',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatRolePermissionFlag)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.PERMISSION_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "SMgh5j",
                    message: "Permission flag to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "2mZr45",
                    message: "Permission flag not found"
                }
            });
            return validationResult;
        }
        const updatedFlatRolePermissionFlag = {
            ...existingFlatRolePermissionFlag,
            ...flatEntityUpdate
        };
        const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedFlatRolePermissionFlag.roleUniversalIdentifier,
            flatEntityMaps: flatRoleMaps
        });
        if (!(0, _utils.isDefined)(referencedRole)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.ROLE_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }
            });
        } else {
            validationResult.errors.push(...(0, _validaterolebelongstocallerapplicationutil.validateRoleBelongsToCallerApplication)({
                referencedRole,
                buildOptions
            }));
            if (!referencedRole.isEditable) {
                validationResult.errors.push({
                    code: _permissionsexception.PermissionsExceptionCode.ROLE_NOT_EDITABLE,
                    message: _core.i18n._(/*i18n*/ {
                        id: "k2/sGI",
                        message: "Role is not editable"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "KoDdqN",
                        message: "This role cannot be modified because it is a system role. Only custom roles can be edited."
                    }
                });
            }
        }
        if ((0, _utils.isDefined)(flatEntityUpdate.permissionFlagUniversalIdentifier)) {
            const referencedPermissionFlag = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatEntityUpdate.permissionFlagUniversalIdentifier,
                flatEntityMaps: flatPermissionFlagMaps
            });
            if (!(0, _utils.isDefined)(referencedPermissionFlag)) {
                validationResult.errors.push({
                    code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                    message: _core.i18n._(/*i18n*/ {
                        id: "2mZr45",
                        message: "Permission flag not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "mMHHVP",
                        message: "Invalid permission setting"
                    }
                });
            }
        }
        const duplicateForSameRole = Object.values(optimisticFlatRolePermissionFlagMaps.byUniversalIdentifier).filter((pf)=>(0, _utils.isDefined)(pf) && pf.roleUniversalIdentifier === updatedFlatRolePermissionFlag.roleUniversalIdentifier && pf.permissionFlagUniversalIdentifier === updatedFlatRolePermissionFlag.permissionFlagUniversalIdentifier && pf.universalIdentifier !== universalIdentifier);
        if (duplicateForSameRole.length > 0) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "qG245w",
                    message: "Permission flag for this role and setting already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "3q5jw3",
                    message: "This permission is already set for the role"
                }
            });
        }
        return validationResult;
    }
    validateFlatRolePermissionFlagDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatRolePermissionFlagMaps: optimisticFlatRolePermissionFlagMaps, flatRoleMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'rolePermissionFlag',
            type: 'delete'
        });
        const existingFlatRolePermissionFlag = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatRolePermissionFlagMaps
        });
        if (!(0, _utils.isDefined)(existingFlatRolePermissionFlag)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.PERMISSION_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "dqLRwc",
                    message: "Permission flag to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "2mZr45",
                    message: "Permission flag not found"
                }
            });
        } else {
            const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: existingFlatRolePermissionFlag.roleUniversalIdentifier,
                flatEntityMaps: flatRoleMaps
            });
            if ((0, _utils.isDefined)(referencedRole) && !referencedRole.isEditable) {
                validationResult.errors.push({
                    code: _permissionsexception.PermissionsExceptionCode.ROLE_NOT_EDITABLE,
                    message: _core.i18n._(/*i18n*/ {
                        id: "k2/sGI",
                        message: "Role is not editable"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "KoDdqN",
                        message: "This role cannot be modified because it is a system role. Only custom roles can be edited."
                    }
                });
            }
        }
        return validationResult;
    }
};
FlatRolePermissionFlagValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatRolePermissionFlagValidatorService);

//# sourceMappingURL=flat-role-permission-flag-validator.service.js.map