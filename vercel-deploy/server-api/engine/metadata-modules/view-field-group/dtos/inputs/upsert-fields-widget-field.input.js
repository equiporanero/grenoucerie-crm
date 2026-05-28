"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpsertFieldsWidgetFieldInput", {
    enumerable: true,
    get: function() {
        return UpsertFieldsWidgetFieldInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _atleastoneofvalidator = require("../validators/at-least-one-of.validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpsertFieldsWidgetFieldInput = class UpsertFieldsWidgetFieldInput {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true,
        description: 'The id of the view field. Required if fieldMetadataId is not provided.'
    }),
    _ts_metadata("design:type", String)
], UpsertFieldsWidgetFieldInput.prototype, "viewFieldId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true,
        description: 'The id of the field metadata. Used to create a new view field when viewFieldId is not provided.'
    }),
    _ts_metadata("design:type", String)
], UpsertFieldsWidgetFieldInput.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], UpsertFieldsWidgetFieldInput.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], UpsertFieldsWidgetFieldInput.prototype, "position", void 0);
UpsertFieldsWidgetFieldInput = _ts_decorate([
    (0, _graphql.InputType)(),
    (0, _atleastoneofvalidator.AtLeastOneOf)([
        'viewFieldId',
        'fieldMetadataId'
    ])
], UpsertFieldsWidgetFieldInput);

//# sourceMappingURL=upsert-fields-widget-field.input.js.map