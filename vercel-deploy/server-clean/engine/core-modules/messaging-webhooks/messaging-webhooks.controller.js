"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingWebhooksController", {
    enumerable: true,
    get: function() {
        return MessagingWebhooksController;
    }
});
const _common = require("@nestjs/common");
const _messagingwebhookapiexceptionfilter = require("./filters/messaging-webhook-api-exception.filter");
const _messagingwebhookexceptioncodeenum = require("./messaging-webhook-exception-code.enum");
const _messagingwebhookexception = require("./messaging-webhook.exception");
const _sesinboundwebhookrouterservice = require("./services/ses-inbound-webhook-router.service");
const _sesoutboundwebhookrouterservice = require("./services/ses-outbound-webhook-router.service");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _publicendpointguard = require("../../guards/public-endpoint.guard");
const _utils = require("twenty-shared/utils");
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
let MessagingWebhooksController = class MessagingWebhooksController {
    async handleSesInboundWebhook(request) {
        if (!(0, _utils.isDefined)(request.rawBody)) {
            throw new _messagingwebhookexception.MessagingWebhookException('Missing SNS payload', _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_MISSING_REQUEST_BODY);
        }
        await this.sesInboundWebhookRouterService.route(request.rawBody);
    }
    async handleSesOutboundWebhook(request) {
        if (!(0, _utils.isDefined)(request.rawBody)) {
            throw new _messagingwebhookexception.MessagingWebhookException('Missing SNS payload', _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_MISSING_REQUEST_BODY);
        }
        await this.sesOutboundWebhookRouterService.route(request.rawBody);
    }
    constructor(sesInboundWebhookRouterService, sesOutboundWebhookRouterService){
        this.sesInboundWebhookRouterService = sesInboundWebhookRouterService;
        this.sesOutboundWebhookRouterService = sesOutboundWebhookRouterService;
    }
};
_ts_decorate([
    (0, _common.Post)([
        'webhooks/messaging/ses/inbound'
    ]),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RawBodyRequest === "undefined" ? Object : RawBodyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingWebhooksController.prototype, "handleSesInboundWebhook", null);
_ts_decorate([
    (0, _common.Post)([
        'webhooks/messaging/ses/outbound'
    ]),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RawBodyRequest === "undefined" ? Object : RawBodyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingWebhooksController.prototype, "handleSesOutboundWebhook", null);
MessagingWebhooksController = _ts_decorate([
    (0, _common.Controller)(),
    (0, _common.UseFilters)(_messagingwebhookapiexceptionfilter.MessagingWebhookApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _sesinboundwebhookrouterservice.SesInboundWebhookRouterService === "undefined" ? Object : _sesinboundwebhookrouterservice.SesInboundWebhookRouterService,
        typeof _sesoutboundwebhookrouterservice.SesOutboundWebhookRouterService === "undefined" ? Object : _sesoutboundwebhookrouterservice.SesOutboundWebhookRouterService
    ])
], MessagingWebhooksController);

//# sourceMappingURL=messaging-webhooks.controller.js.map