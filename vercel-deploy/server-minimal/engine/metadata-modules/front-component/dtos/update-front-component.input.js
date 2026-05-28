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
    get UpdateFrontComponentInput () {
        return UpdateFrontComponentInput;
    },
    get UpdateFrontComponentInputUpdates () {
        return UpdateFrontComponentInputUpdates;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
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
let UpdateFrontComponentInputUpdates = class UpdateFrontComponentInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateFrontComponentInputUpdates.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateFrontComponentInputUpdates.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], UpdateFrontComponentInputUpdates.prototype, "builtComponentChecksum", void 0);
UpdateFrontComponentInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateFrontComponentInputUpdates);
let UpdateFrontComponentInput = class UpdateFrontComponentInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the front component to update'
    }),
    _ts_metadata("design:type", String)
], UpdateFrontComponentInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateFrontComponentInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateFrontComponentInputUpdates, {
        description: 'The front component fields to update'
    }),
    _ts_metadata("design:type", typeof UpdateFrontComponentInputUpdates === "undefined" ? Object : UpdateFrontComponentInputUpdates)
], UpdateFrontComponentInput.prototype, "update", void 0);
UpdateFrontComponentInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateFrontComponentInput);

//# sourceMappingURL=update-front-component.input.js.map