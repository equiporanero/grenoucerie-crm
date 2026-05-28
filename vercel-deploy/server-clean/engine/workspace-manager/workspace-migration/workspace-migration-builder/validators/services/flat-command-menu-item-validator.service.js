"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatCommandMenuItemValidatorService", {
    enumerable: true,
    get: function() {
        return FlatCommandMenuItemValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _commandmenuitemexception = require("../../../../../metadata-modules/command-menu-item/command-menu-item.exception");
const _enginecomponentkeyenum = require("../../../../../metadata-modules/command-menu-item/enums/engine-component-key.enum");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatCommandMenuItemValidatorService = class FlatCommandMenuItemValidatorService {
    validateFlatCommandMenuItemCreation({ flatEntityToValidate: flatCommandMenuItem }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatCommandMenuItem.universalIdentifier
            },
            metadataName: 'commandMenuItem',
            type: 'create'
        });
        if (!(0, _guards.isNonEmptyString)(flatCommandMenuItem.label)) {
            validationResult.errors.push({
                code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "w8Rv8T",
                    message: "Label is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "w8Rv8T",
                    message: "Label is required"
                }
            });
        }
        if (!(0, _utils.isDefined)(flatCommandMenuItem.engineComponentKey)) {
            validationResult.errors.push({
                code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "BmtSAK",
                    message: "engineComponentKey is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "g2om8o",
                    message: "Engine component key is required"
                }
            });
        }
        this.validateEngineComponentKeyCoherence({
            engineComponentKey: flatCommandMenuItem.engineComponentKey,
            workflowVersionId: flatCommandMenuItem.workflowVersionId,
            frontComponentUniversalIdentifier: flatCommandMenuItem.frontComponentUniversalIdentifier,
            payload: flatCommandMenuItem.payload,
            validationResult
        });
        return validationResult;
    }
    validateFlatCommandMenuItemDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatCommandMenuItemMaps: optimisticFlatCommandMenuItemMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier
            },
            metadataName: 'commandMenuItem',
            type: 'delete'
        });
        const existingCommandMenuItem = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatCommandMenuItemMaps
        });
        if (!(0, _utils.isDefined)(existingCommandMenuItem)) {
            validationResult.errors.push({
                code: _commandmenuitemexception.CommandMenuItemExceptionCode.COMMAND_MENU_ITEM_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "xBSqqt",
                    message: "Command menu item not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "xBSqqt",
                    message: "Command menu item not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatCommandMenuItemUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatCommandMenuItemMaps: optimisticFlatCommandMenuItemMaps } }) {
        const fromFlatCommandMenuItem = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatCommandMenuItemMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'commandMenuItem',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatCommandMenuItem)) {
            validationResult.errors.push({
                code: _commandmenuitemexception.CommandMenuItemExceptionCode.COMMAND_MENU_ITEM_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "xBSqqt",
                    message: "Command menu item not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "xBSqqt",
                    message: "Command menu item not found"
                }
            });
            return validationResult;
        }
        const labelUpdate = flatEntityUpdate.label;
        if ((0, _utils.isDefined)(labelUpdate) && !(0, _guards.isNonEmptyString)(labelUpdate)) {
            validationResult.errors.push({
                code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "w8Rv8T",
                    message: "Label is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "w8Rv8T",
                    message: "Label is required"
                }
            });
        }
        const engineComponentKey = flatEntityUpdate.engineComponentKey ?? fromFlatCommandMenuItem.engineComponentKey;
        const payload = flatEntityUpdate.payload !== undefined ? flatEntityUpdate.payload : fromFlatCommandMenuItem.payload;
        this.validateEngineComponentKeyCoherence({
            engineComponentKey,
            workflowVersionId: fromFlatCommandMenuItem.workflowVersionId,
            frontComponentUniversalIdentifier: fromFlatCommandMenuItem.frontComponentUniversalIdentifier,
            payload,
            validationResult
        });
        return validationResult;
    }
    validateEngineComponentKeyCoherence({ engineComponentKey, workflowVersionId, frontComponentUniversalIdentifier, payload, validationResult }) {
        if (!(0, _utils.isDefined)(engineComponentKey)) {
            return;
        }
        switch(engineComponentKey){
            case _enginecomponentkeyenum.EngineComponentKey.TRIGGER_WORKFLOW_VERSION:
                {
                    if (!(0, _guards.isNonEmptyString)(workflowVersionId)) {
                        validationResult.errors.push({
                            code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "m34s12",
                                message: "workflowVersionId is required when engineComponentKey is TRIGGER_WORKFLOW_VERSION"
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "4OOQwW",
                                message: "Workflow version is required for workflow trigger items"
                            }
                        });
                    }
                    if ((0, _guards.isNonEmptyString)(frontComponentUniversalIdentifier)) {
                        validationResult.errors.push({
                            code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "z8/E1J",
                                message: "frontComponentId must not be set when engineComponentKey is TRIGGER_WORKFLOW_VERSION"
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "AfxLzg",
                                message: "Front component must not be set for workflow trigger items"
                            }
                        });
                    }
                    break;
                }
            case _enginecomponentkeyenum.EngineComponentKey.FRONT_COMPONENT_RENDERER:
                {
                    if (!(0, _guards.isNonEmptyString)(frontComponentUniversalIdentifier)) {
                        validationResult.errors.push({
                            code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "4wM9Cs",
                                message: "frontComponentId is required when engineComponentKey is FRONT_COMPONENT_RENDERER"
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "A7aUMa",
                                message: "Front component is required for front component renderer items"
                            }
                        });
                    }
                    if ((0, _guards.isNonEmptyString)(workflowVersionId)) {
                        validationResult.errors.push({
                            code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "lscvqN",
                                message: "workflowVersionId must not be set when engineComponentKey is FRONT_COMPONENT_RENDERER"
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "LrPIBF",
                                message: "Workflow version must not be set for front component renderer items"
                            }
                        });
                    }
                    break;
                }
            case _enginecomponentkeyenum.EngineComponentKey.NAVIGATION:
                {
                    this.validateNavigationPayload({
                        payload,
                        validationResult
                    });
                    if ((0, _guards.isNonEmptyString)(workflowVersionId)) {
                        validationResult.errors.push({
                            code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "+67q2u",
                                message: "workflowVersionId must not be set for engine component key {engineComponentKey}",
                                values: {
                                    engineComponentKey: engineComponentKey
                                }
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "f9Rp2t",
                                message: "Workflow version must not be set for this item type"
                            }
                        });
                    }
                    if ((0, _guards.isNonEmptyString)(frontComponentUniversalIdentifier)) {
                        validationResult.errors.push({
                            code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "N6YN7J",
                                message: "frontComponentId must not be set for engine component key {engineComponentKey}",
                                values: {
                                    engineComponentKey: engineComponentKey
                                }
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "0aXgXb",
                                message: "Front component must not be set for this item type"
                            }
                        });
                    }
                    break;
                }
            default:
                {
                    if ((0, _guards.isNonEmptyString)(workflowVersionId)) {
                        validationResult.errors.push({
                            code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "+67q2u",
                                message: "workflowVersionId must not be set for engine component key {engineComponentKey}",
                                values: {
                                    engineComponentKey: engineComponentKey
                                }
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "f9Rp2t",
                                message: "Workflow version must not be set for this item type"
                            }
                        });
                    }
                    if ((0, _guards.isNonEmptyString)(frontComponentUniversalIdentifier)) {
                        validationResult.errors.push({
                            code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "N6YN7J",
                                message: "frontComponentId must not be set for engine component key {engineComponentKey}",
                                values: {
                                    engineComponentKey: engineComponentKey
                                }
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "0aXgXb",
                                message: "Front component must not be set for this item type"
                            }
                        });
                    }
                    break;
                }
        }
    }
    validateNavigationPayload({ payload, validationResult }) {
        if (!(0, _utils.isDefined)(payload)) {
            validationResult.errors.push({
                code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "Enmszs",
                    message: "payload is required when engineComponentKey is NAVIGATION"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "DpnDl6",
                    message: "Payload is required for navigation items"
                }
            });
            return;
        }
        const hasPath = 'path' in payload && (0, _guards.isNonEmptyString)(payload.path);
        const hasObjectMetadataItemId = 'objectMetadataItemId' in payload && (0, _guards.isNonEmptyString)(payload.objectMetadataItemId);
        if (!hasPath && !hasObjectMetadataItemId) {
            validationResult.errors.push({
                code: _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "QXVtcO",
                    message: 'payload must contain either a "path" or "objectMetadataItemId" property'
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "Z+s6mX",
                    message: "Payload must contain either a path or an object metadata item identifier"
                }
            });
        }
    }
};
FlatCommandMenuItemValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatCommandMenuItemValidatorService);

//# sourceMappingURL=flat-command-menu-item-validator.service.js.map