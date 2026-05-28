"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationEntity", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _typeorm = require("typeorm");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _applicationregistrationvariableentity = require("../application-registration-variable/application-registration-variable.entity");
const _applicationregistrationsourcetypeenum = require("./enums/application-registration-source-type.enum");
const _fileentity = require("../../file/entities/file.entity");
const _userentity = require("../../user/user.entity");
const _workspaceentity = require("../../workspace/workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ApplicationRegistrationEntity = class ApplicationRegistrationEntity {
    get logoUrl() {
        return this.manifest?.application?.logoUrl ?? null;
    }
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ApplicationRegistrationEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ApplicationRegistrationEntity.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], ApplicationRegistrationEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], ApplicationRegistrationEntity.prototype, "oAuthClientId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "oAuthClientSecretHash", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ]),
    (0, _typeorm.Column)({
        type: 'text',
        array: true,
        default: '{}'
    }),
    _ts_metadata("design:type", Array)
], ApplicationRegistrationEntity.prototype, "oAuthRedirectUris", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ]),
    (0, _typeorm.Column)({
        type: 'text',
        array: true,
        default: '{}'
    }),
    _ts_metadata("design:type", Array)
], ApplicationRegistrationEntity.prototype, "oAuthScopes", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "createdByUserId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.UserEntity, {
        onDelete: 'SET NULL',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'createdByUserId'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "createdByUser", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        name: 'workspaceId',
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "ownerWorkspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_workspaceentity.WorkspaceEntity, {
        onDelete: 'SET NULL',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType),
    (0, _typeorm.Column)({
        type: 'text',
        default: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.LOCAL
    }),
    _ts_metadata("design:type", typeof _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType === "undefined" ? Object : _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType)
], ApplicationRegistrationEntity.prototype, "sourceType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "sourcePackage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "tarballFileId", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)(()=>_fileentity.FileEntity, {
        onDelete: 'SET NULL',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'tarballFileId'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "tarballFile", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "latestAvailableVersion", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    (0, _typeorm.Column)({
        type: 'boolean',
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], ApplicationRegistrationEntity.prototype, "isListed", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    (0, _typeorm.Column)({
        name: 'isFeatured',
        type: 'boolean',
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], ApplicationRegistrationEntity.prototype, "isFeatured", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    (0, _typeorm.Column)({
        type: 'boolean',
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], ApplicationRegistrationEntity.prototype, "isPreInstalled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "manifest", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object),
    _ts_metadata("design:paramtypes", [])
], ApplicationRegistrationEntity.prototype, "logoUrl", null);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_applicationregistrationvariableentity.ApplicationRegistrationVariableEntity, (variable)=>variable.applicationRegistration, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ApplicationRegistrationEntity.prototype, "variables", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApplicationRegistrationEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApplicationRegistrationEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationEntity.prototype, "deletedAt", void 0);
ApplicationRegistrationEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'applicationRegistration',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('ApplicationRegistration'),
    (0, _typeorm.Index)('IDX_APPLICATION_REGISTRATION_UNIVERSAL_IDENTIFIER_UNIQUE', [
        'universalIdentifier'
    ], {
        unique: true,
        where: '"deletedAt" IS NULL'
    }),
    (0, _typeorm.Index)('IDX_APPLICATION_REGISTRATION_OAUTH_CLIENT_ID_UNIQUE', [
        'oAuthClientId'
    ], {
        unique: true,
        where: '"deletedAt" IS NULL'
    }),
    (0, _typeorm.Index)('IDX_APPLICATION_REGISTRATION_CREATED_BY_USER_ID', [
        'createdByUserId'
    ]),
    (0, _typeorm.Index)('IDX_APPLICATION_REGISTRATION_WORKSPACE_ID', [
        'ownerWorkspaceId'
    ]),
    (0, _typeorm.Check)('CHK_NPM_HAS_SOURCE_PACKAGE', `"sourceType" <> 'npm' OR "sourcePackage" IS NOT NULL`)
], ApplicationRegistrationEntity);

//# sourceMappingURL=application-registration.entity.js.map