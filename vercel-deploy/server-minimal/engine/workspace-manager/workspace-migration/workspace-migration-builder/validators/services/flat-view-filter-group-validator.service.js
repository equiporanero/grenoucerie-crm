"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatViewFilterGroupValidatorService", {
    enumerable: true,
    get: function() {
        return FlatViewFilterGroupValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _viewfiltergroupexception = require("../../../../../metadata-modules/view-filter-group/exceptions/view-filter-group.exception");
const _validateflatentitycirculardependencyutil = require("../../../utils/validate-flat-entity-circular-dependency.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
// View filter groups can have at most 2 levels of nesting (root and one child level)
const VIEW_FILTER_GROUP_MAX_DEPTH = 2;
let FlatViewFilterGroupValidatorService = class FlatViewFilterGroupValidatorService {
    getCircularDependencyValidationErrors({ viewFilterGroupUniversalIdentifier, parentViewFilterGroupUniversalIdentifier, flatViewFilterGroupMaps }) {
        const circularDependencyResult = (0, _validateflatentitycirculardependencyutil.validateFlatEntityCircularDependency)({
            flatEntityUniversalIdentifier: viewFilterGroupUniversalIdentifier,
            flatEntityParentUniversalIdentifier: parentViewFilterGroupUniversalIdentifier,
            maxDepth: VIEW_FILTER_GROUP_MAX_DEPTH,
            parentUniversalIdentifierKey: 'parentViewFilterGroupUniversalIdentifier',
            flatEntityMaps: flatViewFilterGroupMaps
        });
        if (circularDependencyResult.status === 'success') {
            return [];
        }
        switch(circularDependencyResult.reason){
            case 'self_reference':
                return [
                    {
                        code: _viewfiltergroupexception.ViewFilterGroupExceptionCode.CIRCULAR_DEPENDENCY,
                        message: _core.i18n._(/*i18n*/ {
                            id: "ENVlLK",
                            message: "View filter group cannot be its own parent"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "ENVlLK",
                            message: "View filter group cannot be its own parent"
                        }
                    }
                ];
            case 'circular_dependency':
                return [
                    {
                        code: _viewfiltergroupexception.ViewFilterGroupExceptionCode.CIRCULAR_DEPENDENCY,
                        message: _core.i18n._(/*i18n*/ {
                            id: "9uirl8",
                            message: "Circular dependency detected in view filter group hierarchy"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "9uirl8",
                            message: "Circular dependency detected in view filter group hierarchy"
                        }
                    }
                ];
            case 'max_depth_exceeded':
                return [
                    {
                        code: _viewfiltergroupexception.ViewFilterGroupExceptionCode.MAX_DEPTH_EXCEEDED,
                        message: _core.i18n._(/*i18n*/ {
                            id: "tir/7Q",
                            message: "View filter group hierarchy exceeds maximum depth of {VIEW_FILTER_GROUP_MAX_DEPTH}",
                            values: {
                                VIEW_FILTER_GROUP_MAX_DEPTH: VIEW_FILTER_GROUP_MAX_DEPTH
                            }
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "tir/7Q",
                            message: "View filter group hierarchy exceeds maximum depth of {VIEW_FILTER_GROUP_MAX_DEPTH}",
                            values: {
                                VIEW_FILTER_GROUP_MAX_DEPTH: VIEW_FILTER_GROUP_MAX_DEPTH
                            }
                        }
                    }
                ];
        }
    }
    validateFlatViewFilterGroupCreation({ flatEntityToValidate: flatViewFilterGroupToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFilterGroupMaps: optimisticFlatViewFilterGroupMaps, flatViewMaps }, remainingFlatEntityMapsToValidate }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatViewFilterGroupToValidate.universalIdentifier
            },
            metadataName: 'viewFilterGroup',
            type: 'create'
        });
        const existingViewFilterGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFilterGroupToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewFilterGroupMaps
        });
        if ((0, _utils.isDefined)(existingViewFilterGroup)) {
            validationResult.errors.push({
                code: _viewfiltergroupexception.ViewFilterGroupExceptionCode.INVALID_VIEW_FILTER_GROUP_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "inVepb",
                    message: "View filter group with this universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "Ii4ysu",
                    message: "View filter group already exists"
                }
            });
        }
        const referencedView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFilterGroupToValidate.viewUniversalIdentifier,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(referencedView)) {
            validationResult.errors.push({
                code: _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "F4A9mL",
                    message: "View not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "F4A9mL",
                    message: "View not found"
                }
            });
        }
        if ((0, _utils.isDefined)(flatViewFilterGroupToValidate.parentViewFilterGroupUniversalIdentifier)) {
            const circularDependencyErrors = this.getCircularDependencyValidationErrors({
                viewFilterGroupUniversalIdentifier: flatViewFilterGroupToValidate.universalIdentifier,
                parentViewFilterGroupUniversalIdentifier: flatViewFilterGroupToValidate.parentViewFilterGroupUniversalIdentifier,
                flatViewFilterGroupMaps: optimisticFlatViewFilterGroupMaps
            });
            if (circularDependencyErrors.length > 0) {
                validationResult.errors.push(...circularDependencyErrors);
            }
            const referencedParentInOptimistic = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatViewFilterGroupToValidate.parentViewFilterGroupUniversalIdentifier,
                flatEntityMaps: optimisticFlatViewFilterGroupMaps
            });
            const referencedParentInRemaining = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatViewFilterGroupToValidate.parentViewFilterGroupUniversalIdentifier,
                flatEntityMaps: remainingFlatEntityMapsToValidate
            });
            if (!(0, _utils.isDefined)(referencedParentInOptimistic) && !(0, _utils.isDefined)(referencedParentInRemaining)) {
                validationResult.errors.push({
                    code: _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_FILTER_GROUP_NOT_FOUND,
                    message: _core.i18n._(/*i18n*/ {
                        id: "6OzP7Y",
                        message: "Parent view filter group not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "6OzP7Y",
                        message: "Parent view filter group not found"
                    }
                });
            }
        }
        return validationResult;
    }
    validateFlatViewFilterGroupDeletion({ flatEntityToValidate: flatViewFilterGroupToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFilterGroupMaps: optimisticFlatViewFilterGroupMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatViewFilterGroupToValidate.universalIdentifier
            },
            metadataName: 'viewFilterGroup',
            type: 'delete'
        });
        const existingViewFilterGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFilterGroupToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewFilterGroupMaps
        });
        if (!(0, _utils.isDefined)(existingViewFilterGroup)) {
            validationResult.errors.push({
                code: _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_FILTER_GROUP_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "eUPMYZ",
                    message: "View filter group not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "eUPMYZ",
                    message: "View filter group not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatViewFilterGroupUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFilterGroupMaps: optimisticFlatViewFilterGroupMaps } }) {
        const existingViewFilterGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewFilterGroupMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewFilterGroup',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingViewFilterGroup)) {
            validationResult.errors.push({
                code: _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_FILTER_GROUP_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "eUPMYZ",
                    message: "View filter group not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "eUPMYZ",
                    message: "View filter group not found"
                }
            });
            return validationResult;
        }
        const parentViewFilterGroupUniversalIdentifierUpdate = flatEntityUpdate.parentViewFilterGroupUniversalIdentifier;
        if (!(0, _utils.isDefined)(parentViewFilterGroupUniversalIdentifierUpdate)) {
            return validationResult;
        }
        const newParentViewFilterGroupUniversalIdentifier = parentViewFilterGroupUniversalIdentifierUpdate;
        const circularDependencyErrors = this.getCircularDependencyValidationErrors({
            viewFilterGroupUniversalIdentifier: existingViewFilterGroup.universalIdentifier,
            parentViewFilterGroupUniversalIdentifier: newParentViewFilterGroupUniversalIdentifier,
            flatViewFilterGroupMaps: optimisticFlatViewFilterGroupMaps
        });
        if (circularDependencyErrors.length > 0) {
            validationResult.errors.push(...circularDependencyErrors);
        }
        const referencedParentViewFilterGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: newParentViewFilterGroupUniversalIdentifier,
            flatEntityMaps: optimisticFlatViewFilterGroupMaps
        });
        if (!(0, _utils.isDefined)(referencedParentViewFilterGroup)) {
            validationResult.errors.push({
                code: _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_FILTER_GROUP_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "6OzP7Y",
                    message: "Parent view filter group not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "6OzP7Y",
                    message: "Parent view filter group not found"
                }
            });
        }
        return validationResult;
    }
    constructor(){}
};
FlatViewFilterGroupValidatorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], FlatViewFilterGroupValidatorService);

//# sourceMappingURL=flat-view-filter-group-validator.service.js.map