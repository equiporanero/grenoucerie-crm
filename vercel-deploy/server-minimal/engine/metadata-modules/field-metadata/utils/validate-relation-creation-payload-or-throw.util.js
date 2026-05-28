"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRelationCreationPayloadOrThrow", {
    enumerable: true,
    get: function() {
        return validateRelationCreationPayloadOrThrow;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _fieldmetadataexception = require("../field-metadata.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RelationCreationPayloadValidation = class RelationCreationPayloadValidation {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], RelationCreationPayloadValidation.prototype, "targetObjectMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], RelationCreationPayloadValidation.prototype, "targetFieldLabel", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], RelationCreationPayloadValidation.prototype, "targetFieldIcon", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.RelationType),
    _ts_metadata("design:type", typeof _types.RelationType === "undefined" ? Object : _types.RelationType)
], RelationCreationPayloadValidation.prototype, "type", void 0);
const validateRelationCreationPayloadOrThrow = async (relationCreationPayload)=>{
    try {
        const relationCreationPayloadInstance = (0, _classtransformer.plainToInstance)(RelationCreationPayloadValidation, relationCreationPayload);
        await (0, _classvalidator.validateOrReject)(relationCreationPayloadInstance);
    } catch (error) {
        const errorMessages = Array.isArray(error) ? error.map((err)=>Object.values(err.constraints ?? {})).flat().join(', ') : error.message;
        throw new _fieldmetadataexception.FieldMetadataException(`Relation creation payload is invalid: ${errorMessages}`, _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
    }
};

//# sourceMappingURL=validate-relation-creation-payload-or-throw.util.js.map