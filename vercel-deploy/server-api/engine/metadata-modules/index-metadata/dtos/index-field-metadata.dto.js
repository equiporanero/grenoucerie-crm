"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IndexFieldMetadataDTO", {
    enumerable: true,
    get: function() {
        return IndexFieldMetadataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _fieldmetadatadto = require("../../field-metadata/dtos/field-metadata.dto");
const _indexmetadatadto = require("./index-metadata.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let IndexFieldMetadataDTO = class IndexFieldMetadataDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], IndexFieldMetadataDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _nestjsquerygraphql.FilterableField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], IndexFieldMetadataDTO.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], IndexFieldMetadataDTO.prototype, "order", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], IndexFieldMetadataDTO.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IndexFieldMetadataDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IndexFieldMetadataDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], IndexFieldMetadataDTO.prototype, "workspaceId", void 0);
IndexFieldMetadataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('IndexField'),
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
    (0, _nestjsquerygraphql.Relation)('indexMetadata', ()=>_indexmetadatadto.IndexMetadataDTO, {
        nullable: true
    }),
    (0, _nestjsquerygraphql.Relation)('fieldMetadata', ()=>_fieldmetadatadto.FieldMetadataDTO, {
        nullable: true
    })
], IndexFieldMetadataDTO);

//# sourceMappingURL=index-field-metadata.dto.js.map