"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpsertViewWidgetInput", {
    enumerable: true,
    get: function() {
        return UpsertViewWidgetInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _upsertviewwidgetviewfieldinput = require("./upsert-view-widget-view-field.input");
const _upsertviewwidgetviewfiltergroupinput = require("./upsert-view-widget-view-filter-group.input");
const _upsertviewwidgetviewfilterinput = require("./upsert-view-widget-view-filter.input");
const _upsertviewwidgetviewsortinput = require("./upsert-view-widget-view-sort.input");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpsertViewWidgetInput = class UpsertViewWidgetInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the view widget (page layout widget).'
    }),
    _ts_metadata("design:type", String)
], UpsertViewWidgetInput.prototype, "widgetId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>_upsertviewwidgetviewfieldinput.UpsertViewWidgetViewFieldInput),
    (0, _graphql.Field)(()=>[
            _upsertviewwidgetviewfieldinput.UpsertViewWidgetViewFieldInput
        ], {
        nullable: true,
        description: 'The view fields to upsert.'
    }),
    _ts_metadata("design:type", Array)
], UpsertViewWidgetInput.prototype, "viewFields", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>_upsertviewwidgetviewfilterinput.UpsertViewWidgetViewFilterInput),
    (0, _graphql.Field)(()=>[
            _upsertviewwidgetviewfilterinput.UpsertViewWidgetViewFilterInput
        ], {
        nullable: true,
        description: 'The view filters to upsert.'
    }),
    _ts_metadata("design:type", Array)
], UpsertViewWidgetInput.prototype, "viewFilters", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>_upsertviewwidgetviewfiltergroupinput.UpsertViewWidgetViewFilterGroupInput),
    (0, _graphql.Field)(()=>[
            _upsertviewwidgetviewfiltergroupinput.UpsertViewWidgetViewFilterGroupInput
        ], {
        nullable: true,
        description: 'The view filter groups to upsert.'
    }),
    _ts_metadata("design:type", Array)
], UpsertViewWidgetInput.prototype, "viewFilterGroups", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>_upsertviewwidgetviewsortinput.UpsertViewWidgetViewSortInput),
    (0, _graphql.Field)(()=>[
            _upsertviewwidgetviewsortinput.UpsertViewWidgetViewSortInput
        ], {
        nullable: true,
        description: 'The view sorts to upsert.'
    }),
    _ts_metadata("design:type", Array)
], UpsertViewWidgetInput.prototype, "viewSorts", void 0);
UpsertViewWidgetInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpsertViewWidgetInput);

//# sourceMappingURL=upsert-view-widget.input.js.map