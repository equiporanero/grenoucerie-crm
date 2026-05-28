"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatFieldPermissionValidatorService", {
    enumerable: true,
    get: function() {
        return FlatFieldPermissionValidatorService;
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
let FlatFieldPermissionValidatorService = class FlatFieldPermissionValidatorService {
    validateFlatFieldPermissionCreation({ flatEntityToValidate: flatFieldPermissionToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldPermissionMaps: optimisticFlatFieldPermissionMaps, flatRoleMaps, flatObjectMetadataMaps, flatFieldMetadataMaps }, buildOptions }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatFieldPermissionToValidate.universalIdentifier,
                roleUniversalIdentifier: flatFieldPermissionToValidate.roleUniversalIdentifier,
                objectMetadataUniversalIdentifier: flatFieldPermissionToValidate.objectMetadataUniversalIdentifier,
                fieldMetadataUniversalIdentifier: flatFieldPermissionToValidate.fieldMetadataUniversalIdentifier
            },
            metadataName: 'fieldPermission',
            type: 'create'
        });
        const existingByUniversalId = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatFieldPermissionToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatFieldPermissionMaps
        });
        if ((0, _utils.isDefined)(existingByUniversalId)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "A2VI9D",
                    message: "Field permission with universal identifier {0} already exists",
                    values: {
                        0: flatFieldPermissionToValidate.universalIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "krbBsy",
                    message: "Field permission already exists"
                }
            });
        }
        const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatFieldPermissionToValidate.roleUniversalIdentifier,
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
            universalIdentifier: flatFieldPermissionToValidate.objectMetadataUniversalIdentifier,
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
        const referencedFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatFieldPermissionToValidate.fieldMetadataUniversalIdentifier,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(referencedFieldMetadata)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.FIELD_METADATA_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "MPt365",
                    message: "Field metadata not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MPt365",
                    message: "Field metadata not found"
                }
            });
        }
        const duplicateForSameRoleObjectField = Object.values(optimisticFlatFieldPermissionMaps.byUniversalIdentifier).filter((fp)=>(0, _utils.isDefined)(fp) && fp.roleUniversalIdentifier === flatFieldPermissionToValidate.roleUniversalIdentifier && fp.objectMetadataUniversalIdentifier === flatFieldPermissionToValidate.objectMetadataUniversalIdentifier && fp.fieldMetadataUniversalIdentifier === flatFieldPermissionToValidate.fieldMetadataUniversalIdentifier && fp.universalIdentifier !== flatFieldPermissionToValidate.universalIdentifier);
        if (duplicateForSameRoleObjectField.length > 0) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "J4IqxN",
                    message: "Field permission for this role, object and field already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "IuDcjw",
                    message: "This field permission is already set for the role"
                }
            });
        }
        return validationResult;
    }
    validateFlatFieldPermissionUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldPermissionMaps: optimisticFlatFieldPermissionMaps, flatRoleMaps, flatObjectMetadataMaps, flatFieldMetadataMaps }, buildOptions }) {
        const existingFlatFieldPermission = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatFieldPermissionMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'fieldPermission',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatFieldPermission)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.FIELD_PERMISSION_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "rR7vkH",
                    message: "Field permission to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "8mkDdX",
                    message: "Field permission not found"
                }
            });
            return validationResult;
        }
        const updatedFlatFieldPermission = {
            ...existingFlatFieldPermission,
            ...flatEntityUpdate
        };
        const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedFlatFieldPermission.roleUniversalIdentifier,
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
                universalIdentifier: updatedFlatFieldPermission.objectMetadataUniversalIdentifier,
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
        if ((0, _utils.isDefined)(flatEntityUpdate.fieldMetadataUniversalIdentifier)) {
            const referencedFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: updatedFlatFieldPermission.fieldMetadataUniversalIdentifier,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(referencedFieldMetadata)) {
                validationResult.errors.push({
                    code: _permissionsexception.PermissionsExceptionCode.FIELD_METADATA_NOT_FOUND,
                    message: _core.i18n._(/*i18n*/ {
                        id: "MPt365",
                        message: "Field metadata not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "MPt365",
                        message: "Field metadata not found"
                    }
                });
            }
        }
        const duplicateForSameRoleObjectField = Object.values(optimisticFlatFieldPermissionMaps.byUniversalIdentifier).filter((fp)=>(0, _utils.isDefined)(fp) && fp.roleUniversalIdentifier === updatedFlatFieldPermission.roleUniversalIdentifier && fp.objectMetadataUniversalIdentifier === updatedFlatFieldPermission.objectMetadataUniversalIdentifier && fp.fieldMetadataUniversalIdentifier === updatedFlatFieldPermission.fieldMetadataUniversalIdentifier && fp.universalIdentifier !== universalIdentifier);
        if (duplicateForSameRoleObjectField.length > 0) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.INVALID_SETTING,
                message: _core.i18n._(/*i18n*/ {
                    id: "J4IqxN",
                    message: "Field permission for this role, object and field already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "IuDcjw",
                    message: "This field permission is already set for the role"
                }
            });
        }
        return validationResult;
    }
    validateFlatFieldPermissionDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldPermissionMaps: optimisticFlatFieldPermissionMaps, flatRoleMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'fieldPermission',
            type: 'delete'
        });
        const existingFlatFieldPermission = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatFieldPermissionMaps
        });
        if (!(0, _utils.isDefined)(existingFlatFieldPermission)) {
            validationResult.errors.push({
                code: _permissionsexception.PermissionsExceptionCode.FIELD_PERMISSION_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "7OZNMg",
                    message: "Field permission to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "8mkDdX",
                    message: "Field permission not found"
                }
            });
        } else {
            const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: existingFlatFieldPermission.roleUniversalIdentifier,
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
FlatFieldPermissionValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatFieldPermissionValidatorService);

//# sourceMappingURL=flat-field-permission-validator.service.js.map