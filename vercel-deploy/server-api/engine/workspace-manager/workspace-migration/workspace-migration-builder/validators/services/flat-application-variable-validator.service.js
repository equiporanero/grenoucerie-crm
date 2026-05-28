"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatApplicationVariableValidatorService", {
    enumerable: true,
    get: function() {
        return FlatApplicationVariableValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _applicationvariableexception = require("../../../../../core-modules/application/application-variable/application-variable.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatApplicationVariableValidatorService = class FlatApplicationVariableValidatorService {
    validateFlatApplicationVariableCreation({ flatEntityToValidate: flatApplicationVariable, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatApplicationVariableMaps: optimisticFlatApplicationVariableMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatApplicationVariable.universalIdentifier,
                key: flatApplicationVariable.key
            },
            metadataName: 'applicationVariable',
            type: 'create'
        });
        if (!(0, _guards.isNonEmptyString)(flatApplicationVariable.key)) {
            validationResult.errors.push({
                code: _applicationvariableexception.ApplicationVariableEntityExceptionCode.INVALID_APPLICATION_VARIABLE_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "5MJQ4s",
                    message: "Application variable key is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "5MJQ4s",
                    message: "Application variable key is required"
                }
            });
        }
        const existingVariableWithSameKey = Object.values(optimisticFlatApplicationVariableMaps.byUniversalIdentifier).find((variable)=>(0, _utils.isDefined)(variable) && variable.key === flatApplicationVariable.key && variable.universalIdentifier !== flatApplicationVariable.universalIdentifier);
        if ((0, _utils.isDefined)(existingVariableWithSameKey)) {
            validationResult.errors.push({
                code: _applicationvariableexception.ApplicationVariableEntityExceptionCode.INVALID_APPLICATION_VARIABLE_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "K+YEBR",
                    message: "Application variable key must be unique"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "K+YEBR",
                    message: "Application variable key must be unique"
                }
            });
        }
        return validationResult;
    }
    validateFlatApplicationVariableDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatApplicationVariableMaps: optimisticFlatApplicationVariableMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                key: flatEntityToValidate.key
            },
            metadataName: 'applicationVariable',
            type: 'delete'
        });
        const existingVariable = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatApplicationVariableMaps
        });
        if (!(0, _utils.isDefined)(existingVariable)) {
            validationResult.errors.push({
                code: _applicationvariableexception.ApplicationVariableEntityExceptionCode.APPLICATION_VARIABLE_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "e6tjp1",
                    message: "Application variable not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "e6tjp1",
                    message: "Application variable not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatApplicationVariableUpdate({ universalIdentifier, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatApplicationVariableMaps: optimisticFlatApplicationVariableMaps } }) {
        const fromFlatApplicationVariable = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatApplicationVariableMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'applicationVariable',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatApplicationVariable)) {
            validationResult.errors.push({
                code: _applicationvariableexception.ApplicationVariableEntityExceptionCode.APPLICATION_VARIABLE_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "e6tjp1",
                    message: "Application variable not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "e6tjp1",
                    message: "Application variable not found"
                }
            });
        }
        return validationResult;
    }
};
FlatApplicationVariableValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatApplicationVariableValidatorService);

//# sourceMappingURL=flat-application-variable-validator.service.js.map