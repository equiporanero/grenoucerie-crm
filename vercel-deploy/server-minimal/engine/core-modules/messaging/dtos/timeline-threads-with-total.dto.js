"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineThreadsWithTotalDTO", {
    enumerable: true,
    get: function() {
        return TimelineThreadsWithTotalDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _timelinethreaddto = require("./timeline-thread.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TimelineThreadsWithTotalDTO = class TimelineThreadsWithTotalDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], TimelineThreadsWithTotalDTO.prototype, "totalNumberOfThreads", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _timelinethreaddto.TimelineThreadDTO
        ]),
    _ts_metadata("design:type", Array)
], TimelineThreadsWithTotalDTO.prototype, "timelineThreads", void 0);
TimelineThreadsWithTotalDTO = _ts_decorate([
    (0, _graphql.ObjectType)('TimelineThreadsWithTotal')
], TimelineThreadsWithTotalDTO);

//# sourceMappingURL=timeline-threads-with-total.dto.js.map