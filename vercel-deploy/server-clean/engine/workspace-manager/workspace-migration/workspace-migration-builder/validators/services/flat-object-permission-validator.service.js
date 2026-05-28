"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatObjectPermissionValidatorService", {
    enumerable: true,
    get: function() {
        return FlatObjectPermissionValidatorService;
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
let FlatObjectPermissionValidatorService = class FlatObjectPermissionValidatorService {
    validateFlatObjectPermissionCreation({ flatEntityToValidate: flatObjectPermissionToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatObjectPermissionMaps: optimisticFlatObjectPermissionMaps, flatRoleMaps, flatObjectMetadataMaps }, buildOptions }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatObjectPermissionToValidate.universalIdentifier,
                roleUniversalIdentifier: flatObjectPermissionToValidate.roleUniversalIdentifier,
                objectMetadataUniversalIdentifier: flatObjectPermissionToValidate.objectMetadataUniversalIdentifier
            },
            metadataName: 'objectPermission',
            type: 'create'
        });
        const existingByUniversalId = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatObjectPermissionToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatObjectPermissionMaps
        });
        if ((0, _utils.isDefined)(existingByUniversalId)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "wVLH1M",
                    message: "Object permission with universal identifier {0} already exists",
                    values: {
                        0: flatObjectPermissionToValidate.universalIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "4ib9PY",
                    message: "Object permission already exists"
                }
            });
        }
        const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatObjectPermissionToValidate.roleUniversalIdentifier,
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
        const referencedObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatObjectPermissionToValidate.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(referencedObjectMetadata)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.OBJECT_METADATA_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "xrblgA",
                    message: "Object metadata not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "xrblgA",
                    message: "Object metadata not found"
                }
            });
        }
        const duplicateForSameRoleAndObject = Object.values(optimisticFlatObjectPermissionMaps.byUniversalIdentifier).filter((op)=>(0, _utils.isDefined)(op) && op.roleUniversalIdentifier === flatObjectPermissionToValidate.roleUniversalIdentifier && op.objectMetadataUniversalIdentifier === flatObjectPermissionToValidate.objectMetadataUniversalIdentifier && op.universalIdentifier !== flatObjectPermissionToValidate.universalIdentifier);
        if (duplicateForSameRoleAndObject.length > 0) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "iCx6+2",
                    message: "Object permission for this role and object already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "X2Xp8v",
                    message: "This object permission is already set for the role"
                }
            });
        }
        return validationResult;
    }
    validateFlatObjectPermissionUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatObjectPermissionMaps: optimisticFlatObjectPermissionMaps, flatRoleMaps, flatObjectMetadataMaps }, buildOptions }) {
        const existingFlatObjectPermission = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatObjectPermissionMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'objectPermission',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatObjectPermission)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.OBJECT_PERMISSION_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "nA3bja",
                    message: "Object permission to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "Wrwici",
                    message: "Object permission not found"
                }
            });
            return validationResult;
        }
        const updatedFlatObjectPermission = {
            ...existingFlatObjectPermission,
            ...flatEntityUpdate
        };
        const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedFlatObjectPermission.roleUniversalIdentifier,
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
        if ((0, _utils.isDefined)(flatEntityUpdate.objectMetadataUniversalIdentifier)) {
            const referencedObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: updatedFlatObjectPermission.objectMetadataUniversalIdentifier,
                flatEntityMaps: flatObjectMetadataMaps
            });
            if (!(0, _utils.isDefined)(referencedObjectMetadata)) {
                validationResult.errors.push({
                    code: _permissionsexception.PermissionsExceptionCode.OBJECT_METADATA_NOT_FOUND,
                    message: _core.i18n._(/*i18n*/ {
                        id: "xrblgA",
                        message: "Object metadata not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "xrblgA",
                        message: "Object metadata not found"
                    }
                });
            }
        }
        const duplicateForSameRoleAndObject = Object.values(optimisticFlatObjectPermissionMaps.byUniversalIdentifier).filter((op)=>(0, _utils.isDefined)(op) && op.roleUniversalIdentifier === updatedFlatObjectPermission.roleUniversalIdentifier && op.objectMetadataUniversalIdentifier === updatedFlatObjectPermission.objectMetadataUniversalIdentifier && op.universalIdentifier !== universalIdentifier);
        if (duplicateForSameRoleAndObject.length > 0) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "iCx6+2",
                    message: "Object permission for this role and object already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "X2Xp8v",
                    message: "This object permission is already set for the role"
                }
            });
        }
        return validationResult;
    }
    validateFlatObjectPermissionDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatObjectPermissionMaps: optimisticFlatObjectPermissionMaps, flatRoleMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'objectPermission',
            type: 'delete'
        });
        const existingFlatObjectPermission = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatObjectPermissionMaps
        });
        if (!(0, _utils.isDefined)(existingFlatObjectPermission)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.OBJECT_PERMISSION_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "8KDEDj",
                    message: "Object permission to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "Wrwici",
                    message: "Object permission not found"
                }
            });
        } else {
            const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: existingFlatObjectPermission.roleUniversalIdentifier,
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
FlatObjectPermissionValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatObjectPermissionValidatorService);

//# sourceMappingURL=flat-object-permission-validator.service.js.map