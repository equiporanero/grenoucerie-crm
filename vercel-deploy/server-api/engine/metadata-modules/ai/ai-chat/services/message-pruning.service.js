"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagePruningService", {
    enumerable: true,
    get: function() {
        return MessagePruningService;
    }
});
const _common = require("@nestjs/common");
const _ai = require("ai");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const COMPACTION_THRESHOLD_RATIO = 0.9;
const TOOL_CALLS_PRESERVE_LAST_N_MESSAGES = 2;
let MessagePruningService = class MessagePruningService {
    pruneIfOverContextWindowLimit(messages, contextWindowTokens, conversationSizeTokens) {
        const threshold = contextWindowTokens * COMPACTION_THRESHOLD_RATIO;
        if (conversationSizeTokens < threshold) {
            return {
                messages,
                wasPruned: false,
                isStillOverLimit: false
            };
        }
        this.logger.log(`Conversation size ${conversationSizeTokens} exceeds threshold ${Math.round(threshold)} (${contextWindowTokens} * ${COMPACTION_THRESHOLD_RATIO}). Pruning messages.`);
        const prunedMessages = (0, _ai.pruneMessages)({
            messages,
            reasoning: 'before-last-message',
            toolCalls: `before-last-${TOOL_CALLS_PRESERVE_LAST_N_MESSAGES}-messages`,
            emptyMessages: 'remove'
        });
        const wasPruned = prunedMessages.length < messages.length;
        if (wasPruned) {
            this.logger.log(`Pruned ${messages.length - prunedMessages.length} messages (${messages.length} → ${prunedMessages.length})`);
        }
        const isStillOverLimit = !wasPruned;
        return {
            messages: prunedMessages,
            wasPruned,
            isStillOverLimit
        };
    }
    constructor(){
        this.logger = new _common.Logger(MessagePruningService.name);
    }
};
MessagePruningService = _ts_decorate([
    (0, _common.Injectable)()
], MessagePruningService);

//# sourceMappingURL=message-pruning.service.js.map