"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineCalendarEventModule", {
    enumerable: true,
    get: function() {
        return TimelineCalendarEventModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _timelinecalendareventresolver = require("./timeline-calendar-event.resolver");
const _timelinecalendareventservice = require("./timeline-calendar-event.service");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../metadata-modules/connected-account/entities/connected-account.entity");
const _usermodule = require("../user/user.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TimelineCalendarEventModule = class TimelineCalendarEventModule {
};
TimelineCalendarEventModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _usermodule.UserModule,
            _typeorm.TypeOrmModule.forFeature([
                _calendarchannelentity.CalendarChannelEntity,
                _connectedaccountentity.ConnectedAccountEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ])
        ],
        exports: [],
        providers: [
            _timelinecalendareventresolver.TimelineCalendarEventResolver,
            _timelinecalendareventservice.TimelineCalendarEventService
        ]
    })
], TimelineCalendarEventModule);

//# sourceMappingURL=timeline-calendar-event.module.js.map