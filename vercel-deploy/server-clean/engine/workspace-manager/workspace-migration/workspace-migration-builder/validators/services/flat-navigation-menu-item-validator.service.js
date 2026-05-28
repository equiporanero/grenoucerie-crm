"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatNavigationMenuItemValidatorService", {
    enumerable: true,
    get: function() {
        return FlatNavigationMenuItemValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _navigationmenuitemexception = require("../../../../../metadata-modules/navigation-menu-item/navigation-menu-item.exception");
const _validateflatentitycirculardependencyutil = require("../../../utils/validate-flat-entity-circular-dependency.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const NAVIGATION_MENU_ITEM_MAX_DEPTH = 2;
let FlatNavigationMenuItemValidatorService = class FlatNavigationMenuItemValidatorService {
    validateNavigationMenuItemType({ type, hasTargetRecordId, hasTargetObjectMetadataId, hasViewId, hasLink, hasPageLayoutId, name }) {
        const errors = [];
        if (!(0, _utils.isDefined)(type)) {
            errors.push({
                code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "Ii6d/e",
                    message: "Navigation menu item type is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "Ii6d/e",
                    message: "Navigation menu item type is required"
                }
            });
            return errors;
        }
        switch(type){
            case _types.NavigationMenuItemType.FOLDER:
                if (!(0, _utils.isDefined)(name) || name.trim() === '') {
                    errors.push({
                        code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT,
                        message: _core.i18n._(/*i18n*/ {
                            id: "Fzrzfe",
                            message: "Folder name is required"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "Fzrzfe",
                            message: "Folder name is required"
                        }
                    });
                }
                break;
            case _types.NavigationMenuItemType.OBJECT:
                if (!hasTargetObjectMetadataId) {
                    errors.push({
                        code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT,
                        message: _core.i18n._(/*i18n*/ {
                            id: "L3vVWc",
                            message: "targetObjectMetadataId is required for OBJECT type"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "L3vVWc",
                            message: "targetObjectMetadataId is required for OBJECT type"
                        }
                    });
                }
                break;
            case _types.NavigationMenuItemType.VIEW:
                if (!hasViewId) {
                    errors.push({
                        code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT,
                        message: _core.i18n._(/*i18n*/ {
                            id: "14WoDD",
                            message: "viewId is required for VIEW type"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "14WoDD",
                            message: "viewId is required for VIEW type"
                        }
                    });
                }
                break;
            case _types.NavigationMenuItemType.RECORD:
                if (!hasTargetRecordId || !hasTargetObjectMetadataId) {
                    errors.push({
                        code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT,
                        message: _core.i18n._(/*i18n*/ {
                            id: "NGynR3",
                            message: "targetRecordId and targetObjectMetadataId are required for RECORD type"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "NGynR3",
                            message: "targetRecordId and targetObjectMetadataId are required for RECORD type"
                        }
                    });
                }
                break;
            case _types.NavigationMenuItemType.LINK:
                if (!hasLink) {
                    errors.push({
                        code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT,
                        message: _core.i18n._(/*i18n*/ {
                            id: "oDC0sf",
                            message: "link is required for LINK type"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "oDC0sf",
                            message: "link is required for LINK type"
                        }
                    });
                }
                break;
            case _types.NavigationMenuItemType.PAGE_LAYOUT:
                if (!hasPageLayoutId) {
                    errors.push({
                        code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT,
                        message: _core.i18n._(/*i18n*/ {
                            id: "RDkmYK",
                            message: "pageLayoutId is required for PAGE_LAYOUT type"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "RDkmYK",
                            message: "pageLayoutId is required for PAGE_LAYOUT type"
                        }
                    });
                }
                break;
        }
        return errors;
    }
    getCircularDependencyValidationErrors({ navigationMenuItemUniversalIdentifier, folderUniversalIdentifier, flatNavigationMenuItemMaps }) {
        const circularDependencyResult = (0, _validateflatentitycirculardependencyutil.validateFlatEntityCircularDependency)({
            flatEntityUniversalIdentifier: navigationMenuItemUniversalIdentifier,
            flatEntityParentUniversalIdentifier: folderUniversalIdentifier,
            maxDepth: NAVIGATION_MENU_ITEM_MAX_DEPTH,
            parentUniversalIdentifierKey: 'folderUniversalIdentifier',
            flatEntityMaps: flatNavigationMenuItemMaps
        });
        if (circularDependencyResult.status === 'success') {
            return [];
        }
        switch(circularDependencyResult.reason){
            case 'self_reference':
                return [
                    {
                        code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.CIRCULAR_DEPENDENCY,
                        message: _core.i18n._(/*i18n*/ {
                            id: "RJyaoR",
                            message: "Navigation menu item cannot be its own parent"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "RJyaoR",
                            message: "Navigation menu item cannot be its own parent"
                        }
                    }
                ];
            case 'circular_dependency':
                return [
                    {
                        code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.CIRCULAR_DEPENDENCY,
                        message: _core.i18n._(/*i18n*/ {
                            id: "NGL+Sl",
                            message: "Circular dependency detected in navigation menu item hierarchy"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "NGL+Sl",
                            message: "Circular dependency detected in navigation menu item hierarchy"
                        }
                    }
                ];
            case 'max_depth_exceeded':
                return [
                    {
                        code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.MAX_DEPTH_EXCEEDED,
                        message: _core.i18n._(/*i18n*/ {
                            id: "t38VAr",
                            message: "Navigation menu item hierarchy exceeds maximum depth of {NAVIGATION_MENU_ITEM_MAX_DEPTH}",
                            values: {
                                NAVIGATION_MENU_ITEM_MAX_DEPTH: NAVIGATION_MENU_ITEM_MAX_DEPTH
                            }
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "t38VAr",
                            message: "Navigation menu item hierarchy exceeds maximum depth of {NAVIGATION_MENU_ITEM_MAX_DEPTH}",
                            values: {
                                NAVIGATION_MENU_ITEM_MAX_DEPTH: NAVIGATION_MENU_ITEM_MAX_DEPTH
                            }
                        }
                    }
                ];
        }
    }
    validateFlatNavigationMenuItemCreation({ flatEntityToValidate: flatNavigationMenuItem, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatNavigationMenuItemMaps: optimisticFlatNavigationMenuItemMaps }, remainingFlatEntityMapsToValidate }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatNavigationMenuItem.universalIdentifier
            },
            metadataName: 'navigationMenuItem',
            type: 'create'
        });
        if ((0, _utils.isDefined)(flatNavigationMenuItem.position) && !Number.isFinite(flatNavigationMenuItem.position)) {
            validationResult.errors.push({
                code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "rFj1tD",
                    message: "Position must be a finite number"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "rFj1tD",
                    message: "Position must be a finite number"
                }
            });
        }
        const typeValidationErrors = this.validateNavigationMenuItemType({
            type: flatNavigationMenuItem.type,
            hasTargetRecordId: (0, _utils.isDefined)(flatNavigationMenuItem.targetRecordId),
            hasTargetObjectMetadataId: (0, _utils.isDefined)(flatNavigationMenuItem.targetObjectMetadataUniversalIdentifier),
            hasViewId: (0, _utils.isDefined)(flatNavigationMenuItem.viewUniversalIdentifier),
            hasLink: (0, _utils.isDefined)(flatNavigationMenuItem.link) && (0, _guards.isNonEmptyString)(flatNavigationMenuItem.link),
            hasPageLayoutId: (0, _utils.isDefined)(flatNavigationMenuItem.pageLayoutUniversalIdentifier),
            name: flatNavigationMenuItem.name
        });
        validationResult.errors.push(...typeValidationErrors);
        if ((0, _utils.isDefined)(flatNavigationMenuItem.folderUniversalIdentifier)) {
            const circularDependencyErrors = this.getCircularDependencyValidationErrors({
                navigationMenuItemUniversalIdentifier: flatNavigationMenuItem.universalIdentifier,
                folderUniversalIdentifier: flatNavigationMenuItem.folderUniversalIdentifier,
                flatNavigationMenuItemMaps: optimisticFlatNavigationMenuItemMaps
            });
            if (circularDependencyErrors.length > 0) {
                validationResult.errors.push(...circularDependencyErrors);
            }
            const referencedParentInOptimistic = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatNavigationMenuItem.folderUniversalIdentifier,
                flatEntityMaps: optimisticFlatNavigationMenuItemMaps
            });
            const referencedParentInRemaining = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatNavigationMenuItem.folderUniversalIdentifier,
                flatEntityMaps: remainingFlatEntityMapsToValidate
            });
            if (!(0, _utils.isDefined)(referencedParentInOptimistic) && !(0, _utils.isDefined)(referencedParentInRemaining)) {
                validationResult.errors.push({
                    code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND,
                    message: _core.i18n._(/*i18n*/ {
                        id: "T1gSWA",
                        message: "Parent navigation menu item not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "T1gSWA",
                        message: "Parent navigation menu item not found"
                    }
                });
            }
        }
        return validationResult;
    }
    validateFlatNavigationMenuItemDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatNavigationMenuItemMaps: optimisticFlatNavigationMenuItemMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier
            },
            metadataName: 'navigationMenuItem',
            type: 'delete'
        });
        const existingNavigationMenuItem = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatNavigationMenuItemMaps
        });
        if (!(0, _utils.isDefined)(existingNavigationMenuItem)) {
            validationResult.errors.push({
                code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "s+CGNO",
                    message: "Navigation menu item not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "s+CGNO",
                    message: "Navigation menu item not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatNavigationMenuItemUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatNavigationMenuItemMaps: optimisticFlatNavigationMenuItemMaps } }) {
        const fromFlatNavigationMenuItem = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatNavigationMenuItemMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'navigationMenuItem',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatNavigationMenuItem)) {
            validationResult.errors.push({
                code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "s+CGNO",
                    message: "Navigation menu item not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "s+CGNO",
                    message: "Navigation menu item not found"
                }
            });
            return validationResult;
        }
        const positionUpdate = flatEntityUpdate.position;
        if ((0, _utils.isDefined)(positionUpdate) && !Number.isFinite(positionUpdate)) {
            validationResult.errors.push({
                code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "rFj1tD",
                    message: "Position must be a finite number"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "rFj1tD",
                    message: "Position must be a finite number"
                }
            });
        }
        const toFlatNavigationMenuItem = {
            ...fromFlatNavigationMenuItem,
            ...flatEntityUpdate
        };
        const nameUpdate = flatEntityUpdate.name;
        const typeValidationErrors = this.validateNavigationMenuItemType({
            type: toFlatNavigationMenuItem.type,
            hasTargetRecordId: (0, _utils.isDefined)(toFlatNavigationMenuItem.targetRecordId),
            hasTargetObjectMetadataId: (0, _utils.isDefined)(toFlatNavigationMenuItem.targetObjectMetadataUniversalIdentifier),
            hasViewId: (0, _utils.isDefined)(toFlatNavigationMenuItem.viewUniversalIdentifier),
            hasLink: (0, _guards.isNonEmptyString)((toFlatNavigationMenuItem.link ?? '').trim()),
            hasPageLayoutId: (0, _utils.isDefined)(toFlatNavigationMenuItem.pageLayoutUniversalIdentifier),
            name: (0, _utils.isDefined)(nameUpdate) ? nameUpdate : toFlatNavigationMenuItem.name
        });
        validationResult.errors.push(...typeValidationErrors);
        const folderUniversalIdentifierUpdate = flatEntityUpdate.folderUniversalIdentifier;
        if (!(0, _utils.isDefined)(folderUniversalIdentifierUpdate)) {
            return validationResult;
        }
        const newFolderUniversalIdentifier = folderUniversalIdentifierUpdate;
        const circularDependencyErrors = this.getCircularDependencyValidationErrors({
            navigationMenuItemUniversalIdentifier: fromFlatNavigationMenuItem.universalIdentifier,
            folderUniversalIdentifier: newFolderUniversalIdentifier,
            flatNavigationMenuItemMaps: optimisticFlatNavigationMenuItemMaps
        });
        if (circularDependencyErrors.length > 0) {
            validationResult.errors.push(...circularDependencyErrors);
        }
        const referencedParentNavigationMenuItem = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: newFolderUniversalIdentifier,
            flatEntityMaps: optimisticFlatNavigationMenuItemMaps
        });
        if (!(0, _utils.isDefined)(referencedParentNavigationMenuItem)) {
            validationResult.errors.push({
                code: _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "T1gSWA",
                    message: "Parent navigation menu item not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "T1gSWA",
                    message: "Parent navigation menu item not found"
                }
            });
        }
        return validationResult;
    }
};
FlatNavigationMenuItemValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatNavigationMenuItemValidatorService);

//# sourceMappingURL=flat-navigation-menu-item-validator.service.js.map