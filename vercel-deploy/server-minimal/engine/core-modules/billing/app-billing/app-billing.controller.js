/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppBillingController", {
    enumerable: true,
    get: function() {
        return AppBillingController;
    }
});
const _common = require("@nestjs/common");
const _express = require("express");
const _utils = require("twenty-shared/utils");
const _appbillingservice = require("./app-billing.service");
const _chargedto = require("./dtos/charge.dto");
const _throttlerservice = require("../../throttler/throttler.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _jwtauthguard = require("../../../guards/jwt-auth.guard");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
// Belt-and-suspenders on top of LogicFunctionExecutorService's execution
// throttle: application-access tokens are JWTs usable outside the runtime.
const APP_BILLING_CHARGE_THROTTLE_LIMIT = 1000;
const APP_BILLING_CHARGE_THROTTLE_TTL_MS = 60_000;
let AppBillingController = class AppBillingController {
    async charge(request, charge) {
        // Billing disabled: no listener consumes the event — fail fast so apps
        // don't silently discard charges on Community instances.
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            throw new _common.NotFoundException();
        }
        // Reject user-access / api-key tokens — only application-access tokens
        // populate `request.application`.
        if (!(0, _utils.isDefined)(request.application) || !(0, _utils.isDefined)(request.workspace)) {
            throw new _common.ForbiddenException('App billing endpoint requires an APPLICATION_ACCESS token.');
        }
        await this.throttlerService.tokenBucketThrottleOrThrow(`${request.workspace.id}-${request.application.id}-app-billing-charge`, 1, APP_BILLING_CHARGE_THROTTLE_LIMIT, APP_BILLING_CHARGE_THROTTLE_TTL_MS);
        await this.appBillingService.emitChargeEvent({
            workspaceId: request.workspace.id,
            applicationId: request.application.id,
            userWorkspaceId: request.userWorkspaceId,
            charge
        });
    }
    constructor(appBillingService, throttlerService, twentyConfigService){
        this.appBillingService = appBillingService;
        this.throttlerService = throttlerService;
        this.twentyConfigService = twentyConfigService;
    }
};
_ts_decorate([
    (0, _common.Post)('charge'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    (0, _common.UsePipes)(new _common.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    })),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _chargedto.ChargeDto === "undefined" ? Object : _chargedto.ChargeDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AppBillingController.prototype, "charge", null);
AppBillingController = _ts_decorate([
    (0, _common.Controller)('app/billing'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _appbillingservice.AppBillingService === "undefined" ? Object : _appbillingservice.AppBillingService,
        typeof _throttlerservice.ThrottlerService === "undefined" ? Object : _throttlerservice.ThrottlerService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], AppBillingController);

//# sourceMappingURL=app-billing.controller.js.map