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
    get FieldPermissionInput () {
        return FieldPermissionInput;
    },
    get UpsertFieldPermissionsInput () {
        return UpsertFieldPermissionsInput;
    }
});
const _graphql = require("@nestjs/graphql");
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
let UpsertFieldPermissionsInput = class UpsertFieldPermissionsInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UpsertFieldPermissionsInput.prototype, "roleId", void 0);
_ts_decorate([
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.ArrayMinSize)(1),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>[
            FieldPermissionInput
        ]),
    _ts_metadata("design:type", Array)
], UpsertFieldPermissionsInput.prototype, "fieldPermissions", void 0);
UpsertFieldPermissionsInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpsertFieldPermissionsInput);
let FieldPermissionInput = class FieldPermissionInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], FieldPermissionInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], FieldPermissionInput.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], FieldPermissionInput.prototype, "canReadFieldValue", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], FieldPermissionInput.prototype, "canUpdateFieldValue", void 0);
FieldPermissionInput = _ts_decorate([
    (0, _graphql.InputType)()
], FieldPermissionInput);

//# sourceMappingURL=upsert-field-permissions.input.js.map