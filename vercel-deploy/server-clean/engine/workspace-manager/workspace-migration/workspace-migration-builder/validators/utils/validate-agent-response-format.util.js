"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAgentResponseFormat", {
    enumerable: true,
    get: function() {
        return validateAgentResponseFormat;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _aiexception = require("../../../../../metadata-modules/ai/ai.exception");
const validateAgentResponseFormat = ({ responseFormat })=>{
    const errors = [];
    const type = responseFormat.type;
    if (type !== 'text' && type !== 'json') {
        errors.push({
            code: _aiexception.AiExceptionCode.INVALID_AGENT_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "KPIUoa",
                message: 'Response format type must be either "text" or "json"'
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "m4y7mj",
                message: "Invalid response format type"
            }
        });
    }
    if (type === 'json' && !(0, _utils.isDefined)(responseFormat.schema)) {
        errors.push({
            code: _aiexception.AiExceptionCode.INVALID_AGENT_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "6Plp3x",
                message: 'Response format with type "json" must include a schema'
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "eCBMag",
                message: "JSON response format requires a schema"
            }
        });
    }
    if (type === 'text' && (0, _utils.isDefined)(responseFormat.schema)) {
        errors.push({
            code: _aiexception.AiExceptionCode.INVALID_AGENT_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "JCqfz6",
                message: 'Response format with type "text" should not include a schema'
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "mQj02P",
                message: "Text response format should not have a schema"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-agent-response-format.util.js.map