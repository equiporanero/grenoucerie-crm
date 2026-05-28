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
    get CreateAnalyticsInput () {
        return CreateAnalyticsInput;
    },
    get CreateAnalyticsInputV2 () {
        return CreateAnalyticsInputV2;
    },
    get isPageviewAnalyticsInput () {
        return isPageviewAnalyticsInput;
    },
    get isTrackAnalyticsInput () {
        return isTrackAnalyticsInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _eventstype = require("../types/events.type");
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
var AnalyticsType = /*#__PURE__*/ function(AnalyticsType) {
    AnalyticsType["PAGEVIEW"] = "pageview";
    AnalyticsType["TRACK"] = "track";
    return AnalyticsType;
}(AnalyticsType || {});
(0, _graphql.registerEnumType)(AnalyticsType, {
    name: 'AnalyticsType'
});
let CreateAnalyticsInput = class CreateAnalyticsInput {
};
_ts_decorate([
    (0, _graphql.Field)({
        description: 'Type of the event'
    }),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateAnalyticsInput.prototype, "action", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Event payload in JSON format'
    }),
    (0, _classvalidator.IsObject)(),
    _ts_metadata("design:type", typeof JSON === "undefined" ? Object : JSON)
], CreateAnalyticsInput.prototype, "payload", void 0);
CreateAnalyticsInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], CreateAnalyticsInput);
let CreateAnalyticsInputV2 = class CreateAnalyticsInputV2 {
};
_ts_decorate([
    (0, _graphql.Field)(()=>AnalyticsType),
    (0, _classvalidator.IsEnum)(AnalyticsType),
    _ts_metadata("design:type", String)
], CreateAnalyticsInputV2.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateAnalyticsInputV2.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", typeof _eventstype.TrackEventName === "undefined" ? Object : _eventstype.TrackEventName)
], CreateAnalyticsInputV2.prototype, "event", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsObject)(),
    _ts_metadata("design:type", Object)
], CreateAnalyticsInputV2.prototype, "properties", void 0);
CreateAnalyticsInputV2 = _ts_decorate([
    (0, _graphql.ArgsType)()
], CreateAnalyticsInputV2);
function isPageviewAnalyticsInput(input) {
    return input.type === 'pageview' && !!input.name;
}
function isTrackAnalyticsInput(input) {
    return input.type === 'track' && !!input.event;
}

//# sourceMappingURL=create-analytics.input.js.map