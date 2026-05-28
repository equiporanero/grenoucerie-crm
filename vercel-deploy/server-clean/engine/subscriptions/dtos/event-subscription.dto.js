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
    get EventSubscriptionDTO () {
        return EventSubscriptionDTO;
    },
    get ObjectRecordEventWithQueryIdsDTO () {
        return ObjectRecordEventWithQueryIdsDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _metadataeventdto = require("./metadata-event.dto");
const _objectrecordeventdto = require("./object-record-event.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectRecordEventWithQueryIdsDTO = class ObjectRecordEventWithQueryIdsDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ]),
    _ts_metadata("design:type", Array)
], ObjectRecordEventWithQueryIdsDTO.prototype, "queryIds", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_objectrecordeventdto.ObjectRecordEventDTO),
    _ts_metadata("design:type", typeof _objectrecordeventdto.ObjectRecordEventDTO === "undefined" ? Object : _objectrecordeventdto.ObjectRecordEventDTO)
], ObjectRecordEventWithQueryIdsDTO.prototype, "objectRecordEvent", void 0);
ObjectRecordEventWithQueryIdsDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ObjectRecordEventWithQueryIds')
], ObjectRecordEventWithQueryIdsDTO);
let EventSubscriptionDTO = class EventSubscriptionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], EventSubscriptionDTO.prototype, "eventStreamId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            ObjectRecordEventWithQueryIdsDTO
        ]),
    _ts_metadata("design:type", Array)
], EventSubscriptionDTO.prototype, "objectRecordEventsWithQueryIds", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _metadataeventdto.MetadataEventDTO
        ]),
    _ts_metadata("design:type", Array)
], EventSubscriptionDTO.prototype, "metadataEvents", void 0);
EventSubscriptionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('EventSubscription')
], EventSubscriptionDTO);

//# sourceMappingURL=event-subscription.dto.js.map