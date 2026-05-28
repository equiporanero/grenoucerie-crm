"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatRoleTargetValidatorService", {
    enumerable: true,
    get: function() {
        return FlatRoleTargetValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _roletargetexception = require("../../../../../metadata-modules/role/exceptions/role-target.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
const _validateflatroletargetassignationavailabilityutil = require("../utils/validate-flat-role-target-assignation-availability.util");
const _validateflatroletargettargetsonlyoneentityutil = require("../utils/validate-flat-role-target-targets-only-one-entity.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatRoleTargetValidatorService = class FlatRoleTargetValidatorService {
    validateFlatRoleTargetCreation({ flatEntityToValidate: flatRoleTargetToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatRoleTargetMaps: optimisticFlatRoleTargetMaps, flatRoleMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatRoleTargetToValidate.universalIdentifier
            },
            metadataName: 'roleTarget',
            type: 'create'
        });
        const existingRoleTarget = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatRoleTargetToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatRoleTargetMaps
        });
        if ((0, _utils.isDefined)(existingRoleTarget)) {
            validationResult.errors.push({
                code: _roletargetexception.RoleTargetExceptionCode.INVALID_ROLE_TARGET_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "+fwgt2",
                    message: "Role target with this universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "K+Gn31",
                    message: "Role target already exists"
                }
            });
        }
        validationResult.errors.push(...(0, _validateflatroletargettargetsonlyoneentityutil.validateFlatRoleTargetTargetsOnlyOneEntity)({
            flatRoleTarget: flatRoleTargetToValidate
        }));
        const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatRoleTargetToValidate.roleUniversalIdentifier,
            flatEntityMaps: flatRoleMaps
        });
        if (!(0, _utils.isDefined)(referencedRole)) {
            validationResult.errors.push({
                code: _roletargetexception.RoleTargetExceptionCode.INVALID_ROLE_TARGET_DATA,
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
            validationResult.errors.push(...(0, _validateflatroletargetassignationavailabilityutil.validateFlatRoleTargetAssignationAvailability)({
                flatRole: referencedRole,
                flatRoleTarget: flatRoleTargetToValidate
            }));
        }
        return validationResult;
    }
    validateFlatRoleTargetDeletion({ flatEntityToValidate: flatRoleTargetToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatRoleTargetMaps: optimisticFlatRoleTargetMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatRoleTargetToValidate.universalIdentifier
            },
            metadataName: 'roleTarget',
            type: 'delete'
        });
        const existingRoleTarget = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatRoleTargetToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatRoleTargetMaps
        });
        if (!(0, _utils.isDefined)(existingRoleTarget)) {
            validationResult.errors.push({
                code: _roletargetexception.RoleTargetExceptionCode.ROLE_TARGET_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "oNYUjk",
                    message: "Role target not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "oNYUjk",
                    message: "Role target not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    validateFlatRoleTargetUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatRoleTargetMaps: optimisticFlatRoleTargetMaps, flatRoleMaps } }) {
        const existingRoleTarget = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatRoleTargetMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'roleTarget',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingRoleTarget)) {
            validationResult.errors.push({
                code: _roletargetexception.RoleTargetExceptionCode.ROLE_TARGET_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "oNYUjk",
                    message: "Role target not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "oNYUjk",
                    message: "Role target not found"
                }
            });
            return validationResult;
        }
        const updatedFlatRoleTarget = {
            ...existingRoleTarget,
            ...flatEntityUpdate
        };
        validationResult.errors.push(...(0, _validateflatroletargettargetsonlyoneentityutil.validateFlatRoleTargetTargetsOnlyOneEntity)({
            flatRoleTarget: updatedFlatRoleTarget
        }));
        const referencedRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedFlatRoleTarget.roleUniversalIdentifier,
            flatEntityMaps: flatRoleMaps
        });
        if (!(0, _utils.isDefined)(referencedRole)) {
            validationResult.errors.push({
                code: _roletargetexception.RoleTargetExceptionCode.INVALID_ROLE_TARGET_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }
            });
            return validationResult;
        }
        validationResult.errors.push(...(0, _validateflatroletargetassignationavailabilityutil.validateFlatRoleTargetAssignationAvailability)({
            flatRole: referencedRole,
            flatRoleTarget: updatedFlatRoleTarget
        }));
        return validationResult;
    }
};
FlatRoleTargetValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatRoleTargetValidatorService);

//# sourceMappingURL=flat-role-target-validator.service.js.map