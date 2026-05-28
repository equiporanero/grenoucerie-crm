"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RelationDTO", {
    enumerable: true,
    get: function() {
        return RelationDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _typeorm = require("typeorm");
const _relationtypeinterface = require("../interfaces/relation-type.interface");
const _fieldmetadatadto = require("./field-metadata.dto");
const _objectmetadatadto = require("../../object-metadata/dtos/object-metadata.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_relationtypeinterface.RelationType, {
    name: 'RelationType',
    description: 'Relation type'
});
let RelationDTO = class RelationDTO {
};
_ts_decorate([
    (0, _classvalidator.IsEnum)(_relationtypeinterface.RelationType),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_relationtypeinterface.RelationType),
    _ts_metadata("design:type", typeof _relationtypeinterface.RelationType === "undefined" ? Object : _relationtypeinterface.RelationType)
], RelationDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_objectmetadatadto.ObjectMetadataDTO),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RelationDTO.prototype, "sourceObjectMetadata", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_objectmetadatadto.ObjectMetadataDTO),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RelationDTO.prototype, "targetObjectMetadata", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_fieldmetadatadto.FieldMetadataDTO),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RelationDTO.prototype, "sourceFieldMetadata", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_fieldmetadatadto.FieldMetadataDTO),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RelationDTO.prototype, "targetFieldMetadata", void 0);
RelationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('Relation')
], RelationDTO);

//# sourceMappingURL=relation.dto.js.map