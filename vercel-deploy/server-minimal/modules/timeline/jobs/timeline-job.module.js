"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineJobModule", {
    enumerable: true,
    get: function() {
        return TimelineJobModule;
    }
});
const _common = require("@nestjs/common");
const _auditmodule = require("../../../engine/core-modules/audit/audit.module");
const _twentyormmodule = require("../../../engine/twenty-orm/twenty-orm.module");
const _upserttimelineactivityfrominternaleventjob = require("./upsert-timeline-activity-from-internal-event.job");
const _timelineactivitymodule = require("../timeline-activity.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TimelineJobModule = class TimelineJobModule {
};
TimelineJobModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _timelineactivitymodule.TimelineActivityModule,
            _auditmodule.AuditModule,
            _twentyormmodule.TwentyORMModule
        ],
        providers: [
            _upserttimelineactivityfrominternaleventjob.UpsertTimelineActivityFromInternalEvent
        ]
    })
], TimelineJobModule);

//# sourceMappingURL=timeline-job.module.js.map