"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataEventDTO", {
    enumerable: true,
    get: function() {
        return MetadataEventDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _objectrecordeventpropertiesdto = require("./object-record-event-properties.dto");
const _metadataeventactionenum = require("../enums/metadata-event-action.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MetadataEventDTO = class MetadataEventDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_metadataeventactionenum.MetadataEventAction),
    _ts_metadata("design:type", typeof _metadataeventactionenum.MetadataEventAction === "undefined" ? Object : _metadataeventactionenum.MetadataEventAction)
], MetadataEventDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], MetadataEventDTO.prototype, "metadataName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], MetadataEventDTO.prototype, "recordId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_objectrecordeventpropertiesdto.ObjectRecordEventPropertiesDTO),
    _ts_metadata("design:type", typeof _objectrecordeventpropertiesdto.ObjectRecordEventPropertiesDTO === "undefined" ? Object : _objectrecordeventpropertiesdto.ObjectRecordEventPropertiesDTO)
], MetadataEventDTO.prototype, "properties", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], MetadataEventDTO.prototype, "updatedCollectionHash", void 0);
MetadataEventDTO = _ts_decorate([
    (0, _graphql.ObjectType)('MetadataEvent')
], MetadataEventDTO);

//# sourceMappingURL=metadata-event.dto.js.map