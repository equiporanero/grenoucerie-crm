"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserEntity", {
    enumerable: true,
    get: function() {
        return UserEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _translations = require("twenty-shared/translations");
const _typeorm = require("typeorm");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _apptokenentity = require("../app-token/app-token.entity");
const _keyvaluepairentity = require("../key-value-pair/key-value-pair.entity");
const _onboardingstatusenum = require("../onboarding/enums/onboarding-status.enum");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _workspacememberdto = require("./dtos/workspace-member.dto");
const _workspaceentity = require("../workspace/workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_onboardingstatusenum.OnboardingStatus, {
    name: 'OnboardingStatus',
    description: 'Onboarding status'
});
let UserEntity = class UserEntity {
    formatEmail() {
        this.email = this.email.toLowerCase();
    }
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: ''
    }),
    _ts_metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: ''
    }),
    _ts_metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
_ts_decorate([
    (0, _typeorm.BeforeInsert)(),
    (0, _typeorm.BeforeUpdate)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], UserEntity.prototype, "formatEmail", null);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], UserEntity.prototype, "isEmailVerified", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], UserEntity.prototype, "disabled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UserEntity.prototype, "passwordHash", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], UserEntity.prototype, "canImpersonate", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], UserEntity.prototype, "canAccessFullAdminPanel", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UserEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UserEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UserEntity.prototype, "deletedAt", void 0);
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
], UserEntity.prototype, "locale", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_apptokenentity.AppTokenEntity, (appToken)=>appToken.user, {
        cascade: true
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], UserEntity.prototype, "appTokens", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_keyvaluepairentity.KeyValuePairEntity, (keyValuePair)=>keyValuePair.user, {
        cascade: true
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], UserEntity.prototype, "keyValuePairs", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacememberdto.WorkspaceMemberDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], UserEntity.prototype, "workspaceMember", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _userworkspaceentity.UserWorkspaceEntity
        ]),
    (0, _typeorm.OneToMany)(()=>_userworkspaceentity.UserWorkspaceEntity, (userWorkspace)=>userWorkspace.user),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], UserEntity.prototype, "userWorkspaces", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_onboardingstatusenum.OnboardingStatus, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _onboardingstatusenum.OnboardingStatus === "undefined" ? Object : _onboardingstatusenum.OnboardingStatus)
], UserEntity.prototype, "onboardingStatus", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspaceentity.WorkspaceEntity, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], UserEntity.prototype, "currentWorkspace", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_userworkspaceentity.UserWorkspaceEntity, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], UserEntity.prototype, "currentUserWorkspace", void 0);
UserEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'user',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('User'),
    (0, _typeorm.Index)('UQ_USER_EMAIL', [
        'email'
    ], {
        unique: true,
        where: '"deletedAt" IS NULL'
    })
], UserEntity);

//# sourceMappingURL=user.entity.js.map