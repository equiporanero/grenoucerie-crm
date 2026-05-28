/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatRowLevelPermissionPredicateGroupValidatorService", {
    enumerable: true,
    get: function() {
        return FlatRowLevelPermissionPredicateGroupValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _rowlevelpermissionpredicategroupexception = require("../../../../../metadata-modules/row-level-permission-predicate/exceptions/row-level-permission-predicate-group.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatRowLevelPermissionPredicateGroupValidatorService = class FlatRowLevelPermissionPredicateGroupValidatorService {
    validateFlatRowLevelPermissionPredicateGroupCreation({ flatEntityToValidate: flatPredicateGroupToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps }) {
        const { flatRowLevelPermissionPredicateGroupMaps: optimisticFlatPredicateGroupMaps, flatRoleMaps, flatObjectMetadataMaps } = optimisticFlatEntityMapsAndRelatedFlatEntityMaps;
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatPredicateGroupToValidate.universalIdentifier
            },
            metadataName: 'rowLevelPermissionPredicateGroup',
            type: 'create'
        });
        const existingPredicateGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPredicateGroupToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatPredicateGroupMaps
        });
        if ((0, _utils.isDefined)(existingPredicateGroup)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.INVALID_ROW_LEVEL_PERMISSION_PREDICATE_GROUP_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "j4iZI5",
                    message: "Row level permission predicate group with this universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "lG+q53",
                    message: "Row level permission predicate group already exists"
                }
            });
        }
        if ((0, _utils.isDefined)(flatPredicateGroupToValidate.parentRowLevelPermissionPredicateGroupUniversalIdentifier)) {
            const parentGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatPredicateGroupToValidate.parentRowLevelPermissionPredicateGroupUniversalIdentifier,
                flatEntityMaps: optimisticFlatPredicateGroupMaps
            });
            if (!(0, _utils.isDefined)(parentGroup)) {
                validationResult.errors.push({
                    code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.INVALID_ROW_LEVEL_PERMISSION_PREDICATE_GROUP_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "Xsgh7b",
                        message: "Parent row level permission predicate group not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "Xsgh7b",
                        message: "Parent row level permission predicate group not found"
                    }
                });
            }
        }
        const role = flatRoleMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPredicateGroupToValidate.roleUniversalIdentifier,
            flatEntityMaps: flatRoleMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(role)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.ROLE_NOT_FOUND,
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
        const objectMetadata = flatObjectMetadataMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPredicateGroupToValidate.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(objectMetadata)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.OBJECT_METADATA_NOT_FOUND,
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
        return validationResult;
    }
    validateFlatRowLevelPermissionPredicateGroupDeletion({ flatEntityToValidate: flatPredicateGroupToDelete, optimisticFlatEntityMapsAndRelatedFlatEntityMaps }) {
        const { flatRowLevelPermissionPredicateGroupMaps: optimisticFlatPredicateGroupMaps } = optimisticFlatEntityMapsAndRelatedFlatEntityMaps;
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatPredicateGroupToDelete.universalIdentifier
            },
            metadataName: 'rowLevelPermissionPredicateGroup',
            type: 'delete'
        });
        const existingPredicateGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPredicateGroupToDelete.universalIdentifier,
            flatEntityMaps: optimisticFlatPredicateGroupMaps
        });
        if (!(0, _utils.isDefined)(existingPredicateGroup)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.ROW_LEVEL_PERMISSION_PREDICATE_GROUP_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "vMP7nZ",
                    message: "Row level permission predicate group to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "vMP7nZ",
                    message: "Row level permission predicate group to delete not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatRowLevelPermissionPredicateGroupUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps }) {
        const { flatRowLevelPermissionPredicateGroupMaps: optimisticFlatPredicateGroupMaps, flatRoleMaps, flatObjectMetadataMaps } = optimisticFlatEntityMapsAndRelatedFlatEntityMaps;
        const existingPredicateGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatPredicateGroupMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'rowLevelPermissionPredicateGroup',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingPredicateGroup)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.ROW_LEVEL_PERMISSION_PREDICATE_GROUP_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "NhW7fb",
                    message: "Row level permission predicate group to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "NhW7fb",
                    message: "Row level permission predicate group to update not found"
                }
            });
            return validationResult;
        }
        const updatedPredicateGroup = {
            ...existingPredicateGroup,
            ...flatEntityUpdate
        };
        if (updatedPredicateGroup.roleUniversalIdentifier !== existingPredicateGroup.roleUniversalIdentifier) {
            const existingRoleIdentifier = existingPredicateGroup.roleUniversalIdentifier;
            const updatedRoleIdentifier = updatedPredicateGroup.roleUniversalIdentifier;
            validationResult.errors.push({
                code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.UNAUTHORIZED_ROLE_MODIFICATION,
                message: _core.i18n._(/*i18n*/ {
                    id: "yxykz2",
                    message: "Cannot modify predicate group to change its role from {existingRoleIdentifier} to {updatedRoleIdentifier}",
                    values: {
                        existingRoleIdentifier: existingRoleIdentifier,
                        updatedRoleIdentifier: updatedRoleIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "jm1hwE",
                    message: "Cannot modify predicate group to change its role"
                }
            });
        }
        if (updatedPredicateGroup.objectMetadataUniversalIdentifier !== existingPredicateGroup.objectMetadataUniversalIdentifier) {
            const existingObjectMetadataIdentifier = existingPredicateGroup.objectMetadataUniversalIdentifier;
            const updatedObjectMetadataIdentifier = updatedPredicateGroup.objectMetadataUniversalIdentifier;
            validationResult.errors.push({
                code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.UNAUTHORIZED_OBJECT_MODIFICATION,
                message: _core.i18n._(/*i18n*/ {
                    id: "/lHFxo",
                    message: "Cannot modify predicate group to change its object from {existingObjectMetadataIdentifier} to {updatedObjectMetadataIdentifier}",
                    values: {
                        existingObjectMetadataIdentifier: existingObjectMetadataIdentifier,
                        updatedObjectMetadataIdentifier: updatedObjectMetadataIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "Su850d",
                    message: "Cannot modify predicate group to change its object"
                }
            });
        }
        if ((0, _utils.isDefined)(updatedPredicateGroup.parentRowLevelPermissionPredicateGroupUniversalIdentifier)) {
            const parentGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: updatedPredicateGroup.parentRowLevelPermissionPredicateGroupUniversalIdentifier,
                flatEntityMaps: optimisticFlatPredicateGroupMaps
            });
            if (!(0, _utils.isDefined)(parentGroup)) {
                validationResult.errors.push({
                    code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.INVALID_ROW_LEVEL_PERMISSION_PREDICATE_GROUP_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "Xsgh7b",
                        message: "Parent row level permission predicate group not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "Xsgh7b",
                        message: "Parent row level permission predicate group not found"
                    }
                });
            }
        }
        const role = flatRoleMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedPredicateGroup.roleUniversalIdentifier,
            flatEntityMaps: flatRoleMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(role)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.ROLE_NOT_FOUND,
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
        const objectMetadata = flatObjectMetadataMaps ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedPredicateGroup.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        }) : undefined;
        if (!(0, _utils.isDefined)(objectMetadata)) {
            validationResult.errors.push({
                code: _rowlevelpermissionpredicategroupexception.RowLevelPermissionPredicateGroupExceptionCode.OBJECT_METADATA_NOT_FOUND,
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
        return validationResult;
    }
};
FlatRowLevelPermissionPredicateGroupValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatRowLevelPermissionPredicateGroupValidatorService);

//# sourceMappingURL=flat-row-level-permission-predicate-group-validator.service.js.map