"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldMetadataDTO", {
    enumerable: true,
    get: function() {
        return FieldMetadataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _isvalidmetadatanamedecorator = require("../../../decorators/metadata/is-valid-metadata-name.decorator");
const _fieldstandardoverridesdto = require("./field-standard-overrides.dto");
const _objectmetadatadto = require("../../object-metadata/dtos/object-metadata.dto");
const _transformenumvalue = require("../../../utils/transform-enum-value");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_types.FieldMetadataType, {
    name: 'FieldMetadataType',
    description: 'Type of the field'
});
let FieldMetadataDTO = class FieldMetadataDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.FieldMetadataType),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.FieldMetadataType),
    _ts_metadata("design:type", typeof T === "undefined" ? Object : T)
], FieldMetadataDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    (0, _isvalidmetadatanamedecorator.IsValidMetadataName)(),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "label", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_fieldstandardoverridesdto.FieldStandardOverridesDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _fieldstandardoverridesdto.FieldStandardOverridesDTO === "undefined" ? Object : _fieldstandardoverridesdto.FieldStandardOverridesDTO)
], FieldMetadataDTO.prototype, "standardOverrides", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _nestjsquerygraphql.FilterableField)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], FieldMetadataDTO.prototype, "isCustom", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _nestjsquerygraphql.FilterableField)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], FieldMetadataDTO.prototype, "isActive", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _nestjsquerygraphql.FilterableField)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], FieldMetadataDTO.prototype, "isSystem", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _nestjsquerygraphql.FilterableField)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], FieldMetadataDTO.prototype, "isUIReadOnly", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], FieldMetadataDTO.prototype, "isNullable", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], FieldMetadataDTO.prototype, "isUnique", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof FieldMetadataDefaultValue === "undefined" ? Object : FieldMetadataDefaultValue)
], FieldMetadataDTO.prototype, "defaultValue", void 0);
_ts_decorate([
    (0, _classtransformer.Transform)(({ value })=>(0, _transformenumvalue.transformEnumValue)(value)),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof FieldMetadataOptions === "undefined" ? Object : FieldMetadataOptions)
], FieldMetadataDTO.prototype, "options", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof FieldMetadataSettings === "undefined" ? Object : FieldMetadataSettings)
], FieldMetadataDTO.prototype, "settings", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _nestjsquerygraphql.FilterableField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], FieldMetadataDTO.prototype, "isLabelSyncedWithName", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "morphId", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(undefined, {
        message: ({ value })=>`Field metadata created at is invalid got ${JSON.stringify(value)} isDate: ${value instanceof Date}`
    }),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FieldMetadataDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FieldMetadataDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], FieldMetadataDTO.prototype, "applicationId", void 0);
FieldMetadataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('Field'),
    (0, _nestjsquerygraphql.Authorize)({
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        authorize: (context)=>({
                workspaceId: {
                    eq: context?.req?.workspace?.id
                }
            })
    }),
    (0, _nestjsquerygraphql.QueryOptions)({
        defaultResultSize: 10,
        disableSort: true,
        maxResultsSize: 1000
    }),
    (0, _nestjsquerygraphql.Relation)('object', ()=>_objectmetadatadto.ObjectMetadataDTO, {
        nullable: true
    })
], FieldMetadataDTO);

//# sourceMappingURL=field-metadata.dto.js.map