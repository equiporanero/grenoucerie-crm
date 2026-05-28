"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventLogQueryInput", {
    enumerable: true,
    get: function() {
        return EventLogQueryInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _eventlogfiltersinput = require("./event-log-filters.input");
const _eventlogtableenum = require("./event-log-table.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _eventlogtableenum.registerEventLogTableEnum)();
let EventLogQueryInput = class EventLogQueryInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_types.EventLogTable),
    _ts_metadata("design:type", typeof _types.EventLogTable === "undefined" ? Object : _types.EventLogTable)
], EventLogQueryInput.prototype, "table", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_eventlogfiltersinput.EventLogFiltersInput, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _eventlogfiltersinput.EventLogFiltersInput === "undefined" ? Object : _eventlogfiltersinput.EventLogFiltersInput)
], EventLogQueryInput.prototype, "filters", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true,
        defaultValue: 100
    }),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.Max)(10000),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], EventLogQueryInput.prototype, "first", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], EventLogQueryInput.prototype, "after", void 0);
EventLogQueryInput = _ts_decorate([
    (0, _graphql.InputType)()
], EventLogQueryInput);

//# sourceMappingURL=event-log-query.input.js.map