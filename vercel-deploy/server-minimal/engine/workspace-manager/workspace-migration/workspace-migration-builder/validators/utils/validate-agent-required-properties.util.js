"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAgentRequiredProperties", {
    enumerable: true,
    get: function() {
        return validateAgentRequiredProperties;
    }
});
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _aiexception = require("../../../../../metadata-modules/ai/ai.exception");
const validateAgentRequiredProperties = ({ flatAgent, updatedProperties })=>{
    const errors = [];
    // For updates, only validate properties that are being changed
    const isUpdate = updatedProperties !== undefined;
    const shouldValidateLabel = !isUpdate || 'label' in updatedProperties;
    const shouldValidatePrompt = !isUpdate || 'prompt' in updatedProperties;
    const shouldValidateModelId = !isUpdate || 'modelId' in updatedProperties;
    if (shouldValidateLabel && !(0, _guards.isNonEmptyString)(flatAgent.label)) {
        errors.push({
            code: _aiexception.AiExceptionCode.INVALID_AGENT_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "6sFS+I",
                message: "Label cannot be empty"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "6sFS+I",
                message: "Label cannot be empty"
            }
        });
    }
    if (shouldValidatePrompt && !(0, _guards.isNonEmptyString)(flatAgent.prompt)) {
        errors.push({
            code: _aiexception.AiExceptionCode.INVALID_AGENT_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "t/0e9D",
                message: "Prompt cannot be empty"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "t/0e9D",
                message: "Prompt cannot be empty"
            }
        });
    }
    if (shouldValidateModelId && !(0, _guards.isNonEmptyString)(flatAgent.modelId)) {
        errors.push({
            code: _aiexception.AiExceptionCode.INVALID_AGENT_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "AHuHeg",
                message: "Model ID cannot be empty"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "AHuHeg",
                message: "Model ID cannot be empty"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-agent-required-properties.util.js.map