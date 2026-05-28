"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpsertFieldsWidgetGroupInput", {
    enumerable: true,
    get: function() {
        return UpsertFieldsWidgetGroupInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _upsertfieldswidgetfieldinput = require("./upsert-fields-widget-field.input");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpsertFieldsWidgetGroupInput = class UpsertFieldsWidgetGroupInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UpsertFieldsWidgetGroupInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], UpsertFieldsWidgetGroupInput.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], UpsertFieldsWidgetGroupInput.prototype, "position", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], UpsertFieldsWidgetGroupInput.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>_upsertfieldswidgetfieldinput.UpsertFieldsWidgetFieldInput),
    (0, _graphql.Field)(()=>[
            _upsertfieldswidgetfieldinput.UpsertFieldsWidgetFieldInput
        ]),
    _ts_metadata("design:type", Array)
], UpsertFieldsWidgetGroupInput.prototype, "fields", void 0);
UpsertFieldsWidgetGroupInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpsertFieldsWidgetGroupInput);

//# sourceMappingURL=upsert-fields-widget-group.input.js.map