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
    get UpdateCalendarChannelInput () {
        return UpdateCalendarChannelInput;
    },
    get UpdateCalendarChannelInputUpdates () {
        return UpdateCalendarChannelInputUpdates;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateCalendarChannelInputUpdates = class UpdateCalendarChannelInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.CalendarChannelVisibility),
    (0, _graphql.Field)(()=>_types.CalendarChannelVisibility, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.CalendarChannelVisibility === "undefined" ? Object : _types.CalendarChannelVisibility)
], UpdateCalendarChannelInputUpdates.prototype, "visibility", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateCalendarChannelInputUpdates.prototype, "isContactAutoCreationEnabled", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.CalendarChannelContactAutoCreationPolicy),
    (0, _graphql.Field)(()=>_types.CalendarChannelContactAutoCreationPolicy, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.CalendarChannelContactAutoCreationPolicy === "undefined" ? Object : _types.CalendarChannelContactAutoCreationPolicy)
], UpdateCalendarChannelInputUpdates.prototype, "contactAutoCreationPolicy", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateCalendarChannelInputUpdates.prototype, "isSyncEnabled", void 0);
UpdateCalendarChannelInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateCalendarChannelInputUpdates);
let UpdateCalendarChannelInput = class UpdateCalendarChannelInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UpdateCalendarChannelInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateCalendarChannelInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateCalendarChannelInputUpdates),
    _ts_metadata("design:type", typeof UpdateCalendarChannelInputUpdates === "undefined" ? Object : UpdateCalendarChannelInputUpdates)
], UpdateCalendarChannelInput.prototype, "update", void 0);
UpdateCalendarChannelInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateCalendarChannelInput);

//# sourceMappingURL=update-calendar-channel.input.js.map