"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiGenerateTextModule", {
    enumerable: true,
    get: function() {
        return AiGenerateTextModule;
    }
});
const _common = require("@nestjs/common");
const _tokenmodule = require("../../../core-modules/auth/token/token.module");
const _billingmodule = require("../../../core-modules/billing/billing.module");
const _aibillingmodule = require("../ai-billing/ai-billing.module");
const _permissionsmodule = require("../../permissions/permissions.module");
const _workspacecachestoragemodule = require("../../../workspace-cache-storage/workspace-cache-storage.module");
const _aigeneratetextcontroller = require("./controllers/ai-generate-text.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AiGenerateTextModule = class AiGenerateTextModule {
};
AiGenerateTextModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _tokenmodule.TokenModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _permissionsmodule.PermissionsModule,
            _billingmodule.BillingModule,
            _aibillingmodule.AiBillingModule
        ],
        controllers: [
            _aigeneratetextcontroller.AiGenerateTextController
        ]
    })
], AiGenerateTextModule);

//# sourceMappingURL=ai-generate-text.module.js.map