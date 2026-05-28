"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatAgentValidatorService", {
    enumerable: true,
    get: function() {
        return FlatAgentValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _aiexception = require("../../../../../metadata-modules/ai/ai.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _belongstotwentystandardapputil = require("../../../../../metadata-modules/utils/belongs-to-twenty-standard-app.util");
const _iscallertwentystandardapputil = require("../../../../../metadata-modules/utils/is-caller-twenty-standard-app.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
const _validateagentnameuniquenessutil = require("../utils/validate-agent-name-uniqueness.util");
const _validateagentrequiredpropertiesutil = require("../utils/validate-agent-required-properties.util");
const _validateagentresponseformatutil = require("../utils/validate-agent-response-format.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatAgentValidatorService = class FlatAgentValidatorService {
    validateFlatAgentCreation({ flatEntityToValidate: flatAgent, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatAgentMaps: optimisticFlatAgentMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatAgent.universalIdentifier,
                name: flatAgent.name
            },
            metadataName: 'agent',
            type: 'create'
        });
        const existingAgents = Object.values(optimisticFlatAgentMaps.byUniversalIdentifier).filter(_utils.isDefined);
        validationResult.errors.push(...(0, _validateagentrequiredpropertiesutil.validateAgentRequiredProperties)({
            flatAgent
        }));
        validationResult.errors.push(...(0, _validateagentnameuniquenessutil.validateAgentNameUniqueness)({
            name: flatAgent.name,
            existingFlatAgents: existingAgents
        }));
        if ((0, _utils.isDefined)(flatAgent.responseFormat)) {
            validationResult.errors.push(...(0, _validateagentresponseformatutil.validateAgentResponseFormat)({
                responseFormat: flatAgent.responseFormat
            }));
        }
        return validationResult;
    }
    validateFlatAgentDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatAgentMaps: optimisticFlatAgentMaps }, buildOptions }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                name: flatEntityToValidate.name
            },
            metadataName: 'agent',
            type: 'delete'
        });
        const existingAgent = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatAgentMaps
        });
        if (!(0, _utils.isDefined)(existingAgent)) {
            validationResult.errors.push({
                code: _aiexception.AiExceptionCode.AGENT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "mDXkHu",
                    message: "Agent not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "mDXkHu",
                    message: "Agent not found"
                }
            });
            return validationResult;
        }
        if (!(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions) && (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)({
            universalIdentifier: existingAgent.universalIdentifier,
            applicationUniversalIdentifier: existingAgent.applicationUniversalIdentifier
        })) {
            validationResult.errors.push({
                code: _aiexception.AiExceptionCode.AGENT_IS_STANDARD,
                message: _core.i18n._(/*i18n*/ {
                    id: "RYRFbW",
                    message: "Cannot delete standard agent"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "RYRFbW",
                    message: "Cannot delete standard agent"
                }
            });
        }
        return validationResult;
    }
    validateFlatAgentUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatAgentMaps: optimisticFlatAgentMaps }, buildOptions }) {
        const fromFlatAgent = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatAgentMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'agent',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatAgent)) {
            validationResult.errors.push({
                code: _aiexception.AiExceptionCode.AGENT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "mDXkHu",
                    message: "Agent not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "mDXkHu",
                    message: "Agent not found"
                }
            });
            return validationResult;
        }
        if (!(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions) && (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)({
            universalIdentifier: fromFlatAgent.universalIdentifier,
            applicationUniversalIdentifier: fromFlatAgent.applicationUniversalIdentifier
        })) {
            validationResult.errors.push({
                code: _aiexception.AiExceptionCode.AGENT_IS_STANDARD,
                message: _core.i18n._(/*i18n*/ {
                    id: "fpzw+t",
                    message: "Cannot update standard agent"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "fpzw+t",
                    message: "Cannot update standard agent"
                }
            });
        }
        const optimisticFlatAgent = {
            ...fromFlatAgent,
            ...flatEntityUpdate
        };
        const existingAgents = Object.values(optimisticFlatAgentMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((agent)=>agent.universalIdentifier !== universalIdentifier);
        validationResult.errors.push(...(0, _validateagentrequiredpropertiesutil.validateAgentRequiredProperties)({
            flatAgent: optimisticFlatAgent,
            updatedProperties: flatEntityUpdate
        }));
        if ((0, _utils.isDefined)(flatEntityUpdate.name)) {
            validationResult.errors.push(...(0, _validateagentnameuniquenessutil.validateAgentNameUniqueness)({
                name: flatEntityUpdate.name,
                existingFlatAgents: existingAgents
            }));
        }
        if ((0, _utils.isDefined)(flatEntityUpdate.responseFormat)) {
            validationResult.errors.push(...(0, _validateagentresponseformatutil.validateAgentResponseFormat)({
                responseFormat: flatEntityUpdate.responseFormat
            }));
        }
        return validationResult;
    }
};
FlatAgentValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatAgentValidatorService);

//# sourceMappingURL=flat-agent-validator.service.js.map