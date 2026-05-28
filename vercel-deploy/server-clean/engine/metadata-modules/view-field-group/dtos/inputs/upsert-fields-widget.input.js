"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpsertFieldsWidgetInput", {
    enumerable: true,
    get: function() {
        return UpsertFieldsWidgetInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _upsertfieldswidgetfieldinput = require("./upsert-fields-widget-field.input");
const _upsertfieldswidgetgroupinput = require("./upsert-fields-widget-group.input");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpsertFieldsWidgetInput = class UpsertFieldsWidgetInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the fields widget whose groups and fields to upsert'
    }),
    _ts_metadata("design:type", String)
], UpsertFieldsWidgetInput.prototype, "widgetId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>_upsertfieldswidgetgroupinput.UpsertFieldsWidgetGroupInput),
    (0, _graphql.Field)(()=>[
            _upsertfieldswidgetgroupinput.UpsertFieldsWidgetGroupInput
        ], {
        nullable: true,
        description: 'The groups (with nested fields) to upsert. Mutually exclusive with "fields".'
    }),
    _ts_metadata("design:type", Array)
], UpsertFieldsWidgetInput.prototype, "groups", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>_upsertfieldswidgetfieldinput.UpsertFieldsWidgetFieldInput),
    (0, _graphql.Field)(()=>[
            _upsertfieldswidgetfieldinput.UpsertFieldsWidgetFieldInput
        ], {
        nullable: true,
        description: 'The ungrouped fields to upsert. When provided, all existing groups are deleted and fields are detached from groups. Mutually exclusive with "groups".'
    }),
    _ts_metadata("design:type", Array)
], UpsertFieldsWidgetInput.prototype, "fields", void 0);
UpsertFieldsWidgetInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpsertFieldsWidgetInput);

//# sourceMappingURL=upsert-fields-widget.input.js.map