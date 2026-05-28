"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatPermissionFlagValidatorService", {
    enumerable: true,
    get: function() {
        return FlatPermissionFlagValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _permissionflagpermissiontypeconstant = require("../../../../../metadata-modules/permission-flag/constants/permission-flag-permission-type.constant");
const _permissionflagexception = require("../../../../../metadata-modules/permission-flag/permission-flag.exception");
const _belongstotwentystandardapputil = require("../../../../../metadata-modules/utils/belongs-to-twenty-standard-app.util");
const _iscallertwentystandardapputil = require("../../../../../metadata-modules/utils/is-caller-twenty-standard-app.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatPermissionFlagValidatorService = class FlatPermissionFlagValidatorService {
    validateFlatPermissionFlagCreation({ flatEntityToValidate: flatPermissionFlagToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPermissionFlagMaps: optimisticFlatPermissionFlagMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatPermissionFlagToValidate.universalIdentifier,
                key: flatPermissionFlagToValidate.key
            },
            metadataName: 'permissionFlag',
            type: 'create'
        });
        const existingByUniversalId = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPermissionFlagToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatPermissionFlagMaps
        });
        if ((0, _utils.isDefined)(existingByUniversalId)) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_ALREADY_EXISTS,
                message: _core.i18n._(/*i18n*/ {
                    id: "px8Wqt",
                    message: "Permission flag definition with universal identifier {0} already exists",
                    values: {
                        0: flatPermissionFlagToValidate.universalIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "vUfYBs",
                    message: "Permission flag definition already exists"
                }
            });
        }
        if (!(0, _guards.isNonEmptyString)(flatPermissionFlagToValidate.key)) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.INVALID_PERMISSION_FLAG_KEY,
                message: _core.i18n._(/*i18n*/ {
                    id: "vCvEfM",
                    message: "Permission flag definition key is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "QV1ZPO",
                    message: "Key is required"
                }
            });
        }
        const collidingPermissionFlag = Object.values(optimisticFlatPermissionFlagMaps.byUniversalIdentifier).find((definition)=>(0, _utils.isDefined)(definition) && definition.key === flatPermissionFlagToValidate.key && definition.universalIdentifier !== flatPermissionFlagToValidate.universalIdentifier);
        if ((0, _utils.isDefined)(collidingPermissionFlag)) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_ALREADY_EXISTS,
                message: _core.i18n._(/*i18n*/ {
                    id: "KNBagU",
                    message: 'Permission flag definition with key "{0}" is already registered in this workspace.',
                    values: {
                        0: flatPermissionFlagToValidate.key
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "4XvK/4",
                    message: "Another application in this workspace has already registered a permission flag with this key."
                }
            });
        }
        if (!_permissionflagpermissiontypeconstant.PERMISSION_FLAG_PERMISSION_TYPES.includes(flatPermissionFlagToValidate.permissionType)) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.INVALID_PERMISSION_FLAG_PERMISSION_TYPE,
                message: _core.i18n._(/*i18n*/ {
                    id: "/amTA5",
                    message: "Permission flag definition permission type must be 'settings' or 'tool'"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "ZoXxz9",
                    message: "Invalid permission type"
                }
            });
        }
        return validationResult;
    }
    validateFlatPermissionFlagUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPermissionFlagMaps: optimisticFlatPermissionFlagMaps }, buildOptions }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'permissionFlag',
            type: 'update'
        });
        const existing = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatPermissionFlagMaps
        });
        if (!(0, _utils.isDefined)(existing)) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "5phRcJ",
                    message: "Permission flag definition to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "IPm2ty",
                    message: "Permission flag definition not found"
                }
            });
            return validationResult;
        }
        if (!(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions) && (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)({
            universalIdentifier: existing.universalIdentifier,
            applicationUniversalIdentifier: existing.applicationUniversalIdentifier
        })) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_IS_STANDARD,
                message: _core.i18n._(/*i18n*/ {
                    id: "LWpSNC",
                    message: "Cannot update standard permission flag definition"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "LWpSNC",
                    message: "Cannot update standard permission flag definition"
                }
            });
        }
        if ((0, _utils.isDefined)(flatEntityUpdate.key) && flatEntityUpdate.key !== existing.key) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_KEY_IMMUTABLE,
                message: _core.i18n._(/*i18n*/ {
                    id: "si69+A",
                    message: "Permission flag definition key cannot be changed after creation"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "WDgCbh",
                    message: "Key cannot be changed"
                }
            });
        }
        if ((0, _utils.isDefined)(flatEntityUpdate.permissionType) && !_permissionflagpermissiontypeconstant.PERMISSION_FLAG_PERMISSION_TYPES.includes(flatEntityUpdate.permissionType)) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.INVALID_PERMISSION_FLAG_PERMISSION_TYPE,
                message: _core.i18n._(/*i18n*/ {
                    id: "/amTA5",
                    message: "Permission flag definition permission type must be 'settings' or 'tool'"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "ZoXxz9",
                    message: "Invalid permission type"
                }
            });
        }
        return validationResult;
    }
    validateFlatPermissionFlagDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPermissionFlagMaps: optimisticFlatPermissionFlagMaps, flatRolePermissionFlagMaps: optimisticFlatRolePermissionFlagMaps }, buildOptions }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'permissionFlag',
            type: 'delete'
        });
        const existing = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatPermissionFlagMaps
        });
        if (!(0, _utils.isDefined)(existing)) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "dKSPBk",
                    message: "Permission flag definition to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "IPm2ty",
                    message: "Permission flag definition not found"
                }
            });
            return validationResult;
        }
        if (!(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions) && (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)({
            universalIdentifier: existing.universalIdentifier,
            applicationUniversalIdentifier: existing.applicationUniversalIdentifier
        })) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_IS_STANDARD,
                message: _core.i18n._(/*i18n*/ {
                    id: "kOOXTs",
                    message: "Cannot delete standard permission flag definition"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "kOOXTs",
                    message: "Cannot delete standard permission flag definition"
                }
            });
        }
        const isPermissionFlagInUse = Object.values(optimisticFlatRolePermissionFlagMaps.byUniversalIdentifier).some((rolePermissionFlag)=>(0, _utils.isDefined)(rolePermissionFlag) && rolePermissionFlag.permissionFlagUniversalIdentifier === existing.universalIdentifier);
        if (isPermissionFlagInUse) {
            validationResult.errors.push({
                code: _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_IN_USE,
                message: _core.i18n._(/*i18n*/ {
                    id: "FxbCOo",
                    message: "Permission flag definition with key {0} is still assigned to a role",
                    values: {
                        0: existing.key
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "yFLhnq",
                    message: "Remove this permission from all roles before deleting it"
                }
            });
        }
        return validationResult;
    }
};
FlatPermissionFlagValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatPermissionFlagValidatorService);

//# sourceMappingURL=flat-permission-flag-validator.service.js.map