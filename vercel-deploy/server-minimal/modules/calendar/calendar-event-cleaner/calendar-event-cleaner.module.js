"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventCleanerModule", {
    enumerable: true,
    get: function() {
        return CalendarEventCleanerModule;
    }
});
const _common = require("@nestjs/common");
const _featureflagmodule = require("../../../engine/core-modules/feature-flag/feature-flag.module");
const _calendarchanneldeletioncleanupjob = require("./jobs/calendar-channel-deletion-cleanup.job");
const _deleteconnectedaccountassociatedcalendardatajob = require("./jobs/delete-connected-account-associated-calendar-data.job");
const _calendareventcleanercalendarchannellistener = require("./listeners/calendar-event-cleaner-calendar-channel.listener");
const _calendareventcleanerconnectedaccountlistener = require("./listeners/calendar-event-cleaner-connected-account.listener");
const _calendareventcleanerservice = require("./services/calendar-event-cleaner.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalendarEventCleanerModule = class CalendarEventCleanerModule {
};
CalendarEventCleanerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _featureflagmodule.FeatureFlagModule
        ],
        providers: [
            _calendareventcleanerservice.CalendarEventCleanerService,
            _calendarchanneldeletioncleanupjob.CalendarChannelDeletionCleanupJob,
            _deleteconnectedaccountassociatedcalendardatajob.DeleteConnectedAccountAssociatedCalendarDataJob,
            _calendareventcleanercalendarchannellistener.CalendarEventCleanerCalendarChannelListener,
            _calendareventcleanerconnectedaccountlistener.CalendarEventCleanerConnectedAccountListener
        ],
        exports: [
            _calendareventcleanerservice.CalendarEventCleanerService
        ]
    })
], CalendarEventCleanerModule);

//# sourceMappingURL=calendar-event-cleaner.module.js.map