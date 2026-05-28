"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetricsKeys", {
    enumerable: true,
    get: function() {
        return MetricsKeys;
    }
});
var MetricsKeys = /*#__PURE__*/ function(MetricsKeys) {
    MetricsKeys["MessageChannelSyncJobActive"] = "message-channel-sync-job/active";
    MetricsKeys["MessageChannelSyncJobFailedInsufficientPermissions"] = "message-channel-sync-job/failed-insufficient-permissions";
    MetricsKeys["MessageChannelSyncJobFailedUnknown"] = "message-channel-sync-job/failed-unknown";
    MetricsKeys["CalendarEventSyncJobActive"] = "calendar-event-sync-job/active";
    MetricsKeys["CalendarEventSyncJobFailedInsufficientPermissions"] = "calendar-event-sync-job/failed-insufficient-permissions";
    MetricsKeys["CalendarEventSyncJobFailedUnknown"] = "calendar-event-sync-job/failed-unknown";
    MetricsKeys["InvalidCaptcha"] = "invalid-captcha";
    MetricsKeys["GraphqlOperation200"] = "graphql-operation/200";
    MetricsKeys["GraphqlOperation400"] = "graphql-operation/400";
    MetricsKeys["GraphqlOperation401"] = "graphql-operation/401";
    MetricsKeys["GraphqlOperation403"] = "graphql-operation/403";
    MetricsKeys["GraphqlOperation404"] = "graphql-operation/404";
    MetricsKeys["GraphqlOperation500"] = "graphql-operation/500";
    MetricsKeys["GraphqlOperationUnknown"] = "graphql-operation/unknown";
    MetricsKeys["WorkflowRunStartedDatabaseEventTrigger"] = "workflow-run/started/database-event-trigger";
    MetricsKeys["WorkflowRunStartedCronTrigger"] = "workflow-run/started/cron-trigger";
    MetricsKeys["WorkflowRunStartedWebhookTrigger"] = "workflow-run/started/webhook-trigger";
    MetricsKeys["WorkflowRunStartedManualTrigger"] = "workflow-run/started/manual-trigger";
    MetricsKeys["WorkflowRunCompleted"] = "workflow-run/completed";
    MetricsKeys["WorkflowRunFailed"] = "workflow-run/failed";
    MetricsKeys["WorkflowRunStopped"] = "workflow-run/stopped";
    MetricsKeys["WorkflowRunThrottled"] = "workflow-run/throttled";
    MetricsKeys["WorkflowRunFailedToEnqueue"] = "workflow-run/failed/to-enqueue";
    MetricsKeys["WorkflowRunSystemError"] = "workflow-run/system-error";
    MetricsKeys["AiChatToolExecutionSucceeded"] = "ai-chat/tool-execution-succeeded";
    MetricsKeys["AiChatToolExecutionFailed"] = "ai-chat/tool-execution-failed";
    MetricsKeys["McpToolExecutionSucceeded"] = "mcp/tool-execution-succeeded";
    MetricsKeys["McpToolExecutionFailed"] = "mcp/tool-execution-failed";
    MetricsKeys["AiChatInputTokens"] = "ai-chat/input-tokens";
    MetricsKeys["AiChatOutputTokens"] = "ai-chat/output-tokens";
    MetricsKeys["AiChatCacheReadTokens"] = "ai-chat/cache-read-tokens";
    MetricsKeys["AiChatCacheWriteTokens"] = "ai-chat/cache-write-tokens";
    MetricsKeys["SchemaVersionMismatch"] = "schema-version/mismatch";
    MetricsKeys["AppVersionMismatch"] = "app-version/mismatch";
    MetricsKeys["CronJobDeletedWorkspace"] = "cron-job/deleted-workspace";
    MetricsKeys["JobWebhookCallCompleted"] = "job/webhook-call-completed";
    MetricsKeys["SignUpSuccess"] = "sign-up/success";
    MetricsKeys["CommonApiQueryRateLimited"] = "common-api-query/rate-limited";
    MetricsKeys["JobCompleted"] = "job/completed";
    MetricsKeys["JobFailed"] = "job/failed";
    MetricsKeys["JobWaiting"] = "job/waiting";
    MetricsKeys["AiChatTurnLatencyMs"] = "ai-chat/turn-latency-ms";
    MetricsKeys["AiChatStepLatencyMs"] = "ai-chat/step-latency-ms";
    MetricsKeys["AiChatTtftMs"] = "ai-chat/ttft-ms";
    return MetricsKeys;
}({});

//# sourceMappingURL=metrics-keys.type.js.map