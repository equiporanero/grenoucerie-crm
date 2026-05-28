/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppBillingModule", {
    enumerable: true,
    get: function() {
        return AppBillingModule;
    }
});
const _common = require("@nestjs/common");
const _appbillingcontroller = require("./app-billing.controller");
const _appbillingservice = require("./app-billing.service");
const _authmodule = require("../../auth/auth.module");
const _billingmodule = require("../billing.module");
const _throttlermodule = require("../../throttler/throttler.module");
const _twentyconfigmodule = require("../../twenty-config/twenty-config.module");
const _workspacecachestoragemodule = require("../../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
const _workspaceeventemittermodule = require("../../../workspace-event-emitter/workspace-event-emitter.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppBillingModule = class AppBillingModule {
};
AppBillingModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _authmodule.AuthModule,
            _billingmodule.BillingModule,
            _throttlermodule.ThrottlerModule,
            _twentyconfigmodule.TwentyConfigModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspaceeventemittermodule.WorkspaceEventEmitterModule
        ],
        controllers: [
            _appbillingcontroller.AppBillingController
        ],
        providers: [
            _appbillingservice.AppBillingService
        ],
        exports: [
            _appbillingservice.AppBillingService
        ]
    })
], AppBillingModule);

//# sourceMappingURL=app-billing.module.js.map