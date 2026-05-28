"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatRoleValidatorService", {
    enumerable: true,
    get: function() {
        return FlatRoleValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _permissionsexception = require("../../../../../metadata-modules/permissions/permissions.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
const _validateroleiseditableutil = require("../utils/validate-role-is-editable.util");
const _validaterolelabeluniquenessutil = require("../utils/validate-role-label-uniqueness.util");
const _validaterolereadwritepermissionsconsistencyutil = require("../utils/validate-role-read-write-permissions-consistency.util");
const _validaterolerequiredpropertiesaredefinedutil = require("../utils/validate-role-required-properties-are-defined.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatRoleValidatorService = class FlatRoleValidatorService {
    validateFlatRoleCreation({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatRoleMaps: optimisticFlatRoleMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                label: flatEntityToValidate.label
            },
            metadataName: 'role',
            type: 'create'
        });
        const existingRoles = Object.values(optimisticFlatRoleMaps.byUniversalIdentifier).filter(_utils.isDefined);
        validationResult.errors.push(...(0, _validaterolerequiredpropertiesaredefinedutil.validateRoleRequiredPropertiesAreDefined)({
            flatRole: flatEntityToValidate
        }));
        validationResult.errors.push(...(0, _validaterolelabeluniquenessutil.validateRoleLabelUniqueness)({
            label: flatEntityToValidate.label,
            existingFlatRoles: existingRoles
        }));
        validationResult.errors.push(...(0, _validaterolereadwritepermissionsconsistencyutil.validateRoleReadWritePermissionsConsistency)({
            flatRole: flatEntityToValidate
        }));
        return validationResult;
    }
    validateFlatRoleDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatRoleMaps: optimisticFlatRoleMaps }, buildOptions }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                label: flatEntityToValidate.label
            },
            metadataName: 'role',
            type: 'delete'
        });
        const existingRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatRoleMaps
        });
        if (!(0, _utils.isDefined)(existingRole)) {
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
            return validationResult;
        }
        validationResult.errors.push(...(0, _validateroleiseditableutil.validateRoleIsEditable)({
            flatRole: existingRole,
            buildOptions
        }));
        return validationResult;
    }
    validateFlatRoleUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatRoleMaps: optimisticFlatRoleMaps }, buildOptions }) {
        const fromFlatRole = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatRoleMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'role',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatRole)) {
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
            return validationResult;
        }
        validationResult.errors.push(...(0, _validateroleiseditableutil.validateRoleIsEditable)({
            flatRole: fromFlatRole,
            buildOptions
        }));
        const toFlatRole = {
            ...fromFlatRole,
            ...flatEntityUpdate
        };
        validationResult.errors.push(...(0, _validaterolerequiredpropertiesaredefinedutil.validateRoleRequiredPropertiesAreDefined)({
            flatRole: toFlatRole
        }));
        const flatRoleLabelUpdate = flatEntityUpdate.label;
        if ((0, _utils.isDefined)(flatRoleLabelUpdate)) {
            const existingRoles = Object.values(optimisticFlatRoleMaps.byUniversalIdentifier).filter(_utils.isDefined);
            validationResult.errors.push(...(0, _validaterolelabeluniquenessutil.validateRoleLabelUniqueness)({
                label: flatRoleLabelUpdate,
                existingFlatRoles: existingRoles
            }));
        }
        validationResult.errors.push(...(0, _validaterolereadwritepermissionsconsistencyutil.validateRoleReadWritePermissionsConsistency)({
            flatRole: toFlatRole
        }));
        return validationResult;
    }
};
FlatRoleValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatRoleValidatorService);

//# sourceMappingURL=flat-role-validator.service.js.map