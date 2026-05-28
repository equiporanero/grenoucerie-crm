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
    get UpdatePermissionFlagInput () {
        return UpdatePermissionFlagInput;
    },
    get UpdatePermissionFlagInputUpdates () {
        return UpdatePermissionFlagInputUpdates;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _permissionflagpermissiontypeconstant = require("../constants/permission-flag-permission-type.constant");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdatePermissionFlagInputUpdates = class UpdatePermissionFlagInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdatePermissionFlagInputUpdates.prototype, "label", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdatePermissionFlagInputUpdates.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdatePermissionFlagInputUpdates.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsIn)(_permissionflagpermissiontypeconstant.PERMISSION_FLAG_PERMISSION_TYPES),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof PermissionFlagPermissionType === "undefined" ? Object : PermissionFlagPermissionType)
], UpdatePermissionFlagInputUpdates.prototype, "permissionType", void 0);
UpdatePermissionFlagInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdatePermissionFlagInputUpdates);
let UpdatePermissionFlagInput = class UpdatePermissionFlagInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the permission flag definition to update'
    }),
    _ts_metadata("design:type", String)
], UpdatePermissionFlagInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdatePermissionFlagInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdatePermissionFlagInputUpdates, {
        description: 'The fields to update'
    }),
    _ts_metadata("design:type", typeof UpdatePermissionFlagInputUpdates === "undefined" ? Object : UpdatePermissionFlagInputUpdates)
], UpdatePermissionFlagInput.prototype, "update", void 0);
UpdatePermissionFlagInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdatePermissionFlagInput);

//# sourceMappingURL=update-permission-flag.input.js.map