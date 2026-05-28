"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectRecordEventDTO", {
    enumerable: true,
    get: function() {
        return ObjectRecordEventDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _databaseeventaction = require("../../api/graphql/graphql-query-runner/enums/database-event-action");
const _objectrecordeventpropertiesdto = require("./object-record-event-properties.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectRecordEventDTO = class ObjectRecordEventDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_databaseeventaction.DatabaseEventAction),
    _ts_metadata("design:type", typeof _databaseeventaction.DatabaseEventAction === "undefined" ? Object : _databaseeventaction.DatabaseEventAction)
], ObjectRecordEventDTO.prototype, "action", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ObjectRecordEventDTO.prototype, "objectNameSingular", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ObjectRecordEventDTO.prototype, "recordId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ObjectRecordEventDTO.prototype, "userId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ObjectRecordEventDTO.prototype, "workspaceMemberId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_objectrecordeventpropertiesdto.ObjectRecordEventPropertiesDTO),
    _ts_metadata("design:type", typeof _objectrecordeventpropertiesdto.ObjectRecordEventPropertiesDTO === "undefined" ? Object : _objectrecordeventpropertiesdto.ObjectRecordEventPropertiesDTO)
], ObjectRecordEventDTO.prototype, "properties", void 0);
ObjectRecordEventDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ObjectRecordEvent')
], ObjectRecordEventDTO);

//# sourceMappingURL=object-record-event.dto.js.map