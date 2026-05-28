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
    get CreateObjectInput () {
        return CreateObjectInput;
    },
    get CreateOneObjectInput () {
        return CreateOneObjectInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _isvalidmetadatanamedecorator = require("../../../decorators/metadata/is-valid-metadata-name.decorator");
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
let CreateObjectInput = class CreateObjectInput {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    (0, _isvalidmetadatanamedecorator.IsValidMetadataName)(),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "nameSingular", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    (0, _isvalidmetadatanamedecorator.IsValidMetadataName)(),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "namePlural", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "labelSingular", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "labelPlural", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "shortcut", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "color", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], CreateObjectInput.prototype, "skipNameField", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], CreateObjectInput.prototype, "isRemote", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateObjectInput.prototype, "primaryKeyColumnType", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof FieldMetadataSettings === "undefined" ? Object : FieldMetadataSettings)
], CreateObjectInput.prototype, "primaryKeyFieldMetadataSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], CreateObjectInput.prototype, "isLabelSyncedWithName", void 0);
CreateObjectInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateObjectInput);
let CreateOneObjectInput = class CreateOneObjectInput {
};
_ts_decorate([
    (0, _classtransformer.Type)(()=>CreateObjectInput),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>CreateObjectInput, {
        description: 'The object to create'
    }),
    _ts_metadata("design:type", typeof CreateObjectInput === "undefined" ? Object : CreateObjectInput)
], CreateOneObjectInput.prototype, "object", void 0);
CreateOneObjectInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateOneObjectInput);

//# sourceMappingURL=create-object.input.js.map