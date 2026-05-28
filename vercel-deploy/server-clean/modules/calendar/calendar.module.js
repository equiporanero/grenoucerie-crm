"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarModule", {
    enumerable: true,
    get: function() {
        return CalendarModule;
    }
});
const _common = require("@nestjs/common");
const _calendarblocklistmanagermodule = require("./blocklist-manager/calendar-blocklist-manager.module");
const _calendareventcleanermodule = require("./calendar-event-cleaner/calendar-event-cleaner.module");
const _calendareventimportmanagermodule = require("./calendar-event-import-manager/calendar-event-import-manager.module");
const _calendareventparticipantmanagermodule = require("./calendar-event-participant-manager/calendar-event-participant-manager.module");
const _calendarcommonmodule = require("./common/calendar-common.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalendarModule = class CalendarModule {
};
CalendarModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _calendarblocklistmanagermodule.CalendarBlocklistManagerModule,
            _calendareventcleanermodule.CalendarEventCleanerModule,
            _calendareventimportmanagermodule.CalendarEventImportManagerModule,
            _calendareventparticipantmanagermodule.CalendarEventParticipantManagerModule,
            _calendarcommonmodule.CalendarCommonModule
        ],
        providers: [],
        exports: []
    })
], CalendarModule);

//# sourceMappingURL=calendar.module.js.map