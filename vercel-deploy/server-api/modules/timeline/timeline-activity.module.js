"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineActivityModule", {
    enumerable: true,
    get: function() {
        return TimelineActivityModule;
    }
});
const _common = require("@nestjs/common");
const _featureflagmodule = require("../../engine/core-modules/feature-flag/feature-flag.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _objectmetadatarepositorymodule = require("../../engine/object-metadata-repository/object-metadata-repository.module");
const _twentyormmodule = require("../../engine/twenty-orm/twenty-orm.module");
const _timelineactivityservice = require("./services/timeline-activity.service");
const _timelineactivityworkspaceentity = require("./standard-objects/timeline-activity.workspace-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TimelineActivityModule = class TimelineActivityModule {
};
TimelineActivityModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _objectmetadatarepositorymodule.ObjectMetadataRepositoryModule.forFeature([
                _timelineactivityworkspaceentity.TimelineActivityWorkspaceEntity
            ]),
            _twentyormmodule.TwentyORMModule,
            _featureflagmodule.FeatureFlagModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _timelineactivityservice.TimelineActivityService
        ],
        exports: [
            _timelineactivityservice.TimelineActivityService
        ]
    })
], TimelineActivityModule);

//# sourceMappingURL=timeline-activity.module.js.map