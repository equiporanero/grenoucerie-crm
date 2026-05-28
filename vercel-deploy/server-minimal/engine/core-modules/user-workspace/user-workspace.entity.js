"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserWorkspaceEntity", {
    enumerable: true,
    get: function() {
        return UserWorkspaceEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _constants = require("twenty-shared/constants");
const _translations = require("twenty-shared/translations");
const _typeorm = require("typeorm");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _twofactorauthenticationmethoddto = require("../two-factor-authentication/dto/two-factor-authentication-method.dto");
const _twofactorauthenticationmethodentity = require("../two-factor-authentication/entities/two-factor-authentication-method.entity");
const _userentity = require("../user/user.entity");
const _objectpermissiondto = require("../../metadata-modules/object-permission/dtos/object-permission.dto");
const _workspacerelatedentity = require("../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_constants.PermissionFlagType, {
    name: 'PermissionFlagType'
});
(0, _graphql.registerEnumType)(_constants.PermissionsOnAllObjectRecords, {
    name: 'PermissionsOnAllObjectRecords'
});
let UserWorkspaceEntity = class UserWorkspaceEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], UserWorkspaceEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_userentity.UserEntity),
    (0, _typeorm.ManyToOne)(()=>_userentity.UserEntity, (user)=>user.userWorkspaces, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'userId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], UserWorkspaceEntity.prototype, "user", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], UserWorkspaceEntity.prototype, "userId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UserWorkspaceEntity.prototype, "defaultAvatarUrl", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: false
    }),
    (0, _typeorm.Column)({
        nullable: false,
        default: _translations.SOURCE_LOCALE,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], UserWorkspaceEntity.prototype, "locale", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UserWorkspaceEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UserWorkspaceEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UserWorkspaceEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity, (twoFactorAuthenticationMethod)=>twoFactorAuthenticationMethod.userWorkspace, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], UserWorkspaceEntity.prototype, "twoFactorAuthenticationMethods", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _constants.PermissionFlagType
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], UserWorkspaceEntity.prototype, "permissionFlags", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _objectpermissiondto.ObjectPermissionDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], UserWorkspaceEntity.prototype, "objectPermissions", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _objectpermissiondto.ObjectPermissionDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], UserWorkspaceEntity.prototype, "objectsPermissions", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _twofactorauthenticationmethoddto.TwoFactorAuthenticationMethodSummaryDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], UserWorkspaceEntity.prototype, "twoFactorAuthenticationMethodSummary", void 0);
UserWorkspaceEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'userWorkspace',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('UserWorkspace'),
    (0, _typeorm.Index)('IDX_USER_WORKSPACE_USER_ID_WORKSPACE_ID_UNIQUE', [
        'userId',
        'workspaceId'
    ], {
        unique: true,
        where: '"deletedAt" IS NULL'
    }),
    (0, _typeorm.Index)('IDX_USER_WORKSPACE_USER_ID', [
        'userId'
    ]),
    (0, _typeorm.Index)('IDX_USER_WORKSPACE_WORKSPACE_ID', [
        'workspaceId'
    ])
], UserWorkspaceEntity);

//# sourceMappingURL=user-workspace.entity.js.map