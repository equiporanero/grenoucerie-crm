"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageParticipantManagerModule", {
    enumerable: true,
    get: function() {
        return MessageParticipantManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _auditmodule = require("../../../engine/core-modules/audit/audit.module");
const _featureflagentity = require("../../../engine/core-modules/feature-flag/feature-flag.entity");
const _featureflagservice = require("../../../engine/core-modules/feature-flag/services/feature-flag.service");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _objectmetadataentity = require("../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _roletargetentity = require("../../../engine/metadata-modules/role-target/role-target.entity");
const _roleentity = require("../../../engine/metadata-modules/role/role.entity");
const _workspacefeatureflagsmapcacheservice = require("../../../engine/metadata-modules/workspace-feature-flags-map-cache/workspace-feature-flags-map-cache.service");
const _objectmetadatarepositorymodule = require("../../../engine/object-metadata-repository/object-metadata-repository.module");
const _provideworkspacescopedrepository = require("../../../engine/twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _getdatafromcachewithrecomputeservice = require("../../../engine/workspace-cache-storage/services/get-data-from-cache-with-recompute.service");
const _workspacecachestorageservice = require("../../../engine/workspace-cache-storage/workspace-cache-storage.service");
const _workspacecachemodule = require("../../../engine/workspace-cache/workspace-cache.module");
const _workspacedatasourcemodule = require("../../../engine/workspace-datasource/workspace-datasource.module");
const _contactcreationmanagermodule = require("../../contact-creation-manager/contact-creation-manager.module");
const _matchparticipantmodule = require("../../match-participant/match-participant.module");
const _messagingcommonmodule = require("../common/messaging-common.module");
const _messageparticipantmatchparticipantjob = require("./jobs/message-participant-match-participant.job");
const _messageparticipantpersonlistener = require("./listeners/message-participant-person.listener");
const _messageparticipantworkspacememberlistener = require("./listeners/message-participant-workspace-member.listener");
const _messageparticipantlistener = require("./listeners/message-participant.listener");
const _messagingmessageparticipantservice = require("./services/messaging-message-participant.service");
const _timelineactivityworkspaceentity = require("../../timeline/standard-objects/timeline-activity.workspace-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessageParticipantManagerModule = class MessageParticipantManagerModule {
};
MessageParticipantManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _featureflagentity.FeatureFlagEntity,
                _workspaceentity.WorkspaceEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _roleentity.RoleEntity,
                _roletargetentity.RoleTargetEntity
            ]),
            _auditmodule.AuditModule,
            _contactcreationmanagermodule.ContactCreationManagerModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _objectmetadatarepositorymodule.ObjectMetadataRepositoryModule.forFeature([
                _timelineactivityworkspaceentity.TimelineActivityWorkspaceEntity
            ]),
            _messagingcommonmodule.MessagingCommonModule,
            _matchparticipantmodule.MatchParticipantModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _messagingmessageparticipantservice.MessagingMessageParticipantService,
            _messageparticipantmatchparticipantjob.MessageParticipantMatchParticipantJob,
            _messageparticipantlistener.MessageParticipantListener,
            _messageparticipantpersonlistener.MessageParticipantPersonListener,
            _messageparticipantworkspacememberlistener.MessageParticipantWorkspaceMemberListener,
            _featureflagservice.FeatureFlagService,
            _workspacefeatureflagsmapcacheservice.WorkspaceFeatureFlagsMapCacheService,
            _workspacecachestorageservice.WorkspaceCacheStorageService,
            _getdatafromcachewithrecomputeservice.GetDataFromCacheWithRecomputeService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_featureflagentity.FeatureFlagEntity)
        ],
        exports: [
            _messagingmessageparticipantservice.MessagingMessageParticipantService
        ]
    })
], MessageParticipantManagerModule);

//# sourceMappingURL=message-participant-manager.module.js.map