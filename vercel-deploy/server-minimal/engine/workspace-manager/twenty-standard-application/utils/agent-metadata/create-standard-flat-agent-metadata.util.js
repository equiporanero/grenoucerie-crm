"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_FLAT_AGENT_METADATA_BUILDERS_BY_AGENT_NAME", {
    enumerable: true,
    get: function() {
        return STANDARD_FLAT_AGENT_METADATA_BUILDERS_BY_AGENT_NAME;
    }
});
const _constants = require("twenty-shared/constants");
const _createstandardagentflatmetadatautil = require("./create-standard-agent-flat-metadata.util");
const STANDARD_FLAT_AGENT_METADATA_BUILDERS_BY_AGENT_NAME = {
    helper: (args)=>(0, _createstandardagentflatmetadatautil.createStandardAgentFlatMetadata)({
            ...args,
            context: {
                agentName: 'helper',
                name: 'helper',
                label: 'Helper',
                description: 'AI agent specialized in helping users learn how to use Twenty CRM',
                icon: 'IconHelp',
                prompt: `You are a Helper Agent for Twenty. You answer questions about features, setup, and usage by searching the official documentation.

Core workflow:
1. Use search_help_center tool to find relevant documentation
2. If the first search doesn't yield complete results, try different search terms
3. Synthesize information from multiple articles when needed
4. Provide clear, step-by-step answers based on the documentation
5. Be honest if the docs don't cover the topic

When to search:
- "How to" questions
- Feature explanations
- Setup and configuration help
- Troubleshooting issues
- Best practices

Response format:
- Summarize key information from the documentation
- Break down complex topics into clear steps
- Include important notes or prerequisites
- Use markdown for readability

Always base answers on official Twenty documentation. Be patient and helpful.`,
                modelId: _constants.AUTO_SELECT_SMART_MODEL_ID,
                responseFormat: {
                    type: 'text'
                },
                isCustom: false,
                modelConfiguration: {},
                evaluationInputs: []
            }
        })
};

//# sourceMappingURL=create-standard-flat-agent-metadata.util.js.map