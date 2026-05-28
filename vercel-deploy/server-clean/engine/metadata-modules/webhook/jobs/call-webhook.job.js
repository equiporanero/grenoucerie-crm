"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CallWebhookJob", {
    enumerable: true,
    get: function() {
        return CallWebhookJob;
    }
});
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _utils = require("twenty-shared/utils");
const _auditservice = require("../../../core-modules/audit/services/audit.service");
const _webhookresponse = require("../../../core-modules/audit/utils/events/workspace-event/webhook/webhook-response");
const _processdecorator = require("../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../core-modules/message-queue/message-queue.constants");
const _metricsservice = require("../../../core-modules/metrics/metrics.service");
const _metricskeystype = require("../../../core-modules/metrics/types/metrics-keys.type");
const _securehttpclientservice = require("../../../core-modules/secure-http-client/secure-http-client.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CallWebhookJob = class CallWebhookJob {
    generateSignature(payload, secret, timestamp) {
        return _crypto.default.createHmac('sha256', secret).update(`${timestamp}:${JSON.stringify(payload)}`).digest('hex');
    }
    async handle(webhookJobEvents) {
        await Promise.all(webhookJobEvents.map(async (webhookJobEvent)=>await this.callWebhook(webhookJobEvent)));
    }
    async callWebhook(data) {
        const commonPayload = {
            url: data.targetUrl,
            webhookId: data.webhookId,
            eventName: data.eventName
        };
        const auditService = this.auditService.createContext({
            workspaceId: data.workspaceId
        });
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const { secret, ...payloadWithoutSecret } = data;
            if (secret) {
                headers['X-Twenty-Webhook-Timestamp'] = Date.now().toString();
                headers['X-Twenty-Webhook-Signature'] = this.generateSignature(payloadWithoutSecret, secret, headers['X-Twenty-Webhook-Timestamp']);
                headers['X-Twenty-Webhook-Nonce'] = _crypto.default.randomBytes(16).toString('hex');
            }
            const axiosClient = this.secureHttpClientService.getHttpClient(undefined, {
                workspaceId: data.workspaceId,
                userId: data.userId,
                source: 'webhook'
            });
            const response = await axiosClient.post((0, _utils.ensureAbsoluteUrl)(data.targetUrl), payloadWithoutSecret, {
                headers,
                timeout: 5_000
            });
            const success = response.status >= 200 && response.status < 300;
            void auditService.insertWorkspaceEvent(_webhookresponse.WEBHOOK_RESPONSE_EVENT, {
                status: response.status,
                success,
                ...commonPayload
            });
            void this.metricsService.incrementCounterForEvent({
                key: _metricskeystype.MetricsKeys.JobWebhookCallCompleted,
                shouldStoreInCache: false
            });
        } catch (err) {
            const isSSRFBlocked = err instanceof Error && err.message.includes('internal IP address') && err.message.includes('is not allowed');
            void auditService.insertWorkspaceEvent(_webhookresponse.WEBHOOK_RESPONSE_EVENT, {
                success: false,
                ...commonPayload,
                ...err.response && {
                    status: err.response.status
                },
                ...isSSRFBlocked && {
                    error: 'Webhook URL resolves to a private/internal IP address'
                }
            });
        }
    }
    constructor(auditService, metricsService, secureHttpClientService){
        this.auditService = auditService;
        this.metricsService = metricsService;
        this.secureHttpClientService = secureHttpClientService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CallWebhookJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], CallWebhookJob.prototype, "handle", null);
CallWebhookJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.webhookQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _auditservice.AuditService === "undefined" ? Object : _auditservice.AuditService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], CallWebhookJob);

//# sourceMappingURL=call-webhook.job.js.map