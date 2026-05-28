"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get MCP_PROGRESS_NOTIFICATION_METHOD () {
        return MCP_PROGRESS_NOTIFICATION_METHOD;
    },
    get TOOL_CALL_PROGRESS_TOKEN_PREFIX () {
        return TOOL_CALL_PROGRESS_TOKEN_PREFIX;
    }
});
const MCP_PROGRESS_NOTIFICATION_METHOD = 'notifications/progress';
const TOOL_CALL_PROGRESS_TOKEN_PREFIX = 'tool-call-';

//# sourceMappingURL=mcp-progress-notification.const.js.map