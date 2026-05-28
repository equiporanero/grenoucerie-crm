"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WebhookToolWorkspaceService", {
    enumerable: true,
    get: function() {
        return WebhookToolWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _webhookservice = require("../../webhook.service");
const _createwebhooktool = require("../create-webhook.tool");
const _deletewebhooktool = require("../delete-webhook.tool");
const _listwebhookstool = require("../list-webhooks.tool");
const _updatewebhooktool = require("../update-webhook.tool");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WebhookToolWorkspaceService = class WebhookToolWorkspaceService {
    generateWebhookTools(workspaceId) {
        const context = {
            workspaceId
        };
        const listWebhooks = (0, _listwebhookstool.createListWebhooksTool)(this.deps, context);
        const createWebhook = (0, _createwebhooktool.createCreateWebhookTool)(this.deps, context);
        const updateWebhook = (0, _updatewebhooktool.createUpdateWebhookTool)(this.deps, context);
        const deleteWebhook = (0, _deletewebhooktool.createDeleteWebhookTool)(this.deps, context);
        return {
            [listWebhooks.name]: listWebhooks,
            [createWebhook.name]: createWebhook,
            [updateWebhook.name]: updateWebhook,
            [deleteWebhook.name]: deleteWebhook
        };
    }
    constructor(webhookService){
        this.deps = {
            webhookService
        };
    }
};
WebhookToolWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _webhookservice.WebhookService === "undefined" ? Object : _webhookservice.WebhookService
    ])
], WebhookToolWorkspaceService);

//# sourceMappingURL=webhook-tool.workspace-service.js.map