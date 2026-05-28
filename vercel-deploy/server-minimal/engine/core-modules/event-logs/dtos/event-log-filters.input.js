"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get EventLogDateRangeInput () {
        return EventLogDateRangeInput;
    },
    get EventLogFiltersInput () {
        return EventLogFiltersInput;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EventLogDateRangeInput = class EventLogDateRangeInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], EventLogDateRangeInput.prototype, "start", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], EventLogDateRangeInput.prototype, "end", void 0);
EventLogDateRangeInput = _ts_decorate([
    (0, _graphql.InputType)()
], EventLogDateRangeInput);
let EventLogFiltersInput = class EventLogFiltersInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], EventLogFiltersInput.prototype, "eventType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], EventLogFiltersInput.prototype, "userWorkspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>EventLogDateRangeInput, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof EventLogDateRangeInput === "undefined" ? Object : EventLogDateRangeInput)
], EventLogFiltersInput.prototype, "dateRange", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], EventLogFiltersInput.prototype, "recordId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], EventLogFiltersInput.prototype, "objectMetadataId", void 0);
EventLogFiltersInput = _ts_decorate([
    (0, _graphql.InputType)()
], EventLogFiltersInput);

//# sourceMappingURL=event-log-filters.input.js.map