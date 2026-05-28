"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventParticipantManagerModule", {
    enumerable: true,
    get: function() {
        return CalendarEventParticipantManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _featureflagentity = require("../../../engine/core-modules/feature-flag/feature-flag.entity");
const _featureflagservice = require("../../../engine/core-modules/feature-flag/services/feature-flag.service");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _workspacemodule = require("../../../engine/core-modules/workspace/workspace.module");
const _fieldmetadataentity = require("../../../engine/metadata-modules/field-metadata/field-metadata.entity");
const _objectmetadataentity = require("../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _workspacefeatureflagsmapcacheservice = require("../../../engine/metadata-modules/workspace-feature-flags-map-cache/workspace-feature-flags-map-cache.service");
const _provideworkspacescopedrepository = require("../../../engine/twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _getdatafromcachewithrecomputeservice = require("../../../engine/workspace-cache-storage/services/get-data-from-cache-with-recompute.service");
const _workspacecachestorageservice = require("../../../engine/workspace-cache-storage/workspace-cache-storage.service");
const _workspacecachemodule = require("../../../engine/workspace-cache/workspace-cache.module");
const _workspacedatasourcemodule = require("../../../engine/workspace-datasource/workspace-datasource.module");
const _calendareventparticipantmatchparticipantjob = require("./jobs/calendar-event-participant-match-participant.job");
const _calendareventparticipantpersonlistener = require("./listeners/calendar-event-participant-person.listener");
const _calendareventparticipantworkspacememberlistener = require("./listeners/calendar-event-participant-workspace-member.listener");
const _calendareventparticipantlistener = require("./listeners/calendar-event-participant.listener");
const _calendareventparticipantservice = require("./services/calendar-event-participant.service");
const _contactcreationmanagermodule = require("../../contact-creation-manager/contact-creation-manager.module");
const _matchparticipantmodule = require("../../match-participant/match-participant.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalendarEventParticipantManagerModule = class CalendarEventParticipantManagerModule {
};
CalendarEventParticipantManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _workspacemodule.WorkspaceModule,
            _typeorm.TypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity,
                _fieldmetadataentity.FieldMetadataEntity,
                _featureflagentity.FeatureFlagEntity
            ]),
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _contactcreationmanagermodule.ContactCreationManagerModule,
            _matchparticipantmodule.MatchParticipantModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _calendareventparticipantservice.CalendarEventParticipantService,
            _calendareventparticipantmatchparticipantjob.CalendarEventParticipantMatchParticipantJob,
            _calendareventparticipantlistener.CalendarEventParticipantListener,
            _calendareventparticipantpersonlistener.CalendarEventParticipantPersonListener,
            _calendareventparticipantworkspacememberlistener.CalendarEventParticipantWorkspaceMemberListener,
            _featureflagservice.FeatureFlagService,
            _workspacefeatureflagsmapcacheservice.WorkspaceFeatureFlagsMapCacheService,
            _workspacecachestorageservice.WorkspaceCacheStorageService,
            _getdatafromcachewithrecomputeservice.GetDataFromCacheWithRecomputeService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_featureflagentity.FeatureFlagEntity)
        ],
        exports: [
            _calendareventparticipantservice.CalendarEventParticipantService
        ]
    })
], CalendarEventParticipantManagerModule);

//# sourceMappingURL=calendar-event-participant-manager.module.js.map