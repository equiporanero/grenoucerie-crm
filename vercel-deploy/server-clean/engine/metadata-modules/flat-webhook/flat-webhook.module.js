"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatWebhookModule", {
    enumerable: true,
    get: function() {
        return FlatWebhookModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspaceflatwebhookmapcacheservice = require("./services/workspace-flat-webhook-map-cache.service");
const _webhookentity = require("../webhook/entities/webhook.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatWebhookModule = class FlatWebhookModule {
};
FlatWebhookModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity,
                _webhookentity.WebhookEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workspaceflatwebhookmapcacheservice.WorkspaceFlatWebhookMapCacheService
        ],
        exports: [
            _workspaceflatwebhookmapcacheservice.WorkspaceFlatWebhookMapCacheService
        ]
    })
], FlatWebhookModule);

//# sourceMappingURL=flat-webhook.module.js.map