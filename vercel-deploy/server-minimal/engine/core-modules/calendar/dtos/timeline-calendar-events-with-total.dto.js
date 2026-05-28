"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineCalendarEventsWithTotalDTO", {
    enumerable: true,
    get: function() {
        return TimelineCalendarEventsWithTotalDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _timelinecalendareventdto = require("./timeline-calendar-event.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TimelineCalendarEventsWithTotalDTO = class TimelineCalendarEventsWithTotalDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], TimelineCalendarEventsWithTotalDTO.prototype, "totalNumberOfCalendarEvents", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _timelinecalendareventdto.TimelineCalendarEventDTO
        ]),
    _ts_metadata("design:type", Array)
], TimelineCalendarEventsWithTotalDTO.prototype, "timelineCalendarEvents", void 0);
TimelineCalendarEventsWithTotalDTO = _ts_decorate([
    (0, _graphql.ObjectType)('TimelineCalendarEventsWithTotal')
], TimelineCalendarEventsWithTotalDTO);

//# sourceMappingURL=timeline-calendar-events-with-total.dto.js.map