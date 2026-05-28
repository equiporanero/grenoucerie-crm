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
    get UpdateNavigationMenuItemInput () {
        return UpdateNavigationMenuItemInput;
    },
    get UpdateOneNavigationMenuItemInput () {
        return UpdateOneNavigationMenuItemInput;
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
let UpdateNavigationMenuItemInput = class UpdateNavigationMenuItemInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateNavigationMenuItemInput.prototype, "folderId", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], UpdateNavigationMenuItemInput.prototype, "position", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateNavigationMenuItemInput.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateNavigationMenuItemInput.prototype, "link", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateNavigationMenuItemInput.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateNavigationMenuItemInput.prototype, "color", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateNavigationMenuItemInput.prototype, "pageLayoutId", void 0);
UpdateNavigationMenuItemInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateNavigationMenuItemInput);
let UpdateOneNavigationMenuItemInput = class UpdateOneNavigationMenuItemInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the record to update'
    }),
    _ts_metadata("design:type", String)
], UpdateOneNavigationMenuItemInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateNavigationMenuItemInput),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateNavigationMenuItemInput, {
        description: 'The record to update'
    }),
    _ts_metadata("design:type", typeof UpdateNavigationMenuItemInput === "undefined" ? Object : UpdateNavigationMenuItemInput)
], UpdateOneNavigationMenuItemInput.prototype, "update", void 0);
UpdateOneNavigationMenuItemInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateOneNavigationMenuItemInput);

//# sourceMappingURL=update-navigation-menu-item.input.js.map