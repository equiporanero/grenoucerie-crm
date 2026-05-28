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
    get CreateFieldInput () {
        return CreateFieldInput;
    },
    get CreateOneFieldMetadataInput () {
        return CreateOneFieldMetadataInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _fieldmetadatadto = require("./field-metadata.dto");
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
let CreateFieldInput = class CreateFieldInput extends (0, _graphql.OmitType)(_fieldmetadatadto.FieldMetadataDTO, [
    'id',
    'createdAt',
    'updatedAt',
    'standardOverrides',
    'applicationId',
    'morphId',
    'universalIdentifier'
], _graphql.InputType) {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], CreateFieldInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], CreateFieldInput.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], CreateFieldInput.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], CreateFieldInput.prototype, "isRemoteCreation", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.RelationCreationPayload === "undefined" ? Object : _types.RelationCreationPayload)
], CreateFieldInput.prototype, "relationCreationPayload", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>[
            _graphqltypejson.default
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], CreateFieldInput.prototype, "morphRelationsCreationPayload", void 0);
CreateFieldInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateFieldInput);
let CreateOneFieldMetadataInput = class CreateOneFieldMetadataInput {
};
_ts_decorate([
    (0, _classtransformer.Type)(()=>CreateFieldInput),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>CreateFieldInput, {
        description: 'The record to create'
    }),
    _ts_metadata("design:type", typeof CreateFieldInput === "undefined" ? Object : CreateFieldInput)
], CreateOneFieldMetadataInput.prototype, "field", void 0);
CreateOneFieldMetadataInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateOneFieldMetadataInput);

//# sourceMappingURL=create-field.input.js.map