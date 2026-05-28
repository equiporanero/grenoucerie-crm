"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatViewValidatorService", {
    enumerable: true,
    get: function() {
        return FlatViewValidatorService;
    }
});
const _core = require("@lingui/core");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _viewexception = require("../../../../../metadata-modules/view/exceptions/view.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
let FlatViewValidatorService = class FlatViewValidatorService {
    validateFlatViewUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewMaps: optimisticFlatViewMaps, flatFieldMetadataMaps } }) {
        const existingFlatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'view',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatView)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
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
        const updatedFlatView = {
            ...existingFlatView,
            ...flatEntityUpdate
        };
        const kanbanAggregateOperationFieldMetadataUniversalIdentifierUpdate = flatEntityUpdate.kanbanAggregateOperationFieldMetadataUniversalIdentifier;
        if ((0, _utils.isDefined)(kanbanAggregateOperationFieldMetadataUniversalIdentifierUpdate) && kanbanAggregateOperationFieldMetadataUniversalIdentifierUpdate !== null && !(0, _utils.isDefined)((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: kanbanAggregateOperationFieldMetadataUniversalIdentifierUpdate,
            flatEntityMaps: flatFieldMetadataMaps
        }))) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "M7KWZV",
                    message: "View kanban aggregate field metadata not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "M7KWZV",
                    message: "View kanban aggregate field metadata not found"
                }
            });
        }
        const viewBecomesKanban = updatedFlatView.type === _types.ViewType.KANBAN && existingFlatView.type !== _types.ViewType.KANBAN;
        if (viewBecomesKanban) {
            if (!(0, _utils.isDefined)(updatedFlatView.mainGroupByFieldMetadataUniversalIdentifier)) {
                validationResult.errors.push({
                    code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "mAbBLH",
                        message: "Kanban view must have a main group by field"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "mAbBLH",
                        message: "Kanban view must have a main group by field"
                    }
                });
                return validationResult;
            }
            const mainGroupByFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: updatedFlatView.mainGroupByFieldMetadataUniversalIdentifier,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(mainGroupByFieldMetadata)) {
                validationResult.errors.push({
                    code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "QS/zML",
                        message: "Kanban main group by field metadata not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "QS/zML",
                        message: "Kanban main group by field metadata not found"
                    }
                });
            } else if (mainGroupByFieldMetadata.type !== _types.FieldMetadataType.SELECT) {
                validationResult.errors.push({
                    code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "RoCvZe",
                        message: "Kanban main group by field must be a SELECT field"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "ZfLcEk",
                        message: "Kanban main group by field must be a select field"
                    }
                });
            }
        }
        const updatedMainGroupByFieldMetadataUniversalIdentifier = updatedFlatView.mainGroupByFieldMetadataUniversalIdentifier;
        const mainGroupByFieldMetadataIsAddedOrUpdated = (0, _utils.isDefined)(updatedMainGroupByFieldMetadataUniversalIdentifier) && existingFlatView.mainGroupByFieldMetadataUniversalIdentifier !== updatedMainGroupByFieldMetadataUniversalIdentifier;
        if (mainGroupByFieldMetadataIsAddedOrUpdated && !viewBecomesKanban) {
            const mainGroupByFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: updatedMainGroupByFieldMetadataUniversalIdentifier,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(mainGroupByFieldMetadata)) {
                validationResult.errors.push({
                    code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "QS/zML",
                        message: "Kanban main group by field metadata not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "QS/zML",
                        message: "Kanban main group by field metadata not found"
                    }
                });
            } else if (mainGroupByFieldMetadata.type !== _types.FieldMetadataType.SELECT) {
                validationResult.errors.push({
                    code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "RoCvZe",
                        message: "Kanban main group by field must be a SELECT field"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "ZfLcEk",
                        message: "Kanban main group by field must be a select field"
                    }
                });
            }
        }
        return validationResult;
    }
    validateFlatViewDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewMaps: optimisticFlatViewMaps, flatObjectMetadataMaps: optimisticFlatObjectMetadataMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier
            },
            metadataName: 'view',
            type: 'delete'
        });
        const existingFlatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewMaps
        });
        if (!(0, _utils.isDefined)(existingFlatView)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
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
        const parentObjectStillExists = (0, _utils.isDefined)((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: existingFlatView.objectMetadataUniversalIdentifier,
            flatEntityMaps: optimisticFlatObjectMetadataMaps
        }));
        if (parentObjectStillExists) {
            const viewsForSameObject = Object.values(optimisticFlatViewMaps.byUniversalIdentifier).filter((view)=>(0, _utils.isDefined)(view) && view.objectMetadataUniversalIdentifier === existingFlatView.objectMetadataUniversalIdentifier);
            if (viewsForSameObject.length <= 1) {
                validationResult.errors.push({
                    code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "W3Ik7m",
                        message: "Cannot delete the only view for this object"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "W3Ik7m",
                        message: "Cannot delete the only view for this object"
                    }
                });
            }
        }
        return validationResult;
    }
    validateFlatViewCreation({ flatEntityToValidate: flatViewToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewMaps: optimisticFlatViewMaps, flatFieldMetadataMaps, flatObjectMetadataMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatViewToValidate.universalIdentifier
            },
            metadataName: 'view',
            type: 'create'
        });
        const optimisticFlatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewToValidate.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(optimisticFlatObjectMetadata)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
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
        if ((0, _utils.isDefined)((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewMaps
        }))) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "RvdHYC",
                    message: "View with same universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "HhN1Bv",
                    message: "View already exists"
                }
            });
        }
        if ((0, _utils.isDefined)(flatViewToValidate.kanbanAggregateOperationFieldMetadataUniversalIdentifier) && !(0, _utils.isDefined)((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewToValidate.kanbanAggregateOperationFieldMetadataUniversalIdentifier,
            flatEntityMaps: flatFieldMetadataMaps
        }))) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "M7KWZV",
                    message: "View kanban aggregate field metadata not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "M7KWZV",
                    message: "View kanban aggregate field metadata not found"
                }
            });
        }
        const isKanban = flatViewToValidate.type === _types.ViewType.KANBAN;
        if (isKanban) {
            if (!(0, _utils.isDefined)(flatViewToValidate.mainGroupByFieldMetadataUniversalIdentifier)) {
                validationResult.errors.push({
                    code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "mAbBLH",
                        message: "Kanban view must have a main group by field"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "mAbBLH",
                        message: "Kanban view must have a main group by field"
                    }
                });
                return validationResult;
            }
            const mainGroupByFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatViewToValidate.mainGroupByFieldMetadataUniversalIdentifier,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(mainGroupByFieldMetadata)) {
                validationResult.errors.push({
                    code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "QS/zML",
                        message: "Kanban main group by field metadata not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "QS/zML",
                        message: "Kanban main group by field metadata not found"
                    }
                });
            } else if (mainGroupByFieldMetadata.type !== _types.FieldMetadataType.SELECT) {
                validationResult.errors.push({
                    code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "RoCvZe",
                        message: "Kanban main group by field must be a SELECT field"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "ZfLcEk",
                        message: "Kanban main group by field must be a select field"
                    }
                });
            }
        }
        return validationResult;
    }
    constructor(){}
};

//# sourceMappingURL=flat-view-validator.service.js.map