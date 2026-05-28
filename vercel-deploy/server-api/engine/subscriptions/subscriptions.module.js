"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubscriptionsModule", {
    enumerable: true,
    get: function() {
        return SubscriptionsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _processnestedrelationsv2helper = require("../api/common/common-nested-relations-processor/process-nested-relations-v2.helper");
const _processnestedrelationshelper = require("../api/common/common-nested-relations-processor/process-nested-relations.helper");
const _commonselectfieldshelper = require("../api/common/common-select-fields/common-select-fields-helper");
const _cachelockmodule = require("../core-modules/cache-lock/cache-lock.module");
const _cachestoragemodule = require("../core-modules/cache-storage/cache-storage.module");
const _i18nmodule = require("../core-modules/i18n/i18n.module");
const _metricsmodule = require("../core-modules/metrics/metrics.module");
const _redisclientmodule = require("../core-modules/redis-client/redis-client.module");
const _workspaceentity = require("../core-modules/workspace/workspace.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _navigationmenuitemmodule = require("../metadata-modules/navigation-menu-item/navigation-menu-item.module");
const _eventstreamresolver = require("./event-stream.resolver");
const _eventstreamservice = require("./event-stream.service");
const _metadataeventemitter = require("./metadata-event/metadata-event-emitter");
const _metadataeventpublisher = require("./metadata-event/metadata-event-publisher");
const _metadataeventstodblistener = require("./metadata-event/metadata-events-to-db.listener");
const _objectrecordeventpublisher = require("./object-record-event/object-record-event-publisher");
const _subscriptionservice = require("./subscription.service");
const _workspaceeventbroadcasterservice = require("./workspace-event-broadcaster/workspace-event-broadcaster.service");
const _workspacecachemodule = require("../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let SubscriptionsModule = class SubscriptionsModule {
};
SubscriptionsModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _redisclientmodule.RedisClientModule,
            _cachestoragemodule.CacheStorageModule,
            _cachelockmodule.CacheLockModule,
            _metricsmodule.MetricsModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _workspacecachemodule.WorkspaceCacheModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _navigationmenuitemmodule.NavigationMenuItemModule,
            _i18nmodule.I18nModule
        ],
        providers: [
            _subscriptionservice.SubscriptionService,
            _eventstreamservice.EventStreamService,
            _eventstreamresolver.EventStreamResolver,
            _objectrecordeventpublisher.ObjectRecordEventPublisher,
            _metadataeventpublisher.MetadataEventPublisher,
            _metadataeventemitter.MetadataEventEmitter,
            _metadataeventstodblistener.MetadataEventsToDbListener,
            _workspaceeventbroadcasterservice.WorkspaceEventBroadcaster,
            _processnestedrelationshelper.ProcessNestedRelationsHelper,
            _processnestedrelationsv2helper.ProcessNestedRelationsV2Helper,
            _commonselectfieldshelper.CommonSelectFieldsHelper
        ],
        exports: [
            _subscriptionservice.SubscriptionService,
            _objectrecordeventpublisher.ObjectRecordEventPublisher,
            _metadataeventemitter.MetadataEventEmitter,
            _workspaceeventbroadcasterservice.WorkspaceEventBroadcaster
        ]
    })
], SubscriptionsModule);

//# sourceMappingURL=subscriptions.module.js.map