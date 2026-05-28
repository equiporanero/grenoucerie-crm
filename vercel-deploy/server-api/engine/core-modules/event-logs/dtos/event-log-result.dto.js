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
    get EventLogPageInfo () {
        return EventLogPageInfo;
    },
    get EventLogQueryResult () {
        return EventLogQueryResult;
    },
    get EventLogRecord () {
        return EventLogRecord;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EventLogRecord = class EventLogRecord {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], EventLogRecord.prototype, "event", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], EventLogRecord.prototype, "timestamp", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], EventLogRecord.prototype, "userId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Record === "undefined" ? Object : Record)
], EventLogRecord.prototype, "properties", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], EventLogRecord.prototype, "recordId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], EventLogRecord.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], EventLogRecord.prototype, "isCustom", void 0);
EventLogRecord = _ts_decorate([
    (0, _graphql.ObjectType)()
], EventLogRecord);
let EventLogPageInfo = class EventLogPageInfo {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], EventLogPageInfo.prototype, "endCursor", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], EventLogPageInfo.prototype, "hasNextPage", void 0);
EventLogPageInfo = _ts_decorate([
    (0, _graphql.ObjectType)()
], EventLogPageInfo);
let EventLogQueryResult = class EventLogQueryResult {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            EventLogRecord
        ]),
    _ts_metadata("design:type", Array)
], EventLogQueryResult.prototype, "records", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], EventLogQueryResult.prototype, "totalCount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>EventLogPageInfo),
    _ts_metadata("design:type", typeof EventLogPageInfo === "undefined" ? Object : EventLogPageInfo)
], EventLogQueryResult.prototype, "pageInfo", void 0);
EventLogQueryResult = _ts_decorate([
    (0, _graphql.ObjectType)()
], EventLogQueryResult);

//# sourceMappingURL=event-log-result.dto.js.map