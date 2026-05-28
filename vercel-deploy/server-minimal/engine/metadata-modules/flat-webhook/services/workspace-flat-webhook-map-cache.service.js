"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatWebhookMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatWebhookMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromwebhookentitytoflatwebhookutil = require("../utils/from-webhook-entity-to-flat-webhook.util");
const _webhookentity = require("../../webhook/entities/webhook.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _createidtouniversalidentifiermaputil = require("../../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
const _addflatentitytoflatentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/utils/add-flat-entity-to-flat-entity-maps-through-mutation-or-throw.util");
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
let WorkspaceFlatWebhookMapCacheService = class WorkspaceFlatWebhookMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [webhooks, applications] = await Promise.all([
            this.webhookRepository.find({
                where: {
                    workspaceId,
                    deletedAt: (0, _typeorm1.IsNull)()
                }
            }),
            this.applicationRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ]
            })
        ]);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const flatWebhookMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const webhookEntity of webhooks){
            const flatWebhook = (0, _fromwebhookentitytoflatwebhookutil.fromWebhookEntityToFlatWebhook)({
                entity: webhookEntity,
                applicationIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatWebhook,
                flatEntityMapsToMutate: flatWebhookMaps
            });
        }
        return flatWebhookMaps;
    }
    constructor(webhookRepository, applicationRepository){
        super(), this.webhookRepository = webhookRepository, this.applicationRepository = applicationRepository;
    }
};
WorkspaceFlatWebhookMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatWebhookMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_webhookentity.WebhookEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatWebhookMapCacheService);

//# sourceMappingURL=workspace-flat-webhook-map-cache.service.js.map