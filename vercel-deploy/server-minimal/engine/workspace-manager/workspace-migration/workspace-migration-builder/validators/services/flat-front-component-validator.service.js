"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatFrontComponentValidatorService", {
    enumerable: true,
    get: function() {
        return FlatFrontComponentValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _validatefilepathutil = require("../../../../../core-modules/file-storage/utils/validate-file-path.util");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _frontcomponentexception = require("../../../../../metadata-modules/front-component/front-component.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatFrontComponentValidatorService = class FlatFrontComponentValidatorService {
    validateFlatFrontComponentCreation({ flatEntityToValidate: flatFrontComponent }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatFrontComponent.universalIdentifier,
                name: flatFrontComponent.name
            },
            metadataName: 'frontComponent',
            type: 'create'
        });
        if (!(0, _guards.isNonEmptyString)(flatFrontComponent.name)) {
            validationResult.errors.push({
                code: _frontcomponentexception.FrontComponentExceptionCode.INVALID_FRONT_COMPONENT_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "BzEbyv",
                    message: "Front component name is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "BzEbyv",
                    message: "Front component name is required"
                }
            });
        }
        if ((0, _utils.isDefined)(flatFrontComponent.builtComponentPath)) {
            const builtPathResult = (0, _validatefilepathutil.validateFilePath)({
                resourcePath: flatFrontComponent.builtComponentPath,
                fileFolder: _types.FileFolder.BuiltFrontComponent
            });
            if (!builtPathResult.isValid) {
                validationResult.errors.push({
                    code: _frontcomponentexception.FrontComponentExceptionCode.INVALID_FRONT_COMPONENT_INPUT,
                    message: builtPathResult.error,
                    userFriendlyMessage: /*i18n*/ {
                        id: "8pSVh1",
                        message: "Built component path is invalid"
                    }
                });
            }
        }
        if ((0, _utils.isDefined)(flatFrontComponent.sourceComponentPath)) {
            const sourcePathResult = (0, _validatefilepathutil.validateFilePath)({
                resourcePath: flatFrontComponent.sourceComponentPath,
                fileFolder: _types.FileFolder.Source
            });
            if (!sourcePathResult.isValid) {
                validationResult.errors.push({
                    code: _frontcomponentexception.FrontComponentExceptionCode.INVALID_FRONT_COMPONENT_INPUT,
                    message: sourcePathResult.error,
                    userFriendlyMessage: /*i18n*/ {
                        id: "1AEtOW",
                        message: "Source component path is invalid"
                    }
                });
            }
        }
        return validationResult;
    }
    validateFlatFrontComponentDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFrontComponentMaps: optimisticFlatFrontComponentMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                name: flatEntityToValidate.name
            },
            metadataName: 'frontComponent',
            type: 'delete'
        });
        const existingFrontComponent = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatFrontComponentMaps
        });
        if (!(0, _utils.isDefined)(existingFrontComponent)) {
            validationResult.errors.push({
                code: _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "VZiHPV",
                    message: "Front component not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "VZiHPV",
                    message: "Front component not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    validateFlatFrontComponentUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFrontComponentMaps: optimisticFlatFrontComponentMaps } }) {
        const fromFlatFrontComponent = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatFrontComponentMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'frontComponent',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatFrontComponent)) {
            validationResult.errors.push({
                code: _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "VZiHPV",
                    message: "Front component not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "VZiHPV",
                    message: "Front component not found"
                }
            });
            return validationResult;
        }
        if ((0, _utils.isDefined)(flatEntityUpdate.builtComponentPath)) {
            const builtPathResult = (0, _validatefilepathutil.validateFilePath)({
                resourcePath: flatEntityUpdate.builtComponentPath,
                fileFolder: _types.FileFolder.BuiltFrontComponent
            });
            if (!builtPathResult.isValid) {
                validationResult.errors.push({
                    code: _frontcomponentexception.FrontComponentExceptionCode.INVALID_FRONT_COMPONENT_INPUT,
                    message: builtPathResult.error,
                    userFriendlyMessage: /*i18n*/ {
                        id: "8pSVh1",
                        message: "Built component path is invalid"
                    }
                });
            }
        }
        if ((0, _utils.isDefined)(flatEntityUpdate.sourceComponentPath)) {
            const sourcePathResult = (0, _validatefilepathutil.validateFilePath)({
                resourcePath: flatEntityUpdate.sourceComponentPath,
                fileFolder: _types.FileFolder.Source
            });
            if (!sourcePathResult.isValid) {
                validationResult.errors.push({
                    code: _frontcomponentexception.FrontComponentExceptionCode.INVALID_FRONT_COMPONENT_INPUT,
                    message: sourcePathResult.error,
                    userFriendlyMessage: /*i18n*/ {
                        id: "1AEtOW",
                        message: "Source component path is invalid"
                    }
                });
            }
        }
        return validationResult;
    }
};
FlatFrontComponentValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatFrontComponentValidatorService);

//# sourceMappingURL=flat-front-component-validator.service.js.map