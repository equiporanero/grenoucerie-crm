"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WebhookJobModule", {
    enumerable: true,
    get: function() {
        return WebhookJobModule;
    }
});
const _common = require("@nestjs/common");
const _auditmodule = require("../../../core-modules/audit/audit.module");
const _metricsmodule = require("../../../core-modules/metrics/metrics.module");
const _securehttpclientmodule = require("../../../core-modules/secure-http-client/secure-http-client.module");
const _flatwebhookmodule = require("../../flat-webhook/flat-webhook.module");
const _callwebhookjobsformetadatajob = require("./call-webhook-jobs-for-metadata.job");
const _callwebhookjobsjob = require("./call-webhook-jobs.job");
const _callwebhookjob = require("./call-webhook.job");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WebhookJobModule = class WebhookJobModule {
};
WebhookJobModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _auditmodule.AuditModule,
            _flatwebhookmodule.FlatWebhookModule,
            _metricsmodule.MetricsModule,
            _securehttpclientmodule.SecureHttpClientModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _callwebhookjobsjob.CallWebhookJobsJob,
            _callwebhookjobsformetadatajob.CallWebhookJobsForMetadataJob,
            _callwebhookjob.CallWebhookJob
        ]
    })
], WebhookJobModule);

//# sourceMappingURL=webhook-job.module.js.map