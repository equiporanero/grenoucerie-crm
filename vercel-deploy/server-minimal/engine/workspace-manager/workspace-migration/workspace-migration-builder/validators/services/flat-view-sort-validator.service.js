"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatViewSortValidatorService", {
    enumerable: true,
    get: function() {
        return FlatViewSortValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _viewsortexception = require("../../../../../metadata-modules/view-sort/exceptions/view-sort.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
const _types = require("twenty-shared/types");
const _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil = require("../../../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps-or-throw.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FlatViewSortValidatorService = class FlatViewSortValidatorService {
    validateFlatViewSortCreation({ flatEntityToValidate: flatViewSortToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewSortMaps: optimisticFlatViewSortMaps, flatViewMaps, flatFieldMetadataMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatViewSortToValidate.universalIdentifier,
                viewUniversalIdentifier: flatViewSortToValidate.viewUniversalIdentifier
            },
            metadataName: 'viewSort',
            type: 'create'
        });
        const existingFlatViewSort = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewSortToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewSortMaps
        });
        if ((0, _utils.isDefined)(existingFlatViewSort)) {
            const flatViewSortId = flatViewSortToValidate.universalIdentifier;
            validationResult.errors.push({
                code: _viewsortexception.ViewSortExceptionCode.INVALID_VIEW_SORT_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "RP+pKP",
                    message: "View sort with id {flatViewSortId} already exists",
                    values: {
                        flatViewSortId: flatViewSortId
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "ipFNcM",
                    message: "View sort already exists"
                }
            });
        }
        const flatFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewSortToValidate.fieldMetadataUniversalIdentifier,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatFieldMetadata)) {
            validationResult.errors.push({
                code: _viewsortexception.ViewSortExceptionCode.INVALID_VIEW_SORT_DATA,
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
        const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewSortToValidate.viewUniversalIdentifier,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(flatView)) {
            validationResult.errors.push({
                code: _viewsortexception.ViewSortExceptionCode.VIEW_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "F4A9mL",
                    message: "View not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "F4A9mL",
                    message: "View not found"
                }
            });
            return validationResult;
        }
        const otherFlatViewSorts = (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow)({
            universalIdentifiers: flatView.viewSortUniversalIdentifiers,
            flatEntityMaps: optimisticFlatViewSortMaps
        });
        const equivalentExistingFlatViewSortExists = otherFlatViewSorts.some((flatViewSort)=>flatViewSort.universalIdentifier === flatViewSortToValidate.universalIdentifier && flatViewSort.fieldMetadataUniversalIdentifier === flatViewSortToValidate.fieldMetadataUniversalIdentifier);
        if (equivalentExistingFlatViewSortExists) {
            validationResult.errors.push({
                code: _viewsortexception.ViewSortExceptionCode.INVALID_VIEW_SORT_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "9/BbL9",
                    message: "View sort with same fieldMetadataId and viewId already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "ipFNcM",
                    message: "View sort already exists"
                }
            });
        }
        if (!(0, _utils.isDefined)(flatViewSortToValidate.direction) || !Object.values(_types.ViewSortDirection).includes(flatViewSortToValidate.direction)) {
            validationResult.errors.push({
                code: _viewsortexception.ViewSortExceptionCode.INVALID_VIEW_SORT_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "InEqWf",
                    message: "View sort with invalid direction"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "ezJrlG",
                    message: "View sort with invalid direction, should be ASC or DESC"
                }
            });
        }
        return validationResult;
    }
    validateFlatViewSortUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewSortMaps: optimisticFlatViewSortMaps, flatViewMaps } }) {
        const existingFlatViewSort = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewSortMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewSort',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatViewSort)) {
            validationResult.errors.push({
                code: _viewsortexception.ViewSortExceptionCode.VIEW_SORT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "wEyUsU",
                    message: "View sort to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "wEyUsU",
                    message: "View sort to update not found"
                }
            });
            return validationResult;
        }
        const updatedFlatViewSort = {
            ...existingFlatViewSort,
            ...flatEntityUpdate
        };
        if (!(0, _utils.isDefined)(updatedFlatViewSort?.direction) || !(updatedFlatViewSort.direction === _types.ViewSortDirection.DESC || updatedFlatViewSort.direction === _types.ViewSortDirection.ASC)) {
            validationResult.errors.push({
                code: _viewsortexception.ViewSortExceptionCode.INVALID_VIEW_SORT_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "xuYXJX",
                    message: "Correct direction is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "xuYXJX",
                    message: "Correct direction is required"
                }
            });
        }
        validationResult.flatEntityMinimalInformation = {
            ...validationResult.flatEntityMinimalInformation,
            viewUniversalIdentifier: updatedFlatViewSort.viewUniversalIdentifier
        };
        const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedFlatViewSort.viewUniversalIdentifier,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(flatView)) {
            validationResult.errors.push({
                code: _viewsortexception.ViewSortExceptionCode.VIEW_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "VXQpJ+",
                    message: "View sort to update parent view not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "VXQpJ+",
                    message: "View sort to update parent view not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    validateFlatViewSortDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewSortMaps: optimisticFlatViewSortMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewSort',
            type: 'delete'
        });
        const existingFlatViewSort = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewSortMaps
        });
        if (!(0, _utils.isDefined)(existingFlatViewSort)) {
            validationResult.errors.push({
                code: _viewsortexception.ViewSortExceptionCode.VIEW_SORT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "k/ykpJ",
                    message: "View sort to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "k/ykpJ",
                    message: "View sort to delete not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    constructor(){}
};
FlatViewSortValidatorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], FlatViewSortValidatorService);

//# sourceMappingURL=flat-view-sort-validator.service.js.map