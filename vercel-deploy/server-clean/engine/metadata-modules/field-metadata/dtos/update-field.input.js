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
    get UpdateFieldInput () {
        return UpdateFieldInput;
    },
    get UpdateOneFieldMetadataInput () {
        return UpdateOneFieldMetadataInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
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
let UpdateFieldInput = class UpdateFieldInput extends (0, _graphql.OmitType)((0, _graphql.PartialType)(_fieldmetadatadto.FieldMetadataDTO, _graphql.InputType), [
    'id',
    'type',
    'createdAt',
    'updatedAt',
    'isCustom',
    'standardOverrides',
    'applicationId',
    'morphId'
]) {
};
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], UpdateFieldInput.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], UpdateFieldInput.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>[
            _graphqltypejson.default
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], UpdateFieldInput.prototype, "morphRelationsUpdatePayload", void 0);
UpdateFieldInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateFieldInput);
let UpdateOneFieldMetadataInput = class UpdateOneFieldMetadataInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the record to update'
    }),
    _ts_metadata("design:type", String)
], UpdateOneFieldMetadataInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateFieldInput),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateFieldInput, {
        description: 'The record to update'
    }),
    _ts_metadata("design:type", typeof UpdateFieldInput === "undefined" ? Object : UpdateFieldInput)
], UpdateOneFieldMetadataInput.prototype, "update", void 0);
UpdateOneFieldMetadataInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateOneFieldMetadataInput);

//# sourceMappingURL=update-field.input.js.map