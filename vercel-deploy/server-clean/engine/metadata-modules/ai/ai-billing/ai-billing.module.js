"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiBillingModule", {
    enumerable: true,
    get: function() {
        return AiBillingModule;
    }
});
const _common = require("@nestjs/common");
const _billingmodule = require("../../../core-modules/billing/billing.module");
const _aibillingservice = require("./services/ai-billing.service");
const _aimodelsmodule = require("../ai-models/ai-models.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
const _workspaceeventemittermodule = require("../../../workspace-event-emitter/workspace-event-emitter.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AiBillingModule = class AiBillingModule {
};
AiBillingModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspaceeventemittermodule.WorkspaceEventEmitterModule,
            _aimodelsmodule.AiModelsModule,
            _billingmodule.BillingModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _aibillingservice.AiBillingService
        ],
        exports: [
            _aibillingservice.AiBillingService
        ]
    })
], AiBillingModule);

//# sourceMappingURL=ai-billing.module.js.map