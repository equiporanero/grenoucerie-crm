"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IndexMetadataDTO", {
    enumerable: true,
    get: function() {
        return IndexMetadataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _isvalidmetadatanamedecorator = require("../../../decorators/metadata/is-valid-metadata-name.decorator");
const _indexfieldmetadatadto = require("./index-field-metadata.dto");
const _indexTypetypes = require("../types/indexType.types");
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
(0, _graphql.registerEnumType)(_indexTypetypes.IndexType, {
    name: 'IndexType',
    description: 'Type of the index'
});
let IndexMetadataDTO = class IndexMetadataDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], IndexMetadataDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    (0, _isvalidmetadatanamedecorator.IsValidMetadataName)(),
    _ts_metadata("design:type", String)
], IndexMetadataDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _nestjsquerygraphql.FilterableField)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], IndexMetadataDTO.prototype, "isCustom", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], IndexMetadataDTO.prototype, "isUnique", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], IndexMetadataDTO.prototype, "indexWhereClause", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_indexTypetypes.IndexType),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_indexTypetypes.IndexType),
    _ts_metadata("design:type", typeof _indexTypetypes.IndexType === "undefined" ? Object : _indexTypetypes.IndexType)
], IndexMetadataDTO.prototype, "indexType", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IndexMetadataDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IndexMetadataDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], IndexMetadataDTO.prototype, "workspaceId", void 0);
IndexMetadataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('Index'),
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
    (0, _nestjsquerygraphql.CursorConnection)('objectMetadata', ()=>_objectmetadatadto.ObjectMetadataDTO),
    (0, _nestjsquerygraphql.CursorConnection)('indexFieldMetadatas', ()=>_indexfieldmetadatadto.IndexFieldMetadataDTO)
], IndexMetadataDTO);

//# sourceMappingURL=index-metadata.dto.js.map