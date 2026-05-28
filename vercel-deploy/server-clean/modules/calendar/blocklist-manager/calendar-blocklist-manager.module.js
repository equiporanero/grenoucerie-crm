"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarBlocklistManagerModule", {
    enumerable: true,
    get: function() {
        return CalendarBlocklistManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _blocklistitemdeletecalendareventsjob = require("./jobs/blocklist-item-delete-calendar-events.job");
const _blocklistreimportcalendareventsjob = require("./jobs/blocklist-reimport-calendar-events.job");
const _calendarblocklistlistener = require("./listeners/calendar-blocklist.listener");
const _calendareventcleanermodule = require("../calendar-event-cleaner/calendar-event-cleaner.module");
const _calendarcommonmodule = require("../common/calendar-common.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalendarBlocklistManagerModule = class CalendarBlocklistManagerModule {
};
CalendarBlocklistManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _calendareventcleanermodule.CalendarEventCleanerModule,
            _calendarcommonmodule.CalendarCommonModule,
            _typeorm.TypeOrmModule.forFeature([
                _calendarchannelentity.CalendarChannelEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ])
        ],
        providers: [
            _calendarblocklistlistener.CalendarBlocklistListener,
            _blocklistitemdeletecalendareventsjob.BlocklistItemDeleteCalendarEventsJob,
            _blocklistreimportcalendareventsjob.BlocklistReimportCalendarEventsJob
        ],
        exports: []
    })
], CalendarBlocklistManagerModule);

//# sourceMappingURL=calendar-blocklist-manager.module.js.map