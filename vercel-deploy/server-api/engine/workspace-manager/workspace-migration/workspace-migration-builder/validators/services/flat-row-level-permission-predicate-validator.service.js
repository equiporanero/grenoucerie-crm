/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatRowLevelPermissionPredicateValidatorService", {
    enumerable: true,
    get: function() {
        return FlatRowLevelPermissionPredicateValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _rowlevelpermissionpredicateexception = require("../../../../../metadata-modules/row-level-permission-predicate/exceptions/row-level-permission-predicate.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatRowLevelPermissionPredicateValidatorService = class FlatRowLevelPermissionPredicateValidatorService {
    validateFlatRowLevelPermissionPredicateCreation({ flatEntityToValidate: flatPredicateToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps }) {
        const { flatRowLevelPermissionPredicateMaps: optimisticFlatPredicateMaps, flatFieldMetadataMaps, flatObjectMetadataMaps, flatRowLevelPermissionPredicateGroupMaps, flatRoleMaps } = optimisticFlatEntityMapsAndRelatedFlatEntityMaps;
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatPredicateToValidate.universalIdentifier
            },
            metadataName: 'rowLevelPermissionPredicate',
            type: 'create'
        });
        const existingPredicate = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPredicateToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatPredicateMaps
        });
        if ((0, _utils.isDefined)(existingPredicate)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.INVALID_ROW_LEVEL_PERMISSION_PREDICATE_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "B4yoLq",
                    message: "Row level permission predicate with this universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "/ruB5e",
                    message: "Row level permission predicate already exists"
                }
            });
        }
        const fieldMetadata = flatFieldMetadataMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPredicateToValidate.fieldMetadataUniversalIdentifier,
            flatEntityMaps: flatFieldMetadataMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(fieldMetadata)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.FIELD_METADATA_NOT_FOUND,
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
        const objectMetadata = flatObjectMetadataMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPredicateToValidate.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(objectMetadata)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.OBJECT_METADATA_NOT_FOUND,
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
        if ((0, _utils.isDefined)(flatPredicateToValidate.rowLevelPermissionPredicateGroupUniversalIdentifier) && flatRowLevelPermissionPredicateGroupMaps) {
            const predicateGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatPredicateToValidate.rowLevelPermissionPredicateGroupUniversalIdentifier,
                flatEntityMaps: flatRowLevelPermissionPredicateGroupMaps
            });
            if (!(0, _utils.isDefined)(predicateGroup)) {
                validationResult.errors.push({
                    code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.INVALID_ROW_LEVEL_PERMISSION_PREDICATE_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "va8c5P",
                        message: "Row level permission predicate group not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "va8c5P",
                        message: "Row level permission predicate group not found"
                    }
                });
            }
        }
        const role = flatRoleMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPredicateToValidate.roleUniversalIdentifier,
            flatEntityMaps: flatRoleMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(role)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROLE_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatRowLevelPermissionPredicateDeletion({ flatEntityToValidate: flatPredicateToDelete, optimisticFlatEntityMapsAndRelatedFlatEntityMaps }) {
        const { flatRowLevelPermissionPredicateMaps: optimisticFlatPredicateMaps } = optimisticFlatEntityMapsAndRelatedFlatEntityMaps;
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatPredicateToDelete.universalIdentifier
            },
            metadataName: 'rowLevelPermissionPredicate',
            type: 'delete'
        });
        const existingPredicate = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPredicateToDelete.universalIdentifier,
            flatEntityMaps: optimisticFlatPredicateMaps
        });
        if (!(0, _utils.isDefined)(existingPredicate)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROW_LEVEL_PERMISSION_PREDICATE_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "zdTUvE",
                    message: "Row level permission predicate to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "zdTUvE",
                    message: "Row level permission predicate to delete not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatRowLevelPermissionPredicateUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps }) {
        const { flatRowLevelPermissionPredicateMaps: optimisticFlatPredicateMaps, flatFieldMetadataMaps, flatObjectMetadataMaps, flatRowLevelPermissionPredicateGroupMaps, flatRoleMaps } = optimisticFlatEntityMapsAndRelatedFlatEntityMaps;
        const existingPredicate = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatPredicateMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'rowLevelPermissionPredicate',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingPredicate)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROW_LEVEL_PERMISSION_PREDICATE_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "aeNy7i",
                    message: "Row level permission predicate to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "aeNy7i",
                    message: "Row level permission predicate to update not found"
                }
            });
            return validationResult;
        }
        const updatedPredicate = {
            ...existingPredicate,
            ...flatEntityUpdate
        };
        if (updatedPredicate.roleUniversalIdentifier !== existingPredicate.roleUniversalIdentifier) {
            const existingRoleIdentifier = existingPredicate.roleUniversalIdentifier;
            const updatedRoleIdentifier = updatedPredicate.roleUniversalIdentifier;
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.UNAUTHORIZED_ROLE_MODIFICATION,
                message: _core.i18n._(/*i18n*/ {
                    id: "uoi9Wy",
                    message: "Cannot modify predicate to change its role from {existingRoleIdentifier} to {updatedRoleIdentifier}",
                    values: {
                        existingRoleIdentifier: existingRoleIdentifier,
                        updatedRoleIdentifier: updatedRoleIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "7JaPm8",
                    message: "Cannot modify predicate to change its role"
                }
            });
        }
        if (updatedPredicate.objectMetadataUniversalIdentifier !== existingPredicate.objectMetadataUniversalIdentifier) {
            const existingObjectMetadataIdentifier = existingPredicate.objectMetadataUniversalIdentifier;
            const updatedObjectMetadataIdentifier = updatedPredicate.objectMetadataUniversalIdentifier;
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.UNAUTHORIZED_OBJECT_MODIFICATION,
                message: _core.i18n._(/*i18n*/ {
                    id: "ku/9og",
                    message: "Cannot modify predicate to change its object from {existingObjectMetadataIdentifier} to {updatedObjectMetadataIdentifier}",
                    values: {
                        existingObjectMetadataIdentifier: existingObjectMetadataIdentifier,
                        updatedObjectMetadataIdentifier: updatedObjectMetadataIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "HDo5ie",
                    message: "Cannot modify predicate to change its object"
                }
            });
        }
        const fieldMetadata = flatFieldMetadataMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedPredicate.fieldMetadataUniversalIdentifier,
            flatEntityMaps: flatFieldMetadataMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(fieldMetadata)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.FIELD_METADATA_NOT_FOUND,
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
        const objectMetadata = flatObjectMetadataMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedPredicate.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(objectMetadata)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.OBJECT_METADATA_NOT_FOUND,
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
        if ((0, _utils.isDefined)(updatedPredicate.rowLevelPermissionPredicateGroupUniversalIdentifier) && flatRowLevelPermissionPredicateGroupMaps) {
            const predicateGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: updatedPredicate.rowLevelPermissionPredicateGroupUniversalIdentifier,
                flatEntityMaps: flatRowLevelPermissionPredicateGroupMaps
            });
            if (!(0, _utils.isDefined)(predicateGroup)) {
                validationResult.errors.push({
                    code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.INVALID_ROW_LEVEL_PERMISSION_PREDICATE_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "va8c5P",
                        message: "Row level permission predicate group not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "va8c5P",
                        message: "Row level permission predicate group not found"
                    }
                });
            }
        }
        const role = flatRoleMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedPredicate.roleUniversalIdentifier,
            flatEntityMaps: flatRoleMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(role)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROLE_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MvTCyk",
                    message: "Role not found"
                }
            });
        }
        return validationResult;
    }
};
FlatRowLevelPermissionPredicateValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatRowLevelPermissionPredicateValidatorService);

//# sourceMappingURL=flat-row-level-permission-predicate-validator.service.js.map